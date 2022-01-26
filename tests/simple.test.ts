import { Frame } from '../src/index';
import { data, header } from './support/people';

const frame = new Frame(data, header);

describe('Print a frame', () => {
  it('should print a frame', () => {
    frame.title('Simple Frame').show();
  });
});
