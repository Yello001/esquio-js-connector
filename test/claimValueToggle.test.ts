import { expect } from 'chai';
import { claimValueToggle, Token } from '../src';
import { ClaimToggle } from '../src/esquio.model';

describe('ClaimValueToggle', () => {
  const testParams: {
    text: string;
    input: { claimToggle: ClaimToggle; token: Token };
    result: boolean
  }[] = [
    {
      text: 'should return false when required Claim not in Token',
      input: { token: {}, claimToggle: { ClaimType: 'Role', ClaimValues: 'Admin' } },
      result: false
    },
    {
      text: 'should return true when required Claim is in Token',
      input: { token: { Role: 'Admin' }, claimToggle: { ClaimType: 'Role', ClaimValues: 'Admin' } },
      result: true
    },
    {
      text: 'should return true when required Claim is in Token array',
      input: { token: { Roles: ['Guest', 'Admin'] }, claimToggle: { ClaimType: 'Roles', ClaimValues: 'Admin' } },
      result: true
    },
    {
      text: 'should return false when required Claim is not in Token array',
      input: { token: { Roles: ['Guest', 'Admin'] }, claimToggle: { ClaimType: 'Roles', ClaimValues: 'SuperUser' } },
      result: false
    },
    {
      text: 'should return true when one required Claim is in Token',
      input: { token: { Role: 'Admin' }, claimToggle: { ClaimType: 'Role', ClaimValues: 'User;Admin' } },
      result: true
    },
    {
      text: 'should return false when one required Claim is not in Token',
      input: { token: { Role: 'Guest' }, claimToggle: { ClaimType: 'Role', ClaimValues: 'User;Admin' } },
      result: false
    }
  ];

  testParams.forEach(testParam => {
    it(testParam.text, () => {
      const { claimToggle, token } = testParam.input;

      const toggle = claimValueToggle(token);
      const result = toggle['Esquio.AspNetCore.Toggles.ClaimValueToggle,Esquio.AspNetCore']?.(claimToggle);
      expect(result).to.equal(testParam.result);
    });
  })
});