module.exports = {
  /*
    @return Tags with hardcoded data, to be used by visual regression tests,
            structured in the API schema of GET /api/tags

    ---- IF YOU CHANGE THIS DATA, PLEASE UPDATE THE VISUAL BASELINES TOO. ----
  */
  getTagsForVisualTests() {
    const tagsForVisualTests = {
      tags: ['tag-1-here', 'tag-2-here'],
    };
    return tagsForVisualTests;
  },
};
