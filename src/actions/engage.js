import { SENT_OFFER } from '../config/constants';

export const sentOffer = (girlId, amount, letter, name, girlImageUrl) => ({
  type: SENT_OFFER,
  payload: {
    girlId,
    amount,
    letter,
    name,
    girlImageUrl,
  },
});
