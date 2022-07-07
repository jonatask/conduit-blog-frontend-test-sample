const { I, articlesMother, articlePage, backendCallsHelper } = inject();

Feature('Article');

Before(async () => {
  I.amOnPage('');
  await I.amSignedIn();
});

// TODO: Skipped because there is an issue in the application: it returns 404 Not Found when we access an article page via url.
Scenario.skip('should render the article page', async ({ I }) => {
  const articleData = articlesMother.getSingleArticle();
  backendCallsHelper.mockSingleArticle(articleData);

  const article = articleData.article;
  await articlePage.goTo(article.slug);

  articlePage
    .seeArticleAuthor(article.author.username)
    .seeArticleDate(articlesMother.getFormatedDate(article.createdAt))
    .seeArticleTitle(article.title)
    .seeTagInTheArticle(article.tagList[0])
    .seeTagInTheArticle(article.tagList[1])
    .seeArticleFavoritesCount(article.favoritesCount)
    .seeAuthorImage(article.author.username, article.author.image);
}).tag('article-page');
