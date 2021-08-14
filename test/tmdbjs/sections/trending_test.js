const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbTestUtils = require('../utils/tmdb_test_utils');
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const timeWindows = tmdbUtils.timeWindows;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('Trending media GET query tests', () => {

        // TODO [david98hall, 2021-08-14]: Test all GET query methods

        it('Should find any trending media (time window: day).', done => {
            
            tmdb.getTrending(timeWindows.DAY).getAll().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find any trending media (time window: week).', done => {
            
            tmdb.getTrending(timeWindows.WEEK).getAll().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });
    });
}