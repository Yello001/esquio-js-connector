import { expect } from 'chai';
import sinon from 'sinon';
import { ClaimToggle, Feature } from '../src/esquio.model';
import { FeatureService } from '../src/featureService';
import { IRequestAdapter, RestRequest } from '../src/rest-request';

const feature: Feature = ({
  enabled: true,
  featureName: 'test',
  toggles: {}
});

describe('FeatureService', () => {
  describe('isFeatureEnabled', () => {
    [true, false].forEach(enabled => {
      it(`should check if Feature is ${enabled ? 'enabled' : 'disabled'}`, async () => {
        const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
          request: Promise.resolve({ ...feature, enabled: enabled })
        });

        const featureService = new FeatureService(stub);
        expect(await featureService.isFeatureEnabled(feature.featureName as string)).to.equal(enabled);
      });
    });

    const validToggle: { [key: string]: ClaimToggle } = { 'testToggle': { ClaimType: '', ClaimValues: null } };
    const invalidToggle: { [key: string]: ClaimToggle } = { 'notFoundToggle': { ClaimType: '', ClaimValues: null } };
    const toggleParams: { toggles: { [key: string]: ClaimToggle }; result: boolean }[] =
      [
        { toggles: {}, result: true },
        { toggles: { ...validToggle }, result: true },
        { toggles: { ...invalidToggle }, result: false },
      ]

    toggleParams.forEach(toggleInfo => {
      it(`should check Toggles ${Object.keys(toggleInfo.toggles).join(', ')} should return ${toggleInfo.result}`, async () => {
        const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
          request: Promise.resolve({ ...feature, toggles: toggleInfo.toggles })
        });

        const featureService = new FeatureService(stub, { 'testToggle': () => true });
        expect(await featureService.isFeatureEnabled('test')).to.equal(toggleInfo.result);
      });
    })
  });
});