import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class Api {
  constructor() {
    this.axios = axios.create(this.getOptions());
  }

  setJWT(jwt) {
    axios.defaults.headers.common['jwt'] = jwt;
  }

  getBaseUrl() {
    let baseURL = `http://${process.env.REACT_APP_API_HOST}`;
      if (process.env.REACT_APP_API_HOST === 'localhost') {
        baseURL = `${baseURL}:${process.env.REACT_APP_API_PORT}`;
      }

      console.log(baseURL);
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
