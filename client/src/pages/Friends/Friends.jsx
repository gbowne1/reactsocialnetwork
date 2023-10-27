import "./Friends.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";

import Panel from "../../components/Panel/Panel";

function Friends({ themeMode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {isOpen && (
                <Panel
                    themeMode={themeMode}
                    titleHeading="Friends"
                    contentHeading="Here are your Friends!"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                >
                    <input
                        dir="ltr"
                        placeholder="Search"
                        aria-invalid="false"
                        aria-label="Label for text input"
                        type="text"
                        defaultValue="Search"
                    ></input>
                    <br />
                    <br />
                    <div>
                        <Container maxWidth="xl">
                            <Card variant="outlined" sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 19 }}
                                        gutterBottom
                                    >
                                        Friends
                                    </Typography>
                                    <Card sx={{ maxWidth: 198 }}>
                                        <CardMedia
                                            sx={{ height: 198 }}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="a super awesome user"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                Awesome
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Add this great user
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Add</Button>
                                            <Button size="small">
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </CardContent>
                            </Card>
                        </Container>
                    </div>
                </Panel>
            )}
        </>
    );
}
Friends.propTypes = {
    themeMode: PropTypes.string,
    // children: PropTypes.object.isRequired,
};

export default Friends;
