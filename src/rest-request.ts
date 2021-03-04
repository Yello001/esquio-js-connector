import 'isomorphic-fetch';
import { Feature } from './esquio.model';

export interface IRequestAdapter {
  request(flag: string): Promise<Feature>;
}

export class RestRequest implements IRequestAdapter {
  constructor(private config: { url: string, apiKey: string, product: string, deployment?: string }) {
  }

  request(flag: string): Promise<Feature> {
    const request = `${this.config.url}/api/configuration/product/${this.config.product}/feature/${flag}?${this.config.deployment ?
      `deployment=${this.config.deployment}&` : ''}api-version=3.0`;
    return fetch(request, { headers: { 'X-API-KEY': this.config.apiKey } })
      .then(result => result.json());
  }
}
