import {Toggle} from './esquio.model';
import {IRequestAdapter} from './rest-request';

export class FeatureService {
  constructor(private request: IRequestAdapter, private toggles: { [id: string]: FeatureToggle } = {}) {
  }

  async isFeatureEnabled(name: string) {
    const feature = await this.request.request(name);
    if (!feature.Enabled) {
      return false;
    }
    return feature.Toggles
      ? feature.Toggles.reduce((p, c) => p && (!c.Type || this.checkToggle(c)), true)
      : true;
  }

  private checkToggle(c: Toggle) {
    if (!c.Type) {
      return true;
    }
    const featureToggle = this.toggles[c.Type];
    if (!featureToggle) {
      console.warn(`FeatureToggle Type ${c.Type} not supported`);
      return false;
    }

    return featureToggle(c.Parameters);
  }
}

type FeatureToggle = (parameters: unknown) => boolean;

