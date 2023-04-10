import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/system";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Switch,
  FormHelperText,
  Typography,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Stack,
} from "@mui/material";

import {
  LightMode,
  DarkMode,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import "./Login.css";
import getFromLocalStorage from "../../utils/getFromLocalStorage";
import saveToLocalStorage from "../../utils/saveToLocalStorage";

YupPassword(yup);

const TEST_USERNAME = "testuser1";
const TEST_EMAIL = "testuser@gmail.com";
const TEST_PASSWORD = "Testpass1!";

const Login = ({ setLoginToken, themeMode, handleThemeModeChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setLoginView] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({});
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode ? "light" : "dark",
    },
  });

  const inputChangeHandler = (value) => {
    setUserData(value);
  };
  const showPasswordClickedHandler = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const themeModeViewClickedHandler = (bool) => {
    setLoginView(bool);
  };

  const loginButtonClickedHandler = () => {
    if (
      userData.username === TEST_USERNAME &&
      userData.email === TEST_EMAIL &&
      userData.password === TEST_PASSWORD
    ) {
      setSnackbarOptions({
        severity: "success",
        message: "Login successful!",
      });

      setOpenSnackbar(true);
      return handleAuthentication();
    } else {
      let users = getFromLocalStorage("users");
      if (users) {
        const filteredUsers = users.filter((user) => {
          return (
            userData.username === user.username &&
            userData.email === user.email &&
            userData.password === user.password
          );
        });

        if (filteredUsers.length > 0) {
          setSnackbarOptions({
            severity: "success",
            message: "Login successful!",
          });

          setOpenSnackbar(true);
          return handleAuthentication();
        }

        console.log(filteredUsers);
      }

      setSnackbarOptions({
        severity: "error",
        message: "Credentials are not valid. Register a new user first!",
      });
      setOpenSnackbar(true);
    }
  };

  const registerButtonClickedHandler = () => {
    // Get current users in localStorage.
    if (!getFromLocalStorage("users")) saveToLocalStorage("users", []);
    let savedUsers = getFromLocalStorage("users");

    // Check if current userData is not present in savedUsers
    // already, specifically we check if email is present.
    const foundUsers = savedUsers.find((user) => user.email === userData.email);

    if (foundUsers) {
      console.log(
        `User with email ${userData.email} already found on localStorage!`
      );

      setSnackbarOptions({
        severity: "warning",
        message: "A user with that email is already registered!",
      });
    } else {
      console.log(
        `User with email ${userData.email} NOT found on localStorage, registering!`
      );
      savedUsers.push(userData);
      saveToLocalStorage("users", savedUsers);

      console.log("User successfully registered!");
      console.log("Current localStorage users: ");
      console.log(getFromLocalStorage("users"));

      setSnackbarOptions({
        severity: "info",
        message: "Registered user!",
      });

      handleAuthentication();
    }
    setOpenSnackbar(true);
  };

  const handleAuthentication = () => {
    // Save user's credentials on localStorage under "lastLoginCredentials".
    // This will be used for Remember Me and logout features.
    rememberMe && saveToLocalStorage("lastLoginCredentials", userData);

    // Show loading spinner for one second.
    setTimeout(() => {
      setShowLoadingSpinner(true);
      setTimeout(() => {
        // Show the app.
        setLoginToken(true);
      }, 1000);
    }, 1000);
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(6, "Username must be at least 6 characters"),
    email: yup.string().required().email(),
    password: yup.string().password().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container className={`Login__container`}>
        {showLoadingSpinner ? (
          <Box className={`Login_loading-spinner`}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Box
              id="theme-mode-switch"
              className={`Login__theme-mode-switch ${themeMode}`}
            >
              <LightMode />

              <Switch
                onClick={() => handleThemeModeChange()}
                inputProps={{ "aria-label": "Toggle theme" }}
              />
              <DarkMode />
            </Box>
            <Box
              component="form"
              className={`Login__form ${themeMode}`}
              data-testid="form"
            >
              <Stack spacing={2}>
                <CustomSnackbar
                  message={snackbarOptions.message}
                  vertical={"top"}
                  horizontal={"center"}
                  alert={true}
                  severity={snackbarOptions.severity}
                  open={openSnackbar}
                  setOpen={setOpenSnackbar}
                />

                <TextField
                  id="username"
                  className={`Login__textfield ${themeMode}`}
                  placeholder="Enter username"
                  label="Username"
                  variant="outlined"
                  required
                  {...register("username")}
                  error={errors.username ? true : false}
                  helperText={errors.username?.message}
                  onChange={(event) =>
                    inputChangeHandler({
                      ...userData,
                      username: event.target.value,
                    })
                  }
                  inputProps={{ "data-testid": "username" }}
                />

                <TextField
                  id="email"
                  className={`Login__textfield ${themeMode}`}
                  placeholder="Enter email"
                  label="Email"
                  variant="outlined"
                  required
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                  onChange={(event) =>
                    inputChangeHandler({
                      ...userData,
                      email: event.target.value,
                    })
                  }
                  inputProps={{ "data-testid": "email" }}
                />

                <FormControl
                  className={`Login__textfield ${themeMode}`}
                  required={true}
                  error={errors.password ? true : false}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter password"
                    {...register("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="themeMode password visibility"
                          onClick={showPasswordClickedHandler}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(event) =>
                      inputChangeHandler({
                        ...userData,
                        password: event.target.value,
                      })
                    }
                    inputProps={{ "data-testid": "password" }}
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid="remember-me"
                      checked={rememberMe}
                      onChange={(event) => {
                        setRememberMe(event.target.checked);
                      }}
                    />
                  }
                  label="Remember me"
                />

                <Box className={`Login__form-panel`}>
                  <Button
                    data-testid="submit"
                    variant="contained"
                    onClick={handleSubmit(
                      isLoginView
                        ? loginButtonClickedHandler
                        : registerButtonClickedHandler
                    )}
                  >
                    {isLoginView ? "Login" : "Register"}
                  </Button>

                  {isLoginView ? (
                    <span onClick={() => themeModeViewClickedHandler(false)}>
                      <Typography align="center">
                        You don&apos;t have an account?{" "}
                        <span className={`subscribe`}>Register here!</span>
                      </Typography>
                    </span>
                  ) : (
                    <span onClick={() => themeModeViewClickedHandler(true)}>
                      <Typography align="center">
                        You already have an account?{" "}
                        <span className={`login`}>Login here!</span>
                      </Typography>
                    </span>
                  )}
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

Login.propTypes = {
  setLoginToken: PropTypes.func,
  themeMode: PropTypes.string,
  handleThemeModeChange: PropTypes.func,
};

export default Login;
