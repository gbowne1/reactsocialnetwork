/**
 * Fetches user data based on the provided email address from the /users API endpoint.
 *
 * @param {string} email - The email address used to filter the user data.
 * @param {function} setUserData - A function used to set the fetched user data.
 * @returns {void}
 */

const fetchUserData = (email, setUserData) => {
    const currentEmail = email;

    fetch("http://localhost:9000/api/users/")
        .then((res) => res.json())
        .then((res) => {
            const users = res.data;
            const fetchedCurrentUserData = users.filter(
                (user) => user.email === currentEmail
            )[0];

            if (fetchedCurrentUserData) setUserData(fetchedCurrentUserData);
        });
};

export default fetchUserData;
