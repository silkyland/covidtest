import axios from "axios";
import appConfig from "../../config";

const fetchAPI = axios.create({ baseURL: `${appConfig.api.server}` });

export default fetchAPI;
