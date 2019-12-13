import Route from '@ember/routing/route';
import { State } from 'xstate';

export default class WizardModalsPersistentRoute extends Route {

  queryParams = {
    state: { type: 'xstate' },
  };

  serializeQueryParam(value, _, defaultType) {
    switch (defaultType) {
      case 'xstate': return JSON.stringify(value);
      default: return super.serializeQueryParam(...arguments);
    }
  }

  deserializeQueryParam(value, _, defaultType) {
    switch (defaultType) {
      case 'xstate': return State.create(JSON.parse(value));
      default: return super.deserializeQueryParam(...arguments);
    }
  }

}
