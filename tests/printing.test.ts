import Izuku from '../src/index';

const header = ['Name', 'Age', 'Gender', 'Country'];
const data = [
  ['Arthur', 21, 'Male', 'USA'],
  ['Betty', 20, 'Female', 'Canada'],
  ['Victor', 25, 'Male'],
  ['Dodger', 30, 'Male', 'Canada'],
  ['Rayan', 21, 'Male', 'Russia'],
  ['Skitley', 29, 'Female', 'Germany'],
  ['Victoria', 89, 'Female', 'UK'],
  ['Tiger', 23, 'Male', 'India'],
  ['Killjoy', null, 'Female', 'Riot']
];

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
