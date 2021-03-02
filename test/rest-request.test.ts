import { expect } from 'chai';
import 'isomorphic-fetch';
import sinon from 'sinon';
import { RestRequest } from '../src/rest-request';

describe('Rest API Request', () => {
  it('should be called', async () => {
    sinon.stub(global, 'fetch').returns(Promise.resolve(mockApiResponse({test:true})));

    function mockApiResponse(body = {}) {
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-type': 'application/json' }
      });
    }

    const request = new RestRequest();
    const result = await request.request('feature');
    console.log(result);
    expect(result).to.be.not.null;
  });

  after(function () {
    sinon.restore();
  });
});