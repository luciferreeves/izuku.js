import { Frame, range } from '../src/index';
import { data, header } from './support/people';
import { expect } from 'chai';

const frame = new Frame(data, header);

describe('rows.ts', () => {
  describe('Get a single row', () => {
    it('should return a single row using row index', () => {
      const dataToExpect = [['Dodger', 30, 'Male', 'Canada']];
      const headersToExpect = ['Name', 'Age', 'Gender', 'Country'];
      expect(frame.row(3).rowdata).to.deep.equal(dataToExpect);
      expect(frame.row(3).columns).to.deep.equal(headersToExpect);
    });
  });
  describe('Get multiple rows', () => {
    it('should return multiple rows using row index', () => {
      const dataToExpect = [
        ['Dodger', 30, 'Male', 'Canada'],
        ['Skitley', 29, 'Female', 'Germany']
      ];
      const headersToExpect = ['Name', 'Age', 'Gender', 'Country'];
      expect(frame.row([3, 5]).rowdata).to.deep.equal(dataToExpect);
      expect(frame.row(3).columns).to.deep.equal(headersToExpect);
    });
  });
  describe('Chain rows and columns', () => {
    it('should return selected rows and columns over a range', () => {
      const dataToExpect = [
        [['Dodger'], ['Male']],
        [['Skitley'], ['Female']]
      ];
      const headersToExpect = ['Name', 'Gender'];
      expect(
        frame.column(range(0, 2, 2)).row(range(3, 5, 2)).rowdata
      ).to.deep.equal(dataToExpect);
      expect(
        frame.column(range(0, 2, 2)).row(range(3, 5, 2)).columns
      ).to.deep.equal(headersToExpect);
    });
  });
});
