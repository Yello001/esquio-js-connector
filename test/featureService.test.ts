import {expect} from 'chai';
import sinon from 'sinon';
import {Feature, Toggle} from '../src/esquio.model';
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
        expect(await featureService.isFeatureEnabled(feature.Name as string)).to.equal(enabled);
      });
    });

    const validToggle = {Type: 'testToggle', Parameters: undefined};
    const invalidToggle = {Type: 'notfoundType', Parameters: undefined};
    const toggleParams: { toggles: Toggle[]; result: boolean }[] =
      [
        {toggles: [], result: true},
        {toggles: [{Type: null, Parameters: undefined}], result: true},
        {toggles: [validToggle], result: true},
        {toggles: [validToggle, validToggle], result: true},
        {toggles: [invalidToggle], result: false},
        {toggles: [validToggle, invalidToggle], result: false},
      ]

    toggleParams.forEach(toggleInfo => {
      it(`should check Toggles ${toggleInfo.toggles.map(x => x.Type || 'null').join(',')} should return ${toggleInfo.result}`, async () => {
        const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
          request: Promise.resolve({...feature, Toggles: toggleInfo.toggles})
        });

        const featureService = new FeatureService(stub, {'testToggle': () => true});
        expect(await featureService.isFeatureEnabled('test')).to.equal(toggleInfo.result);
      });
    })
  });
});