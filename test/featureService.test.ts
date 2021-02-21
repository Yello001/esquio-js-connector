import {expect} from 'chai';
import sinon from 'sinon';
import {Feature} from '../src/esquio.model';
import {FeatureService} from '../src/featureService';
import {IRequestAdapter, RestRequest} from '../src/rest-request';

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
          request: Promise.resolve({...feature, Enabled: enabled})
        });

        const featureService = new FeatureService(stub);
        expect(await featureService.isFeatureEnabled('test')).to.equal(enabled);
      });
    });
  });
});