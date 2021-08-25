/**@module tmdb-js/sections/types */

// TMDB utilities
const tmdbUtils = require('../../../utils/tmdb_utils');
const sections = tmdbUtils.sections;
const dataTypes = tmdbUtils.dataTypes;
const actionTypes = tmdbUtils.actionTypes;

// Sections
const section = require('../section');

/**
 * Can get and handle list data on TMDB.
 */
exports.List = class extends section.Section {

    /**
     * Sets properties.
     * @param {string} id The id of the list.
     * @param {exports.ListSection} listSection The parent ListSection.
     */
    constructor(id, listSection) {
        super(id, listSection);
    }

    /**
     * Gets all details about this list.
     * @returns A Promise of list details.
     */
    async getDetailsAsync() {
        return await this.getQueryResultAsync();
    }

    /**
     * Gets the item status of this list.
     * @returns A Promise of item status data.
     */
    async getItemStatusAsync() {
        return await this.getChildQueryResultAsync(dataTypes.ITEM_STATUS);
    }

    /**
     * Adds a movie to this list.
     * @param {Number} movieId The movie id.
     * @param {string} sessionId The session id.
     * @returns A Promise of a boolean value indicating whether the addition was successful or not.
     */
    async addMovieAsync(movieId, sessionId) {
        let requestBody = { "media_id": movieId };
        let addItemSection = this.createChild(actionTypes.ADD_ITEM);
        return await tmdbUtils.postAsync(addItemSection.toString(), this._getUrlParameters(sessionId), requestBody);
    }

    /**
     * Removes a movie from this list.
     * @param {Number} movieId The movie id.
     * @param {string} sessionId The session id.
     * @returns A Promise of a boolean value indicating whether the removal was successful or not.
     */
    async removeMovieAsync(movieId, sessionId) {
        let requestBody = { "media_id": movieId };
        let removeItemSection = this.createChild(actionTypes.REMOVE_ITEM);
        return await tmdbUtils.postAsync(removeItemSection.toString(), this._getUrlParameters(sessionId), requestBody);
    }

    /**
     * Clears this list.
     * @param {string} sessionId The session id.
     * @returns A Promise of a boolean value indicating whether the clearing was successful or not.
     */
    async clearAsync(sessionId) {
        let urlParameters = this._getUrlParameters(sessionId);
        urlParameters["confirm"] = true;
        let clearSection = this.createChild(actionTypes.CLEAR);
        return await tmdbUtils.postAsync(clearSection.toString(), urlParameters);
    }

    /**
     * Deletes this list.
     * @param {string} sessionId The session id.
     * @returns A Promise of a boolean value indicating whether the deletion was successful or not.
     */
    async deleteAsync(sessionId) {
        return await tmdbUtils.deleteAsync(this.toString(), this._getUrlParameters(sessionId));
    }

    _getUrlParameters(sessionId) {
        return {
            "api_key": this._apiKey,
            "session_id": sessionId
        };
    }
}

/**
 * Can get data about lists in general from the TMDB API.
 */
exports.ListSection = class extends section.Section {
    
    /**
     * Sets properties.
     * @param {string} apiKey The TMDB API key.
     * @param {string} language The language of queries, the default is "en-US".
     */
    constructor(apiKey, language = "en-US") {
        super(sections.LIST, undefined, apiKey, language);
    }

    /**
     * Gets a List instance, based on the passed ID.
     * @param {string} id The ID of the list.
     * @returns A List object with the passed ID.
     */
    getList(id) {
        return new exports.List(id, this);
    }

    /**
     * Creates a new list with the passed properties.
     * 
     * @param {string} name The name of the list.
     * @param {string} description The description of the list.
     * @param {string} language The language of the list.
     * @param {string} sessionId The session ID.
     * 
     * @returns A Promise of a List instance representing the created list
     * (null if the creation was not successful).
     */
    async createListAsync(name, description, language = "en-US", sessionId) {

        const requestBody = {
            "name": name,
            "description": description,
            "language": language
        };

        const urlParameters = {
            "api_key": this._apiKey,
            "session_id": sessionId
        };

        const response = await tmdbUtils.postAsync(this.toString(), urlParameters, requestBody);

        if (response && response["success"]) {
            return new exports.List(response["list_id"], this);
        }

        return null;
    }
}