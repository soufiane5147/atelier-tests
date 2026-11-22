
module.exports = {
  testDir: './e2e',

  timeout: 30000,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    browserName: 'chromium'
  },

  webServer: {
    command: 'node src/server.js',
    url: 'http://127.0.0.1:3000/login.html',
    reuseExistingServer: true,
    timeout: 30000
  }
};
