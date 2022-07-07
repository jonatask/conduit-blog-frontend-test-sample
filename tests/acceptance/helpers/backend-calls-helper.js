const { I } = inject();

module.exports = {
  mockArticles(mockedResponse) {
    I.mockRequest('GET', `${I.getApiUrl()}/api/articles`, 200, mockedResponse);
  },

  mockSingleArticle(slug, mockedResponse) {
    I.mockRequest('GET', `${I.getApiUrl()}/api/articles/${slug}`, 200, mockedResponse);
  },

  mockTags(mockedResponse) {
    I.mockRequest('GET', `${I.getApiUrl()}/api/tags`, 200, mockedResponse);
  },
};
