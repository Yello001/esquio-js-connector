import {expect} from 'chai';
import sinon from 'sinon';
import {Feature} from '../src/esquio.model';
import {FeatureService} from '../src/featureService';
import {IRequestAdapter, RestRequest} from '../src/rest-request';

describe('FeatureService', () => {
  it('should check if Feature is enabled', async () => {
    const feature: Feature = ({
      Enabled: true,
      Name: 'test',
      Toggles: [{Type: 'test', Parameters: null}]
    });

    const stub = sinon.createStubInstance<IRequestAdapter>(RestRequest, {
      request: Promise.resolve(feature)
    });

    const featureService = new FeatureService(stub);
    expect(await featureService.hasFlag('test')).to.be.true;
  });
});