/// <reference types='codeceptjs' />
type steps_file = typeof import('../common/steps-file.js');
type backendCallsHelper = typeof import('../helpers/backend-calls-helper.js');
type articlesMother = typeof import('../object-mothers/articles-mother.js');
type tagsMother = typeof import('../object-mothers/tags-mother.js');
type usersMother = typeof import('../object-mothers/users-mother.js');
type articlePage = typeof import('../page-objects/article/article-page.js');
type createArticlePage = typeof import('../page-objects/editor/create-article-page.js');
type globalFeedPage = typeof import('../page-objects/home/global-feed-page.js');
type MockRequestHelper = import('@codeceptjs/mock-request');
type ResembleHelper = import('codeceptjs-resemblehelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, backendCallsHelper: backendCallsHelper, articlesMother: articlesMother, tagsMother: tagsMother, usersMother: usersMother, articlePage: articlePage, createArticlePage: createArticlePage, globalFeedPage: globalFeedPage }
  interface Methods extends Puppeteer, MockRequestHelper, REST, ResembleHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MockRequestHelper>, WithTranslation<ResembleHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
