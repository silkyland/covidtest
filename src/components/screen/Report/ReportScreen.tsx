import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import config from "../../../config";
import moment from "moment";
import "moment/dist/locale/th";
import { parse } from "json2csv";

const fields = [
  { label: "เลขบัตร", value: "citizen_id", default: null },
  { label: "ชื่อ-สกุล", value: "fullname", default: null },
];
const opts = { fields };

const ReportScreen = (props: any): JSX.Element => {
  const [report, setReport] = useState({
    total: {
      total_checkin: 0,
      total_covidtest_failed: 0,
      total_covidtest_passed: 0,
      total_pcrtest_checkin: 0,
      total_pcrtest_failed: 0,
      total_pcrtest_passed: 0,
      total_pcrtest_waiting: 0,
      total_rapidtest_checkin: 0,
      total_rapidtest_failed: 0,
      total_rapidtest_passed: 0,
      total_rapidtest_waiting: 0,
    },
    report_covid_checkin: [],
    report_covid_pcrtest_failed: [],
    report_covid_pcrtest_passed: [],
    report_covid_pcrtest_waiting: [],
    report_covid_rapidtest: [],
    report_covid_rapidtest_failed: [],
    report_covid_rapidtest_passed: [],
    rerport_covid_rapidtest_waiting: [],
  });

  enum reportType {
    REPORT_COVID_CHECKIN,
    REPOR_COVID_PCRTEST_FAILED,
    REPORT_COVID_PCRTEST_PASSED,
    REPORT_COVID_PCRTEST_WAITING,
    REPORT_COVID_RAPIDTEST,
    REPORT_COVID_RAPIDTEST_FAILED,
    REPORT_COVID_RAPIDTEST_PASSED,
    REPORT_COVID_RAPIDTEST_WAITING,
    REPORT_COVID_TEST_PASSED,
    REPORT_COVID_TEST_FAILED,
  }

  const [activeTable, setActiveTable] = useState(0);

  const getReport = async (): Promise<any> => {
    try {
      const response: any = await Axios.get(
        `${config.api.server}/covid/report`
      );
      setReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReport();
  }, []);

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array: any) {
    const link = document.createElement("a");
    let csv = parse(array, opts);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  const renderTable = (action: reportType) => {
    switch (action) {
      case reportType.REPORT_COVID_CHECKIN:
        return (
          <DataTable
            title="จำนวนที่รับคิวแล้ว"
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.report_covid_checkin}
            actions={
              <Button
                color="outline-primary"
                onClick={() => downloadCSV(report?.report_covid_checkin)}
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น Excel
              </Button>
            }
          />
        );
      case reportType.REPORT_COVID_RAPIDTEST_WAITING:
        return (
          <DataTable
            title={`ผลตรวจยังไม่ออก จำนวน ${report.total.total_rapidtest_waiting} ราย`}
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.rerport_covid_rapidtest_waiting}
            actions={
              <Button
                color="outline-primary"
                onClick={() =>
                  downloadCSV(report?.rerport_covid_rapidtest_waiting)
                }
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น CSV
              </Button>
            }
          />
        );
      case reportType.REPORT_COVID_RAPIDTEST:
        return (
          <DataTable
            title={`ผลตรวจออกแล้ว จำนวน ${report.total.total_rapidtest_checkin} ราย`}
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ผลตรวจ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  row.rapidtest_status < 2 ? "ไม่ผ่าน" : "ผ่าน",
              },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.report_covid_rapidtest}
            actions={
              <Button
                color="outline-primary"
                onClick={() => downloadCSV(report?.report_covid_rapidtest)}
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น CSV
              </Button>
            }
          />
        );
      case reportType.REPORT_COVID_RAPIDTEST_PASSED:
        return (
          <DataTable
            title={`ผลตรวจ Rapid Test ผ่าน จำนวน ${report.total.total_rapidtest_passed} ราย`}
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.report_covid_rapidtest_passed}
            actions={
              <Button
                color="outline-primary"
                onClick={() =>
                  downloadCSV(report?.report_covid_rapidtest_passed)
                }
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น CSV
              </Button>
            }
          />
        );
      case reportType.REPORT_COVID_RAPIDTEST_FAILED:
        return (
          <DataTable
            title={`ผลตรวจ Rapid Test ไม่ผ่าน จำนวน ${report.total.total_rapidtest_failed} ราย`}
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.report_covid_rapidtest_failed}
            actions={
              <Button
                color="outline-primary"
                onClick={() =>
                  downloadCSV(report?.report_covid_rapidtest_failed)
                }
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น CSV
              </Button>
            }
          />
        );
      default:
        return (
          <DataTable
            title="จำนวนที่รับคิวแล้ว"
            pagination
            columns={[
              { name: "เลขบัตร", selector: "citizen_id" },
              { name: "ชื่อ-สกุล", selector: "fullname" },
              {
                name: "ออกคิวเมื่อ",
                selector: "checkin_datetime",
                format: (row: any) =>
                  moment(row?.checkin_datetime).format("LLL"),
              },
            ]}
            data={report?.report_covid_checkin}
            actions={
              <Button
                color="outline-primary"
                onClick={() => downloadCSV(report?.report_covid_checkin)}
              >
                <i className="fa fa-file-excel-o"></i> ส่งออกเป็น Excel
              </Button>
            }
          />
        );
    }
  };

  interface BoxList {
    backgroundColor?: string;
    name: string;
    value: number;
    reportType: reportType;
  }

  const boxLists: Array<BoxList> = [
    {
      backgroundColor: "#1E91D6",
      name: "จำนวนคิว",
      value: report.total.total_checkin,
      reportType: reportType.REPORT_COVID_CHECKIN,
    },
    {
      backgroundColor: "#1E91D6",
      name: "รอผล",
      value: report.total.total_rapidtest_waiting,
      reportType: reportType.REPORT_COVID_RAPIDTEST_WAITING,
    },
    {
      backgroundColor: "#8FC93A",
      name: "ผลออกแล้ว",
      value: report.total.total_rapidtest_checkin,
      reportType: reportType.REPORT_COVID_RAPIDTEST,
    },
    {
      backgroundColor: "#E4CC37",
      name: "RAPID ผ่าน",
      value: report.total.total_rapidtest_passed,
      reportType: reportType.REPORT_COVID_RAPIDTEST_PASSED,
    },
    {
      backgroundColor: "#E18335",
      name: "RAPID ไม่ผ่าน",
      value: report.total.total_rapidtest_failed,
      reportType: reportType.REPORT_COVID_RAPIDTEST_FAILED,
    },
    {
      backgroundColor: "#8ECAE6",
      name: "รอตรวจ PCR",
      value: report.total.total_pcrtest_waiting,
      reportType: reportType.REPORT_COVID_PCRTEST_WAITING,
    },
    {
      backgroundColor: "#219EBC",
      name: "PCR ผ่าน",
      value: report.total.total_pcrtest_passed,
      reportType: reportType.REPORT_COVID_PCRTEST_PASSED,
    },
    {
      backgroundColor: "#023047",
      name: "PCR ไม่ผ่าน",
      value: report.total.total_pcrtest_failed,
      reportType: reportType.REPOR_COVID_PCRTEST_FAILED,
    },
    {
      backgroundColor: "#FFB703",
      name: "รับสติกเกอร์",
      value: report.total.total_covidtest_passed,
      reportType: reportType.REPORT_COVID_TEST_PASSED,
    },
    {
      backgroundColor: "#FB8500",
      name: "ไม่ผ่านตรวจ",
      value: report.total.total_covidtest_failed,
      reportType: reportType.REPORT_COVID_TEST_FAILED,
    },
  ];

  return (
    <div>
      <h1>รายงาน</h1>
      <div className="row">
        {boxLists.map((box: BoxList) => (
          <div
            onClick={() => setActiveTable(box.reportType)}
            key={box.name}
            className="col-md-2 m-3"
            style={{
              backgroundColor: box.backgroundColor,
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            <h4 className="mt-2">{box.name}</h4>
            <div style={{ fontSize: 50, textAlign: "center" }}>{box.value}</div>
            <div className="text-right">ราย</div>
          </div>
        ))}
      </div>
      <div>{renderTable(activeTable)}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
