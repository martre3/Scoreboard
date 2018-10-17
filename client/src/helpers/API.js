import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class Api {
  constructor() {
    this.axios = axios.create(this.getOptions());

    if (sessionStorage.getItem('jwt')) {
      this.jwt = sessionStorage.getItem('jwt');
      axios.defaults.headers.common['jwt'] = this.jwt;
    }
  }

  setJWT(jwt) {
    axios.defaults.headers.common['jwt'] = jwt;
    sessionStorage.setItem('jwt', jwt);
    this.jwt = jwt;
  }

  isAuthenticated() {
    return typeof this.jwt !== 'undefined';
  }

  getBaseUrl() {
    let baseURL = `http://${process.env.REACT_APP_API_HOST}`;
    if (process.env.REACT_APP_API_HOST === 'localhost') {
      baseURL = `${baseURL}:${process.env.REACT_APP_API_PORT}`;
    }

    baseURL += "/api";

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
