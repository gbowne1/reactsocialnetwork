export const lastLoginCredentials = {
  username: "testuser1",
  email: "testuser@gmail.com",
  password: "Testpass1",
  accountImageUrl:
    "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
};

export const addLastLoginCredentialsToLocalStorage = () => {
  window.localStorage.setItem(
    "lastLoginCredentials",
    JSON.stringify(lastLoginCredentials)
  );
};

export const addCookiesAcceptedToLocalStorage = () =>
  window.localStorage.setItem("cookiesAccepted", JSON.stringify(true));
