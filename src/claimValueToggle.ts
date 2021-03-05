import { FeatureToggle } from './featureService';

export type Token = { [id: string]: unknown };

export const claimValueToggle: (token: Token) => { [key: string]: FeatureToggle } = (token: Token) => ({
  'Esquio.AspNetCore.Toggles.ClaimValueToggle,Esquio.AspNetCore': (claimValueToggle) => {
    if (!claimValueToggle.ClaimValues) {
      return true;
    }

    const claim = token[claimValueToggle.ClaimType];
    if (!claim) {
      return false;
    }
    return claimValueToggle.ClaimValues.split(';')
      .reduce((p, c) => p || checkClaim(claim, c), false as boolean);
  }
})

function checkClaim(claim: any, c: string): boolean {
  if (!claim) {
    return false;
  }
  const claims: string[] = (!Array.isArray(claim)) ? [claim.toString()] : claim.map(x => x.toString());
  return !!claims.find(value => value.toLowerCase() === c.toLowerCase());
}
