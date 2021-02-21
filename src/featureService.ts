import {IRequestAdapter} from './rest-request';

export class FeatureService {
  constructor(private request: IRequestAdapter) {
  }

  async hasFlag(flag: string) {
    const feature = await this.request.request(flag);
    return feature.Enabled;
  }
}