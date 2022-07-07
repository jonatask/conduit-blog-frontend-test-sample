const { I, articlesMother, backendCallsHelper, globalFeedPage } = inject();

Feature('Global Feed');

Before(async () => {
  I.amOnPage('');
});

Scenario('should render the article preview', async ({ I }) => {
  I.say('Preparing the mock...');
  const quantityOfArticles = 2;
  const articlesData = articlesMother.getArticles(quantityOfArticles);
  backendCallsHelper.mockArticles(articlesData);

  await globalFeedPage.goTo();

  I.say('Verifying the elements and their data...');
  const article = articlesData.articles[1];
  globalFeedPage
    .seeArticleAuthor(article.author.username)
    .seeArticleDate(articlesMother.getFormatedDate(article.createdAt))
    .seeArticleTitle(article.title)
    .seeTagInTheArticle(article.tagList[0])
    .seeTagInTheArticle(article.tagList[1])
    .seeArticleFavoritesCount(article.favoritesCount)
    .seeAuthorImage(article.author.username, article.author.image)
    .seeReadMore(quantityOfArticles);
})
  .tag('home')
  .tag('global-feed')
  .tag('article-preview');
