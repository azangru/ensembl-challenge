import { ajax } from 'rxjs/ajax';

class HTTP {

  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  get(url) {
    return ajax.getJSON(`${this.baseUrl}${url}`, this.headers);
  }

}

const config = {
  baseUrl: 'https://rest.ensembl.org',
  headers: {
    'Accept': 'application/json'
  }
};

export default new HTTP(config);
