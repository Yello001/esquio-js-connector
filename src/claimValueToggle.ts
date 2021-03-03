import { FeatureToggle } from './featureService';

export const claimValueToggle: (token: { [id: string]: string }) => { [key: string]: FeatureToggle } = (token: { [id: string]: string }) => ({
  'Esquio.AspNetCore.Toggles.ClaimValueToggle,Esquio.AspNetCore': (claimValueToggle) => {
    if (!claimValueToggle.ClaimValues) {
      return true;
    }

    const claim = token[claimValueToggle.ClaimType];
    if (!claim) {
      return false;
    }
    return claimValueToggle.ClaimValues.split(';')
      .reduce((p, c) => p || (claim.toLowerCase() === c.toLowerCase()), false as boolean);
  }
})