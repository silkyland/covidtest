import axios from "axios";
import appConfig from "../../config";
import { loadingState, setLoadingState } from "../actions/mics";
import store from "../index";

const fetchAPI = axios.create({ baseURL: `${appConfig.api.server}` });

export default fetchAPI;
