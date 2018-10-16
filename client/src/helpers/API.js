import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class Api {
  constructor() {
    this.axios = axios.create(this.getOptions());
  }

  setJWT(jwt) {
    axios.defaults.headers.common['jwt'] = jwt;
  }

  getBaseUrl() {
    // let baseURL = `http://${process.env.VUE_APP_API_HOST}`;
    //   if (process.env.VUE_APP_API_HOST === 'localhost') {
    //     baseURL = `${baseURL}:${process.env.VUE_APP_API_PORT}`;
    //   }

    let baseURL = "http://localhost:5000";

    return baseURL;
  }

  getOptions() {

    const baseURL = `${this.getBaseUrl()}`;

    return {
      baseURL,
      timeout: 5000,
    };
  }
}

export default new Api();
