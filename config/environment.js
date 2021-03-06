'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ra',
    podModulePrefix: 'ra/z-modules',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      salaryMonthStart: 11
    },

    fastboot: {
      hostWhitelist: ['ra-hookah.firebaseapp.com', /^localhost:\d+$/]
    },

    authenticationRoute: 'auth',

    routeAfterAuthentication: 'index',

    slack: {
      url: 'https://hooks.slack.com/services/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',
      channel: '#ra'
    },

    firebase: {
      apiKey: "AIzaSyAyRRXezG3476CAs5BYBQggz3D2F8GBtlE",
      authDomain: "ra-hookah.firebaseapp.com",
      databaseURL: "https://ra-hookah.firebaseio.com",
      projectId: "ra-hookah",
      storageBucket: "ra-hookah.appspot.com",
      messagingSenderId: "55674416568"
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
    },

    torii: {
      sessionServiceName: 'session'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
