export const addLastLoginCredentialsToLocalStorage = () => {
  const lastLoginCredentials = {
    username: "testuser",
    email: "testuser@gmail.com",
    password: "Testpass1",
  };

  window.localStorage.setItem(
    "lastLoginCredentials",
    JSON.stringify(lastLoginCredentials)
  );
};

export const addCookiesAcceptedToLocalStorage = () =>
  window.localStorage.setItem("cookiesAccepted", JSON.stringify(true));
