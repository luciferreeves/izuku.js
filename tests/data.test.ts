import { Frame } from '../src/index';
import { expect } from 'chai';
import JSONData from './support/users.json';
import { data, header } from './support/people';
import path = require('path');

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
  describe('load data from a CSV file', () => {
    it('should load data from a CSV file', () => {
      const csvPath = path.join(__dirname, 'support', 'users.csv');
      const firstRow = [
        '1',
        'Durante',
        'Toma',
        'dtoma0@ovh.net',
        'Female',
        '55.96.246.188'
      ];
      const lastRow = [
        '10',
        'Niki',
        'Ruos',
        'nruos9@theatlantic.com',
        'Female',
        '110.74.213.22'
      ];
      const header = [
        'id',
        'first_name',
        'last_name',
        'email',
        'gender',
        'ip_address'
      ];
      expect(new Frame().fromCSV(csvPath).rowdata[0]).to.deep.equal(firstRow);
      expect(new Frame().fromCSV(csvPath).rowdata[9]).to.deep.equal(lastRow);
      expect(new Frame().fromCSV(csvPath).columns).to.deep.equal(header);
    });
  });
  describe('find', () => {
    it('should search for a specific value', () => {
      const frame = new Frame(data, header).find('Victor', {
        column: 'Name',
        row: 6,
        strict: false
      });
      expect(frame.rowdata).to.deep.equal([data[6]]);
      expect(frame.columns).to.deep.equal(header);
    });
  });
});
