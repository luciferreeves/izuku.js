import { expect } from 'chai';
import Izuku from '../src/index';

const data = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i']
];

const changedData = [
  ['j', 'k', 'l'],
  ['m', 'n', 'o'],
  ['p', 'q', 'r']
];

const header = ['a', 'b', 'c'];

const changedHeader = ['j', 'k', 'l'];

describe('frames.test.ts', () => {
  describe('Create a new frame with column names', () => {
    it('should create a new frame', () => {
      const frame = new Izuku(data);
      expect(frame.rowdata).to.deep.equal(data);
      frame.header(header);
      expect(frame.columns).to.deep.equal(header);
    });
  });
  describe('Update a frame and column names', () => {
    it('should update a frame', () => {
      const frame = new Izuku(data);
      frame.header(header);
      expect(frame.rowdata).to.deep.equal(data);
      expect(frame.columns).to.deep.equal(header);
      frame.data(changedData);
      frame.header(changedHeader);
      expect(frame.rowdata).to.deep.equal(changedData);
      expect(frame.columns).to.deep.equal(changedHeader);
    });
  });
});
