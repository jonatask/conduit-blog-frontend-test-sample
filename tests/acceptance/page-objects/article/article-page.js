const { I } = inject();

module.exports = {
  async goTo(articleSlug) {
    await I.amOnPage(`/article/${articleSlug}`);
  },

  seeArticleAuthor(username) {
    const elements = locate('a').withAttr({ href: `/profile/${username}` });
    I.seeNumberOfElements(elements, 2);
    return this;
  },

  seeArticleDate(date) {
    const elements = locate('span').withAttr({ class: 'date' }).withText(date);
    I.seeNumberOfElements(elements, 2);
    return this;
  },

  seeArticleTitle(title) {
    const element = locate('h1').withText(title);
    I.seeElement(element);
    return this;
  },

  seeArticleDescription(description) {
    const element = locate('p').withText(description);
    I.seeElement(element);
    return this;
  },

  seeTagInTheArticle(tag) {
    const element = locate('li').withText(tag);
    I.seeElement(element);
    return this;
  },

  seeArticleFavoritesCount(favouritesQuantity) {
    const elements = locate('span')
      .withAttr({ class: 'counter' })
      .withText(`(${favouritesQuantity.toString()})`);
    I.seeNumberOfElements(elements, 2);
    return this;
  },

  seeAuthorImage(authorUsername, imageUrl) {
    const elements = locate('img')
      .withAttr({ src: imageUrl })
      .inside(locate('a').withAttr({ href: `/profile/${authorUsername}` }));
    I.seeNumberOfElements(elements, 2);
    return this;
  },
};
