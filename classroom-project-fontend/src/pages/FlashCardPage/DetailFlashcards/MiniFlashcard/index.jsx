import { Box, Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function MiniFlashcard({ flashcard }) {
  return (
    <Paper
      key={flashcard._id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        p: 2,
        minHeight: "100px",
      }}
    >
      <Box
        flex="1"
        sx={{
          borderRight: "2px solid #e0e0e0",
        }}
      >
        <Typography fontWeight="600">{flashcard.word}</Typography>
      </Box>

      <Box flex="1">
        <Typography>{flashcard.definition}</Typography>
      </Box>

      <Box flex="1" display="flex" justifyContent="right">
        <IconButton>
          <StarIcon />
        </IconButton>
        <IconButton>
          <VolumeUpIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MiniFlashcard;
