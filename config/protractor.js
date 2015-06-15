exports.config = {
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function() {
    browser.driver.get('http://localhost:3000');
  }
};