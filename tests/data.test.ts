import { Frame } from '../src/index';
import { expect } from 'chai';
import JSONData from './support/users.json';

describe('data.ts', () => {
  describe('load frame from json file', () => {
    it('should load the frame from json file', () => {
      const dataToExpect = [
        [
          1,
          'Jeanette',
          'Penddreth',
          'jpenddreth0@census.gov',
          'Female',
          '26.58.193.2'
        ],
        [
          2,
          'Giavani',
          'Frediani',
          'gfrediani1@senate.gov',
          'Male',
          '229.179.4.212'
        ],
        [3, 'Noell', 'Bea', 'nbea2@imageshack.us', 'Female', '180.66.162.255'],
        [4, 'Willard', 'Valek', 'wvalek3@vk.com', 'Male', '67.76.188.26']
      ];
      const headerToExpect = [
        'id',
        'first_name',
        'last_name',
        'email',
        'gender',
        'ip_address'
      ];
      expect(new Frame().fromJSON(JSONData).columns).to.deep.equal(
        headerToExpect
      );
      expect(new Frame().fromJSON(JSONData).rowdata).to.deep.equal(
        dataToExpect
      );
    });
  });
});
