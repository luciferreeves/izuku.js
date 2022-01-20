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
      expect(frame.column('Name').flatten()).to.deep.equal(dataToExpect);
    });
  });
});
