/**
 *  Takes a date string of the format 2023-03-16T19:06:40.751Z
 *  and returns a string with the format dd/mm/yyyy
 *
 * @param {*} dateString
 * @returns string
 */

const formatDate = (dateString) => {
    let dateObj;
    if (dateString) {
        dateObj = new Date(dateString);
    } else {
        const todayDateObj = new Date();
        dateObj = todayDateObj;
    }
    const formattedDate = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
    return formattedDate;
};

export default formatDate;
