const { I } = inject();

module.exports = {
  articlePreviewLocator: locate('div').withAttr({ class: 'article-preview' }),
  articlesList: { css: '.home-page' },

  async goTo() {
    await I.amOnPage('');
    await I.click('Global Feed');
  },

  seeArticleAuthor(authorName) {
    const element = locate('a')
      .withAttr({ class: 'author' })
      .withText(authorName)
      .inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeArticleDate(date) {
    const element = locate('span')
      .withAttr({ class: 'date' })
      .withText(date)
      .inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeArticleTitle(title) {
    const element = locate('h1').withText(title).inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeArticleDescription(description) {
    const element = locate('p').withText(description).inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeTagInTheArticle(tag) {
    const element = locate('li').withText(tag).inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeArticleFavoritesCount(favouritesQuantity) {
    const element = locate('button')
      .withText(favouritesQuantity.toString())
      .inside(locate('app-favorite-button').withAttr({ class: 'pull-xs-right' }))
      .inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeAuthorImage(authorUsername, imageUrl) {
    const element = locate('img')
      .withAttr({ src: imageUrl })
      .inside(locate('a').withAttr({ href: `/profile/${authorUsername}` }))
      .inside(this.articlePreviewLocator);
    I.seeElement(element);
    return this;
  },

  seeReadMore(quantityOfArticles) {
    const elements = locate('span').withText('Read more...').inside(this.articlePreviewLocator);
    I.seeNumberOfElements(elements, quantityOfArticles);
    return this;
  },
};
