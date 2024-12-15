import { Box, Paper, Typography, IconButton, Avatar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

import MiniFlashcard from "./MiniFlashcard";
import { calculateTimeSince } from "~/utils/timeUtils";

function DetailFlashcards({ orderedFlashcards = [], createdAt, user }) {
  console.log("DetailFlashcards:", orderedFlashcards, createdAt, user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 2,
        width: "60%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <IconButton>
            <Avatar
              alt="123"
              src={user.avatar}
              sx={{ width: "48px", height: "48px" }}
            />
          </IconButton>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Create by
            </Typography>
            <Typography fontWeight="600">{user.name || "Unknown"}</Typography>
            <Typography variant="caption" color="text.secondary">
              Created {calculateTimeSince(createdAt)} ago
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
      </Paper>

      <Typography fontWeight="600" fontSize="1.5rem">
        Terms in this set ({orderedFlashcards.length})
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {orderedFlashcards.map((flashcard) => (
          <MiniFlashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </Box>
    </Box>
  );
}

export default DetailFlashcards;
