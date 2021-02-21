import {expect} from 'chai';
import {RestRequest} from '../src/rest-request';

describe('Rest API Request', () => {
  it('should be called', async () => {
    const request = new RestRequest();
    const result = await request.request('feature');
    console.log(result);
    expect(result).to.be.not.null;
  });
});