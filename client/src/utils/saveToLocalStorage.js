import getFromLocalStorage from "./getFromLocalStorage";

/**
 * @param {string} key of record in localstorage
 * @param {any} data to be assigned to the key
 * @param {string} keyProp optional - property name for specified key, it makes data to be assinged only for this key prop, not for whole key
 * @returns {void}
 */
const saveToLocalStorage = (key = "state", data = {}, keyProp) => {
    if (keyProp) {
        let state = getFromLocalStorage("state");

        state = {
            ...state,
            [keyProp]: data,
        };

        localStorage.setItem(key, JSON.stringify(state));
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export default saveToLocalStorage;
