import { Paper, Avatar, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...(theme.palette.mode === "dark" && {
    backgroundColor: "#1A2027",
  }),
}));

function ClassroomItem({ classroom }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/classroom/${classroom.id}`);
  };
  return (
    <Item onClick={handleClick} sx={{ cursor: "pointer" }}>
      <Avatar
        src={classroom.imageUrl}
        alt={classroom.name}
        sx={{ width: 56, height: 56, margin: "auto", mb: 2 }}
      />
      <Typography variant="h6">{classroom.name}</Typography>
      <Typography variant="body2">{classroom.description}</Typography>
    </Item>
  );
}

export default ClassroomItem;
