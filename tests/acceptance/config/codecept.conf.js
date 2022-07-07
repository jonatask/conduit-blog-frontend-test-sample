require('dotenv').config({ path: './.env' });

const URL = 'https://react-redux.realworld.io/';
const isBrowserVisible = process.env.ACCEPTANCE_TEST_SHOW_BROWSER
  ? process.env.ACCEPTANCE_TEST_SHOW_BROWSER === 'true'
  : false;

exports.config = {
  tests: '../scenarios/**/*-test.js',
  output: '../output',
  helpers: {
    Puppeteer: {
      url: URL,
      show: isBrowserVisible,
      windowSize: '1200x900',
      chrome: {
        args: isBrowserVisible
          ? ['--disable-web-security']
          : ['--disable-web-security', '--headless', '--disable-gpu', '--no-sandbox'],
      },
    },
    MockRequestHelper: {
      require: '@codeceptjs/mock-request',
      mode: process.env.CI ? 'replay' : 'record',
    },
    REST: {
      endpoint: 'https://api.realworld.io',
    },
    // TODO: Custom helper. See comments in ../helpers/har-helper.js
    // PuppeteerHarHelper: {
    //   require: '../helpers/har-helper.js',
    // },
  },
  plugins: {
    allure: {},
    tryTo: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
      ignoreSteps: ['scroll*', /Cookie/],
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  include: {
    I: '../common/steps-file.js',
    ...require('./includes'),
  },
  bootstrap: null,
  mocha: {},
  name: 'acceptance',
};

if (process.env.profile != 'threads') {
  this.config.helpers.ResembleHelper = {
    require: 'codeceptjs-resemblehelper',
    screenshotFolder: '../output/',
    baseFolder: '../visual-baselines/',
    diffFolder: '../output/',
  };
}
