import 'isomorphic-fetch';
import {Feature} from './esquio.model';

export interface IRequestAdapter {
  request(flag: string): Promise<Feature>;
}

export class RestRequest implements IRequestAdapter {
  request(flag: string): Promise<Feature> {
    return fetch('http://orf.at', {headers: {  'X-API-KEY': '[Key]'}})
      .then(result => result.text())
      .then(x => ({Enabled: true, Name: flag, Toggles: [{Type: 'test', Parameters: x}]}))
  }
}
