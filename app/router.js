import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('basic-modals');
  this.route('wizard-modals', function() {
    this.route('historical');
    this.route('persistent');
  });
  this.route('extras');
});
