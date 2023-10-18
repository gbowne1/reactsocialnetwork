import "./Profile.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Panel from "../../components/Panel/Panel";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import getFromLocalStorage from "../../utils/getFromLocalStorage";

import { Button, TextField } from "@mui/material";

import { useForm } from "react-hook-form";

const Profile = ({ themeMode }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState({});

    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({});
    const [fetchedUserData, setFetchedUserData] = useState({});
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const inputChangeHandler = (value) => {
        setUserData(value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    useEffect(() => {
        const currentUserData = getFromLocalStorage("lastLoginCredentials");
        const currentUsername = currentUserData.username;

        fetch("http://localhost:9000/api/users/")
            .then((res) => res.json())
            .then((res) => {
                const users = res.data;
                const fetchedCurrentUserData = users.filter(
                    (user) => user.username === currentUsername
                )[0];

                setFetchedUserData(fetchedCurrentUserData);

                const currentUserId = fetchedCurrentUserData.id;
                setUserId(currentUserId);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // form submission
    const handleSubmitForm = (data) => {
        console.log(data);

        // Update userData
        const updatedUserData = {
            username: fetchedUserData.username,
            email: fetchedUserData.email,
            password: fetchedUserData.password,
            accountImageUrl: data.imageUrl,
        };

        fetch(`http://localhost:9000/api/user/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.error);
                }

                setSnackbarOptions({
                    severity: "success",
                    message: "User data updated successfully!",
                });
                setOpenSnackbar(true);
            });
    };
    return (
        <>
            <CustomSnackbar
                message={snackbarOptions.message}
                vertical={"top"}
                horizontal={"center"}
                alert={true}
                severity={snackbarOptions.severity}
                open={openSnackbar}
                setOpen={setOpenSnackbar}
            />
            <Panel
                themeMode={themeMode}
                titleHeading="Profile"
                contentHeading="Welcome to user profile!"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <form className="" onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="Profile__textfield-section">
                        <TextField
                            id="firstName"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="First Name"
                            label="First Name"
                            variant="outlined"
                            {...register("firstName")}
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    firstName: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "firstName" }}
                        />

                        <TextField
                            id="lastName"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Last Name"
                            label="Last Name"
                            variant="outlined"
                            {...register("lastName")}
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    lastName: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "lastName" }}
                        />
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="username"
                            className={`Profile__textfield-w-95 ${themeMode}`}
                            placeholder="Username"
                            label="Username"
                            variant="outlined"
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
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="imageUrl"
                            className={`Profile__textfield-w-95 ${themeMode}`}
                            placeholder="Profile image Url"
                            label="Profile image Url"
                            variant="outlined"
                            {...register("imageUrl")}
                            error={errors.imageUrl ? true : false}
                            helperText={errors.imageUrl?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    imageUrl: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "imageUrl" }}
                        />
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="location"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Location"
                            label="Location"
                            variant="outlined"
                            {...register("location")}
                            error={errors.location ? true : false}
                            helperText={errors.location?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    location: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "location" }}
                        />

                        <TextField
                            id="relationship"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Relationship status"
                            label="Relationship status"
                            variant="outlined"
                            {...register("relationship")}
                            error={errors.relationship ? true : false}
                            helperText={errors.relationship?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    relationship: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "relationship" }}
                        />
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="bio"
                            className={`Profile__textfield-w-95 ${themeMode}`}
                            placeholder="Bio"
                            label="Bio"
                            variant="outlined"
                            multiline
                            rows={5}
                            {...register("bio")}
                            error={errors.bio ? true : false}
                            helperText={errors.bio?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    bio: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "bio" }}
                        />
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="website"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Website"
                            label="Website"
                            variant="outlined"
                            {...register("website")}
                            error={errors.website ? true : false}
                            helperText={errors.website?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    website: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "website" }}
                        />

                        <TextField
                            id="interest"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Interest"
                            label="Interest"
                            variant="outlined"
                            {...register("interest")}
                            error={errors.interest ? true : false}
                            helperText={errors.interest?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    interest: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "interest" }}
                        />
                    </div>

                    <div className="Profile__textfield-section">
                        <TextField
                            id="privarySetting"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Privary Setting (public/private/friends only)"
                            label="Privary Setting"
                            variant="outlined"
                            {...register("privarySetting")}
                            error={errors.privarySetting ? true : false}
                            helperText={errors.privarySetting?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    privarySetting: event.target.value,
                                })
                            }
                            inputProps={{ "data-testid": "privarySetting" }}
                        />

                        <TextField
                            id="notificationSetting"
                            className={`Profile__textfield ${themeMode}`}
                            placeholder="Notifictaion Setting (email/push notification)"
                            label="Notifictaion Setting"
                            variant="outlined"
                            {...register("notificationSetting")}
                            error={errors.notificationSetting ? true : false}
                            helperText={errors.notificationSetting?.message}
                            onChange={(event) =>
                                inputChangeHandler({
                                    ...userData,
                                    notificationSetting: event.target.value,
                                })
                            }
                            inputProps={{
                                "data-testid": "notificationSetting",
                            }}
                        />
                    </div>

                    <Button
                        variant="contained"
                        className="Profile__submit-button"
                        type="submit"
                    >
                        Update
                    </Button>
                </form>
            </Panel>
        </>
    );
};

Profile.propTypes = {
    themeMode: PropTypes.string,
};

export default Profile;
