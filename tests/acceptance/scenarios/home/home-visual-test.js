const { I, articlesMother, backendCallsHelper, globalFeedPage, tagsMother } = inject();

// Skipped in threads because of this issue: https://github.com/Automattic/node-canvas/issues/1394
if (process.env.profile === 'threads') {
  Feature.skip('Home');
} else {
  Feature('Home');
}

Before(async () => {
  I.amOnPage('');
});

Scenario('should not break the visual aspects of the home page', async ({ I }) => {
  I.say('Preparing the mock...');
  const articlesData = articlesMother.getArticlesForVisualTests();
  const tagsData = tagsMother.getTagsForVisualTests();
  backendCallsHelper.mockArticles(articlesData);
  backendCallsHelper.mockTags(tagsData);

  await globalFeedPage.goTo();

  I.saveScreenshot('home.png');

  /*
    The skipFailure was introduced by me in codeceptjs-resemblehelper; it was a simple implementation though.
    The idea is: you can avoid that the test fails for a given threshold but yet generate the difference image.
    It is usefull when we want to avoid flaky visual tests but yet want to see even the most minor pixel differences.
    It works for seeVisualDiff and seeVisualDiffForElement.
  */
  I.seeVisualDiff('home.png', {
    tolerance: 0.01,
    prepareBaseImage: false,
    skipFailure: true,
  });

  /*
    The verification itself.
  */
  I.seeVisualDiff('home.png', {
    tolerance: 2, // percentage
    prepareBaseImage: false,
  });
})
  .tag('home')
  .tag('visual-regression');
