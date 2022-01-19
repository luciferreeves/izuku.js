import Izuku from '../src/index';
import { data, header } from './support/people';

const frame = new Izuku(data, header);

describe('printing.test.ts', () => {
  describe('Print a frame', () => {
    it('should print a frame', () => {
      frame.show();
    });
  });
  describe('Print head of a frame', () => {
    it('should print head of a frame', () => {
      frame.head();
    });
    it('should print head of a frame with 2 items', () => {
      frame.data().head(2); // alternatively use: frame.head(2);
    });
  });
  describe('Print tail of a frame', () => {
    it('should print tail of a frame', () => {
      frame.tail();
    });
    it('should print tail of a frame with 2 items', () => {
      frame.data().tail(2); // alternatively use: frame.tail(2);
    });
  });
  describe('Print a column of a frame', () => {
    it('should print a column of a frame using column name', () => {
      frame.column('Name').show();
    });
    it('should print a column of a frame using column index', () => {
      frame.column(0).show();
    });
  });
  describe('Chain everything', () => {
    it('should print the head with 2 times of the "Name" column of the data of a frame', () => {
      frame.data().column('Name').tail(2);
    });
  });
});
