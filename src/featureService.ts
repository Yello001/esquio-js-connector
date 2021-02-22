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
      ? feature.Toggles.reduce((p, c) => p && this.checkToggle(c), true)
      : true;
  }

  private checkToggle(toggle: Toggle) {
    if (!toggle.Type) {
      return true;
    }
    const featureToggle = this.toggles[toggle.Type];
    if (!featureToggle) {
      console.warn(`FeatureToggle Type ${toggle.Type} not supported`);
      return false;
    }

    return featureToggle(toggle.Parameters);
  }
}

type FeatureToggle = (parameters: unknown) => boolean;

