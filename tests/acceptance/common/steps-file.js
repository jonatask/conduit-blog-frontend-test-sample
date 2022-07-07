// In this file we append custom step methods to 'I' object

module.exports = function () {
  return actor({
    getMainUrl() {
      return 'https://react-redux.realworld.io/';
    },

    getApiUrl() {
      return `https://api.realworld.io`;
    },

    async amSignedIn() {
      const url = this.getApiUrl();
      if (
        process.env.ACCEPTANCE_TEST_EDITOR_EMAIL == null ||
        process.env.ACCEPTANCE_TEST_EDITOR_EMAIL == '' ||
        process.env.ACCEPTANCE_TEST_EDITOR_PASSWORD == null ||
        process.env.ACCEPTANCE_TEST_EDITOR_PASSWORD == ''
      ) {
        throw 'It seems you forgot to set the environment variables of editor email or password in the .env file, but no worries, the README will guide you through. ;-)';
      }

      const body = {
        user: {
          email: process.env.ACCEPTANCE_TEST_EDITOR_EMAIL,
          password: process.env.ACCEPTANCE_TEST_EDITOR_PASSWORD,
        },
      };
      const response = await this.sendPostRequest(`${url}/api/users/login`, body);
      const token = response.data.user.token;
      this.executeScript(token => localStorage.setItem('jwtToken', token), token);
      this.refreshPage();
      return token;
    },
  });
};
