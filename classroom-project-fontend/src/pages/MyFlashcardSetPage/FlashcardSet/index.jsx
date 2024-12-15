import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyleIcon from "@mui/icons-material/Style";

function FlashcardSet({
  title,
  //   authorName,
  //   authorAvatar,
  handleClickFlashcardSet,
  handleRemoveFlashcardSet,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        padding: 2,
        border: "1px solid",
        borderColor: "transparent",

        "&:hover": {
          cursor: "pointer",
          border: "1px solid #ccc",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: "8px",
            backgroundColor: "primary.dark",
          }}
        >
          <StyleIcon
            fontSize="large"
            sx={{
              color: "#fff",
            }}
          />
        </Box>
        <Box
          onClick={handleClickFlashcardSet}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box display="flex" gap={2} alignItems="center">
            {/* <Typography variant="subtitle1">{count} terms</Typography>
          <Divider orientation="vertical" flexItem /> */}
            {/* <Avatar
              alt={authorName}
              src={authorAvatar}
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="subtitle1">{authorName}</Typography> */}
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem key="Pyxis" selected={false} onClick={handleClose}>
            <Button
              variant="text"
              startIcon={<RemoveIcon />}
              onClick={() => {
                handleRemoveFlashcardSet();
                handleClose();
              }}
              sx={{
                textTransform: "none",
                color: "red",
              }}
            >
              Remove
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}

export default FlashcardSet;
