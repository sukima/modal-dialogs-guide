import Route from '@ember/routing/route';
import LZString from 'lz-string';
import { State } from 'xstate';

export default class WizardModalsPersistentRoute extends Route {

  queryParams = {
    state: { type: 'xstate' },
  };

  serializeQueryParam(value, _, defaultType) {
    if (defaultType === 'xstate') {
      return LZString.compressToEncodedURIComponent(JSON.stringify(value));
    }
    return super.serializeQueryParam(...arguments);
  }

  deserializeQueryParam(value, _, defaultType) {
    if (defaultType === 'xstate') {
      return State.create(
        JSON.parse(LZString.decompressFromEncodedURIComponent(value))
      );
    }
    return super.deserializeQueryParam(...arguments);
  }

}
