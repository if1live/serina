import { State } from '../reducers';
import { Store } from 'redux';
import { History } from 'history';
import {
  twitterChangeID,
} from '../actions';

export const LOCATION_CHANGE = 'ROUTER/LOCATION_CHANGE';

export const locationChange = ({ pathname, search, hash }) => ({
  type: LOCATION_CHANGE,
  payload: {
    pathname,
    search,
    hash,
  },
});

export function startListener(history: History, store: Store<State>) {
  console.log('start history listener');

  history.listen((location) => {
    // "/tweet/123456",
    var relist = [
      /^\/tweet\/(\d+)$/,
      /^\/tweet\/(\d+)\/$/,
    ];
    const p = location.pathname;
    const matchs = relist.map((re) => p.match(re)).filter(x => !!x);
    if (matchs.length > 0) {
      const m = matchs[0] as RegExpMatchArray;
      const tid = m[1] as string;
      store.dispatch(twitterChangeID(tid));
    }
  });
}
