import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import CloseButton from "../../components/CloseButton/CloseButton";

import './Friends.css';

function Friends({themeMode}) {
  const [isOpen, setIsOpen] = useState(true)

  function handleClose() {
    setIsOpen(false);
  }

    return (
      <>
      { isOpen && (
      <div
        className={`Friends ${themeMode}`}
      >
        <div
          className={`Friends-header ${themeMode}`}
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
          <Container maxWidth="xl">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 19 }} gutterBottom>
                  Friends
				</Typography>
			<Card sx={{ maxWidth: 198 }}>
			<CardMedia
				sx={{ height: 198 }}
				image="/static/images/cards/contemplative-reptile.jpg"
				title="a super awesome user"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
				Awesome
				</Typography>
				<Typography variant="body2" color="text.secondary">
				Add this great user
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Add</Button>
				<Button size="small">Learn More</Button>
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
  themeMode: PropTypes.string
 };

export default Friends;