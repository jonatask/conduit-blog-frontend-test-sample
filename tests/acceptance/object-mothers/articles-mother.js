const { faker } = require('@faker-js/faker');
const moment = require('moment');

const numberOfArticlesPerPage = 10;

module.exports = {
  /*
    @return Articles with data from Faker,
            structured in the API schema of GET /api/articles
    @param quantity
  */
  getArticles(quantity = numberOfArticlesPerPage + 1) {
    let articleListInApiSchema = {
      articles: [],
      articlesCount: quantity,
    };

    var article;

    for (i = 0; i < quantity; i++) {
      article = {
        slug: faker.lorem.slug(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.text(),
        body: faker.lorem.paragraph(),
        tagList: [faker.company.bsBuzz(), faker.company.bsBuzz()],
        createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
        updatedAt: faker.date.between('2021-01-02T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        favorited: faker.datatype.boolean,
        favoritesCount: faker.datatype.number({ max: 999 }),
        author: {
          username: faker.internet.userName(),
          bio: faker.name.jobTitle(),
          image: faker.internet.avatar(),
          following: faker.datatype.boolean,
        },
      };
      articleListInApiSchema.articles.push(article);
    }

    return articleListInApiSchema;
  },

  /* 
    @return Date formatted according to the rendered in web page.
        Example 1: June 3, 2020
        Example 2: June 13, 2020
    @param Date in the format YYYY-MM-DDTHH:mm:ss.mmmZ
    */
  getFormatedDate(date) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss.mmmZ').format('MMMM D, YYYY');
  },

  /*
    @return Articles with hardcoded data, to be used by visual regression tests,
            structured in the API schema of GET /api/articles
    
    ---- IF YOU CHANGE THIS DATA, PLEASE UPDATE THE VISUAL BASELINES TOO. ----
  */
  getArticlesForVisualTests() {
    const articlesForVisualTests = {
      articles: [
        {
          slug: 'slug-1-here',
          title: 'Title 1 here',
          description: 'Description 1 here?',
          body: 'Bio 1 here',
          tagList: ['tag-1-here', 'tag-2-here'],
          createdAt: '2016-02-18T03:22:56.637Z',
          updatedAt: '2016-02-18T03:48:35.824Z',
          favorited: false,
          favoritesCount: 0,
          author: {
            username: 'author1',
            bio: 'Author 1 bio here',
            image: 'https://api.realworld.io/images/demo-avatar.png',
            following: false,
          },
        },
        {
          slug: 'slug-2-here',
          title: 'Title 2 here',
          description: 'Description 2 here?',
          body: 'Bio 2 here',
          tagList: ['tag-1-here', 'tag-2-here'],
          createdAt: '2016-02-18T03:22:56.637Z',
          updatedAt: '2016-02-18T03:48:35.824Z',
          favorited: false,
          favoritesCount: 0,
          author: {
            username: 'author2',
            bio: 'Author 2 bio here',
            image: 'https://api.realworld.io/images/demo-avatar.png',
            following: false,
          },
        },
      ],
      articlesCount: 2,
    };
    return articlesForVisualTests;
  },

  /*
    @return Article to render the article page,
            structured in the API schema of GET /api/articles/:slug
  */
  getSingleArticle() {
    const article = {
      article: {
        slug: 'slug-1-here',
        title: 'Title 1 here',
        description: 'Description 1 here?',
        body: 'Bio 1 here',
        tagList: ['tag-1-here', 'tag-2-here'],
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:48:35.824Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'author1',
          bio: 'Author 1 bio here',
          image: 'https://api.realworld.io/images/demo-avatar.png',
          following: false,
        },
      },
    };
    return article;
  },
};
