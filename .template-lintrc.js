'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-curly-component-invocation': {
      allow: [
        'app-version',
        'json',
        'set-body-class',
      ],
    },
    'no-implicit-this': {
      allow: [
        'app-version',
      ],
    },
  },
};
