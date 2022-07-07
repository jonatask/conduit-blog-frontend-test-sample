const { I } = inject();

module.exports = {
  async goTo() {
    const menuNewArticleLocator = locate('a').withAttr({ routerlink: '/editor' });
    await I.click(menuNewArticleLocator);
  },

  typeTitle(data) {
    const element = locate('input').withAttr({ formcontrolname: 'title' });
    I.fillField(element, data);
    return this;
  },

  typeDescription(data) {
    const element = locate('input').withAttr({ formcontrolname: 'description' });
    I.fillField(element, data);
    return this;
  },

  typeBody(data) {
    const element = locate('textarea').withAttr({ formcontrolname: 'body' });
    I.fillField(element, data);
    return this;
  },

  typeTag(data) {
    const element = locate('input').withAttr({ placeholder: 'Enter tags' });
    I.fillField(element, data);
    I.pressKey('Enter');
    return this;
  },

  async publishArticle() {
    await I.click('Publish Article');
    return this;
  },
};
