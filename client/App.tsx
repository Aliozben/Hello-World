import Axios from "axios";

import {Provider} from "./app/providers/Provider";
import {DATABASE} from "./app/configs/constants";

Axios.defaults.baseURL = DATABASE.BASE_URL;

export default Provider;
