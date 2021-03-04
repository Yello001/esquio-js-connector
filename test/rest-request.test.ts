import { expect } from 'chai';
import 'isomorphic-fetch';
import sinon from 'sinon';
import { RestRequest } from '../src';

function mockApiResponse(body = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  });
}

describe('Rest API Request', () => {
  it('should return request result', async () => {

    const requestResult = {
      enabled: true,
      featureName: 'CreateOrder',
      toggles: {
        'Esquio.AspNetCore.Toggles.ClaimValueToggle,Esquio.AspNetCore': {
          ClaimType: 'Role',
          ClaimValues: 'Editor;OrderEditor'
        }
      }
    };
    sinon.stub(global, 'fetch').returns(Promise.resolve(mockApiResponse(requestResult)));

    const request = new RestRequest(
      { url: 'http://test.org', apiKey: 'apiKey', product: 'product', deployment: 'deployment' });
    const result = await request.request('feature');
    expect(result).to.eql(requestResult);
  });

  after(function () {
    sinon.restore();
  });
});