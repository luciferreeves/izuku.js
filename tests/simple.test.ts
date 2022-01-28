import { Frame } from '../src/index';
import { data, header } from './support/duplicatePeople';

const frame = new Frame(data, header);

describe('Print a frame', () => {
  it('should print a frame', () => {
    frame.title('Simple Frame').showAll();
    frame.removeDuplicates(0).showAll();
  });
});
