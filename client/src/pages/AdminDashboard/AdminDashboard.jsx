import {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  useHistory,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
  Outlet,
  Link,
} from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Typography,
  TextField,
  Breadcrumbs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeartIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import TagIcon from "@mui/icons-material/LocalOffer";
import { isAuthenticated } from "../helper/auth";

import "./AdminDashboard.css";

const AdminDashboard = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Your useState, useEffect, and other hooks here

  return (
    <Box
      className="AdminDashboard"
      sx={{ minWidth: "1318.8px", minHeight: "700px" }}
    >
      <Box className="AdminDashboard-header" sx={{ minHeight: "60px" }}>
        <IconButton>
          <CloseIcon />
        </IconButton>
        {/* Add other header elements here */}
      </Box>
      <Box className="AdminDashboard-content">
        {/* Buttons */}
        <IconButton>
          <HeartIcon />
        </IconButton>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        <IconButton>
          <ThumbDownIcon />
        </IconButton>
        <IconButton>
          <TagIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={onBanUser}>
          Ban User
        </Button>
        <Button variant="contained" color="primary" onClick={onAddUser}>
          Add User
        </Button>
        <Button variant="contained" color="primary" onClick={onEditUser}>
          Edit User
        </Button>
        <Button variant="contained" color="primary" onClick={onAuthorizeUser}>
          Authorize User
        </Button>
        <Button variant="contained" color="primary" onClick={onEditComment}>
          Edit Comment
        </Button>

        {/* Text area */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Typography variant="h6">Write a post:</Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your post here..."
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button variant="contained" color="primary">
              Post
            </Button>
          </Box>
        </Box>

        {/* Pagination and breadcrumb */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Breadcrumbs>
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/admin">
              Admin
            </Link>
          </Breadcrumbs>
          <Pagination count={10} />
        </Box>
      </Box>
    </Box>
  );
};

AdminDashboard.propTypes = {
  onBanUser: PropTypes.func,
  onAddUser: PropTypes.func,
  onEditUser: PropTypes.func,
  onAuthorizeUser: PropTypes.func,
  onEditComment: PropTypes.func,
};

export default AdminDashboard;
