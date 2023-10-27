import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/system";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    TextField,
    FormHelperText,
    Typography,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Stack,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import CookieModal from "../../components/CookieModal/CookieModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import saveToLocalStorage from "../../utils/saveToLocalStorage";

import "./Login.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const TEST_USERNAME = "testuser1";
const TEST_EMAIL = "testuser@gmail.com";
const TEST_PASSWORD = "Testpass1!";

const Login = ({ setLoginToken, themeMode, handleThemeModeChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoginView, setLoginView] = useState(true);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState({});
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const inputChangeHandler = (value) => {
        setUserData(value);
    };
    const showPasswordClickedHandler = () => setShowPassword((show) => !show);

    const themeModeViewClickedHandler = (bool) => {
        setLoginView(bool);
    };

    const loginButtonClickedHandler = async () => {
        // Check if credentials match hardcoded test credentials
        if (
            userData.username === TEST_USERNAME &&
            userData.email === TEST_EMAIL &&
            userData.password === TEST_PASSWORD
        ) {
            // If so execute a succesful login
            setSnackbarOptions({
                severity: "success",
                message: "Login successful!",
            });
            setOpenSnackbar(true);
            return handleAuthentication();
        } else {
            // Call /api/login with userData
            fetch("http://localhost:9000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.error) {
                        setSnackbarOptions({
                            severity: "error",
                            message:
                                "Credentials are not valid. Register a new user first!",
                        });
                        return setOpenSnackbar(true);
                    }

                    setSnackbarOptions({
                        severity: "success",
                        message: "Login successful!",
                    });
                    setOpenSnackbar(true);

                    return handleAuthentication();
                });
        }
    };

    const registerButtonClickedHandler = async () => {
        // Make a request to createUser route and send the userData obj
        fetch("http://localhost:9000/api/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setSnackbarOptions({
                        severity: "warning",
                        message:
                            "A user with that email is already registered!",
                    });
                    return setOpenSnackbar(true);
                }

                setSnackbarOptions({
                    severity: "success",
                    message: "Registered user!",
                });

                setOpenSnackbar(true);
                return handleAuthentication();
            });
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
                setLoginToken && setLoginToken(true);
            }, 1000);
        }, 1000);
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required("Username is a required field")
            .min(6, "Username must be at least 6 characters"),
        email: yup
            .string()
            .required("Email is a required field")
            .email("Email must be a valid email"),
        password: yup.string().password().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    return (
        <>
            <CookieModal />
            <Container className={`Login__container`}>
                {showLoadingSpinner ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="Login__theme-mode-switch">
                            <ThemeSwitch
                                themeMode={themeMode}
                                handleThemeModeChange={handleThemeModeChange}
                            />
                        </div>
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
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        label="Password"
                                        placeholder="Enter password"
                                        {...register("password")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    className={`Login__password-icon ${themeMode}`}
                                                    aria-label="themeMode password visibility"
                                                    onClick={
                                                        showPasswordClickedHandler
                                                    }
                                                    edge="end"
                                                    data-testid="show-password"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        onChange={(event) =>
                                            inputChangeHandler({
                                                ...userData,
                                                password: event.target.value,
                                            })
                                        }
                                        inputProps={{
                                            "data-testid": "password",
                                        }}
                                    />
                                    <FormHelperText id="password-helper-text">
                                        {errors.password?.message}
                                    </FormHelperText>
                                </FormControl>

                                <FormControlLabel
                                    className={`Login__remember-checkbox ${themeMode}`}
                                    control={
                                        <Checkbox
                                            data-testid="remember-me"
                                            checked={rememberMe}
                                            onChange={(event) => {
                                                setRememberMe(
                                                    event.target.checked
                                                );
                                            }}
                                        />
                                    }
                                    label="Remember me"
                                />

                                <Box className={`Login__form-panel`}>
                                    <Button
                                        data-testid="submit"
                                        className={`Login_submit-button ${themeMode}`}
                                        variant="contained"
                                        onClick={handleSubmit(
                                            isLoginView
                                                ? loginButtonClickedHandler
                                                : registerButtonClickedHandler
                                        )}
                                    >
                                        {isLoginView ? "Login" : "Register"}
                                    </Button>

                                    <span
                                        data-testid="loginRegisterSwitch"
                                        onClick={() =>
                                            themeModeViewClickedHandler(
                                                !isLoginView
                                            )
                                        }
                                    >
                                        <Typography
                                            className={`Login__login-register-text ${themeMode}`}
                                            align="center"
                                        >
                                            {isLoginView
                                                ? "You don't have an account? "
                                                : "You already have an account? "}
                                            <span
                                                className={
                                                    isLoginView
                                                        ? `subscribe`
                                                        : `login`
                                                }
                                                data-testid={
                                                    isLoginView
                                                        ? `subscribe`
                                                        : `login`
                                                }
                                            >
                                                {isLoginView
                                                    ? "Register here!"
                                                    : "Login here!"}
                                            </span>
                                        </Typography>
                                    </span>
                                </Box>
                            </Stack>
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
};

Login.propTypes = {
    setLoginToken: PropTypes.func,
    themeMode: PropTypes.string,
    handleThemeModeChange: PropTypes.func,
};

export default Login;
