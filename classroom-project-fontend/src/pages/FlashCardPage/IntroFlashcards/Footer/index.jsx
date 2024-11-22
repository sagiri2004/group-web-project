import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { IconButton, Box, Typography, LinearProgress } from "@mui/material";

function Footer({
  handlePrevFlashcard,
  handleNextFlashcard,
  currentFlashcardIndex,
  flashcardsLength,
}) {
  const progress = ((currentFlashcardIndex + 1) / flashcardsLength) * 100;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box>
          <IconButton>
            <PlayArrowIcon />
          </IconButton>
          <IconButton>
            <ShuffleIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handlePrevFlashcard}>
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              margin: "0 10px",
            }}
          >
            {currentFlashcardIndex + 1}/{flashcardsLength}
          </Typography>
          <IconButton onClick={handleNextFlashcard}>
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <CropFreeIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
}

export default Footer;
