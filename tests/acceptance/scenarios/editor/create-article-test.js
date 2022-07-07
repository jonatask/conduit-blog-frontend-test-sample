const { I, articlePage, articlesMother, createArticlePage, backendCallsHelper } = inject();

Feature('Editor');

Before(async () => {
  I.amOnPage('');
  await I.amSignedIn();
});

Scenario(
  'should render the New Article page and trigger the post to create an article when I submit data',
  async ({ I }) => {
    await createArticlePage.goTo();

    const article = articlesMother.getArticles(1).articles[0];

    createArticlePage
      .typeTitle(article.title)
      .typeDescription(article.description)
      .typeBody(article.body)
      .typeTag(article.tagList[0])
      .typeTag(article.tagList[1]);

    /*
        Here we check the action made by the frontend on the submit button.
        The request payload would be verified via contract tests.
        We would also test the redirect and rendering of the article page once it saves the article, but that would be another scenario,
        with mocked response from the backend.
    */
    I.usePuppeteerTo('grab request to POST /api/articles', async Puppeteer => {
      await Puppeteer.page.setRequestInterception(true);

      Puppeteer.page.on('request', request => {
        I.say('Checking if the application triggered the /api/articles...');

        if (request.url() !== `${I.getApiUrl()}/api/articles/`) {
          throw 'The application did not trigger the /api/articles/ or the url has been changed. Please check.';
        }

        I.say('Application triggered the /api/articles/ successfully.');
      });

      await Puppeteer.click('Publish Article');
    });
  }
).tag('create-article');

// TODO Implement this test after we solve the issue of mandatory fields, currently none of the fields is mandatory.
Scenario.todo(
  'should render an error message when I do not enter a mandatory data',
  async ({ I }) => {}
);
