import 'isomorphic-fetch';

export class RestRequest {
  esquioRestRequest() {
    return fetch('http://orf.at', {headers: {}})
      .then(result => result.text());
  }
}

