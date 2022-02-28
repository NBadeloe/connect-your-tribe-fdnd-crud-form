class CRUD {
    /**
     * The constructor method of the CRUD class
     * @param {*} url optional api endpoint base url
     */
    constructor(url = "https://tribe.api.fdnd.nl/v1/") {
        this.url = url;
    }

    /**
     * Method to create an entry at endpoint through HTTP POST request
     * @param {*} url string of api endpoint for the POST request
     * @param {*} data object for the data to send as json to the api endpoint
     * @returns the json response from the api endpoint
     */
    async Create(url, data) {
        return await this.fetchJSON(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    /**
     * Method to read entries from api endpoint with HTTP GET request
     * @param {*} url string of endpoint to get data object from
     * @returns array of object with type of member
     */
    async Read(url) {
        return await this.fetchJSON(url);
    }

    /**
     * Method to update an entry at endpoint through HTTP PATCH request
     * @param {*} url string of api endpoint for the PATCH request
     * @param {*} data object for the data to send as json to the api endpoint
     * @returns the json response from the api endpoint
     */
    async Update(url, data) {
        return await this.fetchJSON(url, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    /**
     * Method to delete an entry through HTTP DELETE method
     * ! API endpoint does not support method !
     */
    Delete() {}

    /**
     * Wraps the fetch api and returns body parsed through json with optional custom settings same as the
     * @param {*} url required string where the method send the requests to excluding the base api url
     * @param {*} settings optional object parameter to set custom settings for the fetch method
     * @param {*} base optional string to set the base of the url
     * @returns the json response from the api endpoint request
     */
    async fetchJSON(url, settings = {}, base = this.url) {
        return await fetch(base + url, settings)
            .then((res) => res.json())
            .then((json) => json.data)
            .catch((err) => err);
    }
}
