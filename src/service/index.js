import axios from "axios";
import store from '../store';

const config = {
  baseURL: "http://localhost:8000",
  timeout: 5000,
};

class MyRequest {
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
    });

    // this.instance.interceptors.request.use(
    //   (config) => {
    //     // console.log("store:", store.state);
    //     return config;
    //   },
    //   (err) => {}
    // );

    // this.instance.interceptors.response.use(
    //   (res) => {
    //     return res;
    //   },
    //   (err) => {}
    // );
  }

  request(config) {
    return this.instance.request(config);
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

const instance = new MyRequest();
export default instance;
