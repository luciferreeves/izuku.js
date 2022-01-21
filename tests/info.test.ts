import { Frame } from '../src/index';
import { expect } from 'chai';
import { data, header } from './support/people';

const frame = new Frame(data, header);

describe('info.ts', () => {
  describe('Print size of frame', () => {
    it('should print the size of the frame', () => {
      const size = frame.size;
      expect(size).to.equal(35);
    });
  });
  describe('Print shape of frame', () => {
    it('should print the shape of the frame', () => {
      const shape = frame.shape;
      expect(shape).to.equal('9 x 4');
    });
  });
  describe('Print type of data in each column', () => {
    it('should print the type of data in each column', () => {
      frame.info();
    });
  });
});
