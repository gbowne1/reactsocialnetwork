/**
 *
 * @param {string} key of the local storage data
 * @returns data for particular key from local storage or null if not found.
 */
const getFromLocalStorage = (key = "state") => {
    const data = JSON.parse(localStorage.getItem(key));

    if (data) {
        return data;
    } else {
        return null;
    }
};

export default getFromLocalStorage;
