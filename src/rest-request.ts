import 'isomorphic-fetch';
import { Feature } from './esquio.model';

export interface IRequestAdapter {
  request(flag: string): Promise<Feature>;
}

export class RestRequest implements IRequestAdapter {
  constructor(private url: string, private apiKey: string, private product: string, private deployment: string) {
  }

  request(flag: string): Promise<Feature> {
    const request = `${this.url}/api/configuration/product/${this.product}/feature/${flag}?${this.deployment ? `deployment=${this.deployment}&` : ''}api-version=3.0`;
    return fetch(request, { headers: { 'X-API-KEY': this.apiKey } })
      .then(result => result.json());
  }
}
