import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import CloseButton from "./CloseButton";

import '../assets/Friends.css';

function Friends({toggle}) {
  const [isOpen, setIsOpen] = useState(true)

  const theme = toggle ? "light-mode" : "dark-mode";

  function handleClose() {
    setIsOpen(false);
  }
  
    return (
      <>      
      { isOpen && (
      <div
        className={`Friends ${theme}`}
      >
        <div
          className={`Friends-header ${theme}`}
        >
          {" "}
          <h3 className="Friends-title">Friends</h3>

          <CloseButton handleClose={handleClose} />
        </div>
        <h4>Here are your Friends!</h4>
        <input
          dir="ltr"
          placeholder="Search"
          aria-invalid="false"
          aria-label="Label for text input"
          className="search"
          type="text"
          value="Search">
        </input>
        <br />
        <br />
        <div>
          <Container maxWidth="lg">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Friends
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <br/>
          <Container maxWidth="lg">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Friend Requests
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <br/>
          <Container maxWidth="lg">
            <Card variant="outlined" sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Suggested Friends
                </Typography>
                <Card sx={{ maxWidth: 200, maxHeight: 350 }}>
                <CardMedia
                  sx={{ height: 100 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                   />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Random John Friend
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here is a random cool person you can add as your friend.
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Add Friend</Button>
                </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Container>
        </div>
      </div>
        )}
        </>
        );
  
}
Friends.propTypes = {
  toggle: PropTypes.bool
 };

export default Friends;