import { Frame } from '../src/index';
import { data, header } from './support/people';
import { expect } from 'chai';

const frame = new Frame(data, header);

describe('columns.ts', () => {
  describe('Get a single column', () => {
    it('should return a column of the frame using column name', () => {
      const dataToExpect = [
        'Arthur',
        'Betty',
        'Victor',
        'Dodger',
        'Rayan',
        'Skitley',
        'Victoria',
        'Tiger',
        'Killjoy'
      ];
      const names = frame.column('Name');
      expect(names.flatten()).to.deep.equal(dataToExpect);
      expect(names.columns).to.deep.equal(['Name']);
    });
  });
  describe('Get multiple columns', () => {
    it('should return multiple columns', () => {
      const dataToExpect = [
        [['Arthur'], ['Male']],
        [['Betty'], ['Female']],
        [['Victor'], ['Male']],
        [['Dodger'], ['Male']],
        [['Rayan'], ['Male']],
        [['Skitley'], ['Female']],
        [['Victoria'], ['Female']],
        [['Tiger'], ['Male']],
        [['Killjoy'], ['Female']]
      ];
      const headersToExpect = ['Name', 'Gender'];
      const namesAndGenders = frame.column([0, 2]);
      expect(namesAndGenders.rowdata).to.deep.equal(dataToExpect);
      expect(namesAndGenders.columns).to.deep.equal(headersToExpect);
    });
  });
});
