import { defaultAction } from '../actions';
import { DEFAULT_ACTION } from '../constants';

describe('SubmitPaymentDetails actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      // eslint-disable-next-line no-undef
      expect(defaultAction()).toEqual(expected);
    });
  });
});
