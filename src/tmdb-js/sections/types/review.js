/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;

// Sections
const section = require('../section');

/**
 * Can get review data from TMDB.
 */
exports.Review = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the review.
     * @param {exports.ReviewSection} reviewSection The parent ReviewSection.
     */
    constructor(id, reviewSection) {
        super(id, reviewSection);
    }

    /**
     * Gets the review details based on the passed id.
     * @returns A Promise of JSON data with review details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }
}

/**
 * Can get review data from TMDB.
 */
exports.ReviewSection = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.REVIEW, undefined, apiKey, language);
    }

    /**
     * Gets the review with the passed ID.
     * @param {string} id The ID of the review to get.
     * @returns A Review object with the passed ID.
     */
    getReview(id) {
        return new exports.Review(id, this);
    }
}