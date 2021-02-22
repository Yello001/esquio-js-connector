import { expect } from 'chai';
import sinon from 'sinon';
import { Feature, Toggle } from '../src/esquio.model';
import { FeatureService } from '../src/featureService';
import { IRequestAdapter, RestRequest } from '../src/rest-request';

const feature: Feature = ({
  Enabled: true,
  Name: 'test',
  Toggles: [] //{Type: 'test', Parameters: null}]
});

describe('FeatureService', () => {
  describe('isFeatureEnabled', () => {
    [true, false].forEach(enabled => {
      it(`should check if Feature is ${enabled ? 'enabled' : 'disabled'}`, async () => {
        const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
          request: Promise.resolve({ ...feature, Enabled: enabled })
        });

        const featureService = new FeatureService(stub);
        expect(await featureService.isFeatureEnabled(feature.Name as string)).to.equal(enabled);
      });
    });

    const toggleParams: { toggles: Toggle[]; result: boolean }[] =
      [
        { toggles: [], result: true },
        { toggles: [{ Type: null, Parameters: undefined }], result: true },
        { toggles: [{ Type: 'testToggle', Parameters: undefined }], result: true },
        { toggles: [{ Type: 'notfoundType', Parameters: undefined }], result: false }, // toggle not found
      ]

    toggleParams.forEach(toggleInfo => {
      it(`should check Toggles ${toggleInfo.toggles.map(x => x.Type || 'null').join(',')} should return ${toggleInfo.result}`, async () => {
        const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
          request: Promise.resolve({ ...feature, Toggles: toggleInfo.toggles })
        });

        const featureService = new FeatureService(stub, { 'testToggle': () => true });
        expect(await featureService.isFeatureEnabled('test')).to.equal(toggleInfo.result);
      });
    })
  });
});