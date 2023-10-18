/**
 *
 * @param {string} key of the local storage data
 * @returns data for particular key from local storage
 */
const getFromLocalStorage = (key = "state") => {
    const data = JSON.parse(localStorage.getItem(key));

    if (data) {
        return data;
    } else {
        console.log(`There is no "${key}" key in localStorage`);
    }
};

export default getFromLocalStorage;
