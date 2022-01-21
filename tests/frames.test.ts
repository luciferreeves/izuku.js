import { expect } from 'chai';
import { Frame } from '../src/index';

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

const defaultHeader = ['Column 1', 'Column 2', 'Column 3'];

describe('frames.test.ts', () => {
  describe('Create a new frame with column names', () => {
    it('should create a new frame', () => {
      const frame = new Frame(data);
      expect(frame.rowdata).to.deep.equal(data);
      frame.header(header);
      expect(frame.columns).to.deep.equal(header);
    });
  });
  describe('Update a frame and column names', () => {
    it('should update a frame', () => {
      const frame = new Frame(data);
      frame.header(header);
      expect(frame.rowdata).to.deep.equal(data);
      expect(frame.columns).to.deep.equal(header);
      frame.data(changedData);
      frame.header(changedHeader);
      expect(frame.rowdata).to.deep.equal(changedData);
      expect(frame.columns).to.deep.equal(changedHeader);
    });
  });
  describe('Remove Header', () => {
    it('should reset the header to default', () => {
      const frame = new Frame(data);
      frame.header(header);
      expect(frame.rowdata).to.deep.equal(data);
      expect(frame.columns).to.deep.equal(header);
      frame.header();
      expect(frame.columns).to.deep.equal(defaultHeader);
    });
  });
});
