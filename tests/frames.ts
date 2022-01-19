import { expect } from 'chai';
import Izuku from '../src/index';

describe('frames.ts', () => {
  describe('Create a new frame with column names', () => {
    it('should create a new frame', () => {
      const newframe = new Izuku([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      expect(newframe.data()).to.deep.equal([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      newframe.columns(['a', 'b', 'c']);
      expect(newframe.columns()).to.deep.equal(['a', 'b', 'c']);
    });
  });
  describe('Update a frame and column names', () => {
    it('should update a frame', () => {
      const newframe = new Izuku([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      newframe.columns(['a', 'b', 'c']);
      expect(newframe.data()).to.deep.equal([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ]);
      expect(newframe.columns()).to.deep.equal(['a', 'b', 'c']);
      newframe.data([
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r']
      ]);
      newframe.columns(['j', 'k', 'l']);
      expect(newframe.data()).to.deep.equal([
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r']
      ]);
      expect(newframe.columns()).to.deep.equal(['j', 'k', 'l']);
    });
  });
});
