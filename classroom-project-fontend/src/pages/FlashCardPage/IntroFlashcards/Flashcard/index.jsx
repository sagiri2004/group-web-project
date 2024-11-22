import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function textToSpeech(text, language = "en-US") {
  // Kiểm tra xem trình duyệt có hỗ trợ Web Speech API hay không
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    // Tạo một đối tượng SpeechSynthesisUtterance với văn bản cần đọc
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language;

    // Thiết lập các thuộc tính bổ sung (nếu cần)
    utterance.pitch = 1; // Cao độ (mặc định là 1)
    utterance.rate = 0.8; // Tốc độ đọc (mặc định là 1)
    utterance.volume = 1; // Âm lượng (mặc định là 1)

    // Đọc văn bản
    synth.speak(utterance);
  } else {
    console.log("Trình duyệt của bạn không hỗ trợ Speech Synthesis.");
  }
}

function FlashCard({ data, backCard = false, isFlipped, onClick }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "60vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        transform: isFlipped
          ? backCard
            ? "rotateX(0deg)"
            : "rotateX(180deg)"
          : backCard
          ? "rotateX(180deg)"
          : "rotateX(0deg)",
        backfaceVisibility: "hidden",
        transition: "transform 0.8s ease",
      }}
    >
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "right",
          flex: 1,
        }}
      >
        <IconButton>
          <StarIcon />
        </IconButton>
        <IconButton onClick={() => textToSpeech(data)}>
          <VolumeUpIcon />
        </IconButton>
      </CardActions>
      <CardContent
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: 10,
          paddingTop: "18vh",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FlashCard;
