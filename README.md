# Web Acceptance Test Automation

> An example of automated acceptance tests. Application under test: https://react-redux.realworld.io/

### 📋 Table of contents

- [Web Acceptance Test Automation](#web-acceptance-test-automation)
    - [📋 Table of contents](#-table-of-contents)
    - [💡 Approaches](#-approaches)
    - [🗄️ Project structure](#️-project-structure)
    - [⚙️ Development stack](#️-development-stack)
    - [🔧 Requirements](#-requirements)
    - [💻 How to run in your local machine](#-how-to-run-in-your-local-machine)
    - [🤔 Frequent Asked Questions](#-frequent-asked-questions)

### 💡 Approaches

These are acceptance tests, not to confuse with end-to-end tests. They are meant to verify whether or not the frontend renders the elements correctly given a certain payload from the backend. Also, to check whether or not the frontend triggers the actions to the backend. And to test the visual and the compatibility across different browsers, versions and screen resolutions.

Here we test the **frontend** only, i.e. we do not test in this suite whether or not the **backend** stored what the frontend sent to it. That is part of the backend tests.

However, the test strategy varies from case to case, what works in a project may not work in another.

The overall strategy for this specific Conduit application could consist of:

- Unit tests
- Contract tests
- Acceptance tests

Article for reference: https://building.nubank.com.br/why-we-killed-our-end-to-end-test-suite/
Video with more on the strategy: https://www.youtube.com/watch?v=-6x6XBDf9sQ

Aspects about the test suite:<br />

- The tests would be located inside the application's repo, see my [article](https://medium.com/justeattakeaway-tech/where-to-save-test-automation-scripts-c19642a07cb3) on the reasoning.
- [Dynamic Dependency Injection](https://codecept.io/pageobjects/#dynamic-injection)
- [Page Objects](https://codecept.io/pageobjects/) with the [DRY](https://thevaluable.dev/dry-principle-cost-benefit-example/) principle.
- [Object Mother](https://martinfowler.com/bliki/ObjectMother.html)
  > It could make use of [fluent builder](https://reflectoring.io/objectmother-fluent-builder/) too but it would be overengineering for this application.
- Actors and Processes. Source: **The Pragmatic Programmer**, 20th edition, page #181.
  - _An actor is an independent virtual processor with its own local (and private) state._
  - _A process is typically a more general-purpose virtual processor, often implemented by the operating system to facilitate concurrency. Processes can be constrained (by convention) to behave like actors [...]._

### 🗄️ Project structure

```
frontend
    tests/acceptance/
        common/
            steps-file.js           <-- Custom commands across the test suite

        config/
            codecept.conf.js        <-- Configuration file of CodeceptJS
            includes.js             <-- Mapping of objects for dynamic injection
            steps.d.ts              <-- Generated automatically by CodeceptJS to have a good experience in an IDE

        helpers/                    <-- Custom helpers

        object-mothers/             <-- Object Mother design pattern
            articles-mother.js      <-- Articles Object Mother

        output/                     <-- Allure Report generated automatically

        page-objects/               <-- Page Objects design pattern
            home/                   <-- Application module
                global-feed-page.js <-- Locators and functions of a feature

        scenarios/
            home/
                global-feed-test.js <-- Test file containing the test scripts

        visual-baselines/           <-- Baselines for visual regression tests
```

The test file controls everything, that is, it knows the Page Objects and also knows the data it has to use. Page Objects do not know the data and vice-versa. The code has low coupling and is therefore easier to maintain.

### ⚙️ Development stack

- [Node.js](https://nodejs.org/en/)
- [JavaScript](https://www.javascript.com/)
- [CodeceptJS](https://codecept.io/)
- [Puppeteer](https://developer.chrome.com/docs/puppeteer/)
- [Polly.JS](https://github.com/Netflix/pollyjs)
- [Resemble.JS](https://www.npmjs.com/package/resemblejs)
- [Faker](https://github.com/faker-js/faker)
- [Allure report](https://docs.qameta.io/allure-report/)

For the contract tests I would probably pull a [Pact Broker](https://github.com/maelvls/pact-broker-kubernetes/tree/master/kubernetes).

### 🔧 Requirements

- [Node.js](https://nodejs.org/en/download/) >= 8.9.1. This is needed to run the tests.
- [Java JRE](https://www.java.com/en/download/) >= 8. This is needed to render the Allure report.

### 💻 How to run in your local machine

Given you installed the [required tools](#requirements), do the steps below.

1. Via terminal, clone the repo:

```sh
git clone https://github.com/jonatask/conduit-blog-frontend-test-sample.git
```

Expected result: A folder named _conduit-blog-frontend-test-sample_ just has been downloaded.

2. Via terminal, open the just downloaded folder and run:

```sh
npm install
```

Expected result: Dependencies of the project has been downloaded and a folder named _node_modules_ has been created.

3. Copy the file _.env.example_, name the new file _.env_.

4. Edit the _.env_ file and change the properties according to your data mass and/or preference.

   - ACCEPTANCE_TEST_SHOW_BROWSER=true // false means that it runs in headless mode
   - ACCEPTANCE_TEST_EDITOR_USERNAME= // the username of a user you signed up
   - ACCEPTANCE_TEST_EDITOR_EMAIL= // the email of a user you signed up
   - ACCEPTANCE_TEST_EDITOR_PASSWORD='' // the password of a user you signed up, between single quotes to prevent errors on special chars parsing

5. Run the tests:

   5.1 Run with basic view:

   ```sh
   npm run test:acceptance
   ```

   5.2 Run with details view:

   ```sh
   npm run test:acceptance -- --steps
   ```

   5.3 Run with threads, e.g. with 3 threads:

   ```sh
   npm run test:acceptance:threads 3
   ```

   5.4 Run the tests linked to a tag, e.g. the tests with tag _article-preview_:

   ```sh
   npm run test:acceptance -- --grep @article-preview
   ```

   5.5 Run generating an Allure report:

   ```sh
   npm run test:acceptance -- --plugins allure
   ```

Expected result: Tests should run successfully. A test report should be found in /tests/acceptance/output/

6. If you ran with Allure report, then run the command via terminal to render the Allure report.

```sh
allure serve tests/acceptance/output
```

### 🤔 Frequent Asked Questions

**Can I run the tests in threads but yet with _ACCEPTANCE_TEST_SHOW_BROWSER=true_?**<br />
Yes, you can. The settings are independent.<br />
In the pipeline it runs with threads in headless mode (i.e. _ACCEPTANCE_TEST_SHOW_BROWSER=false_).

**Can I debug a test?**<br />
Yes, you can. Set _ACCEPTANCE_TEST_SHOW_BROWSER=true_, add a `pause()` command in the test script on the point you want to debug and run the test. It will open an interactive terminal. See: https://codecept.io/basics/#pause<br />
You can also run the tests in debug or verbose mode:

```sh
npm run test:acceptance -- --debug
npm run test:acceptance -- --verbose
```

**Visual Regression Tests are not running with threads, why?**<br />
There is an issue in canvas (one of the dependencies of Resemble.JS): https://github.com/Automattic/node-canvas/issues/1394<br />
They still run in headless mode but require a separate job in the pipeline because of the threads issue.
