import { ClaimToggle } from './esquio.model';
import { IRequestAdapter } from './rest-request';

export class FeatureService {
  constructor(private request: IRequestAdapter,
              private toggles: { [key: string]: FeatureToggle } = {}) {
  }

  async isFeatureEnabled(name: string) {
    const feature = await this.request.request(name);
    if (!feature.enabled) {
      return false;
    }

    return feature.toggles
      ? Object.keys(feature.toggles).reduce((p, c) => p && this.checkToggle(c, feature.toggles[c]), true)
      : true;
  }

  private checkToggle(name: string, toggle: ClaimToggle) {
    const featureToggle = this.toggles[name];
    if (!featureToggle) {
      console.warn(`FeatureToggle Type ${name} not supported`);
      return false;
    }

    return featureToggle(toggle);
  }
}

export type FeatureToggle = (claimValueToggle: ClaimToggle) => boolean;

