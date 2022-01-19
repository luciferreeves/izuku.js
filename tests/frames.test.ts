import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Izuku = require('../src/index');

describe('frames.ts', () => {
  describe('Create a new frame with column names', () => {
    it('should create a new frame', () => {
      const newframe = new Izuku([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      expect(newframe.rowdata).to.deep.equal([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      newframe.header(['a', 'b', 'c']);
      expect(newframe.columns).to.deep.equal(['a', 'b', 'c']);
    });
  });
  describe('Update a frame and column names', () => {
    it('should update a frame', () => {
      const newframe = new Izuku([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      newframe.header(['a', 'b', 'c']);
      expect(newframe.rowdata).to.deep.equal([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      expect(newframe.columns).to.deep.equal(['a', 'b', 'c']);
      newframe.data([
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r']
      ]);
      newframe.header(['j', 'k', 'l']);
      expect(newframe.rowdata).to.deep.equal([
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r']
      ]);
      expect(newframe.columns).to.deep.equal(['j', 'k', 'l']);
    });
  });
  describe('Print a frame', () => {
    it('should print a frame', () => {
      const header = ['Name', 'Age', 'Gender', 'Country'];
      const data = [
        ['Arthur', 21, 'Male', 'USA'],
        ['Betty', 20, 'Female', 'Canada'],
        ['Victor', 25, 'Male']
      ];
      const newframe = new Izuku(data, header);
      newframe.data();
    });
  });
});
