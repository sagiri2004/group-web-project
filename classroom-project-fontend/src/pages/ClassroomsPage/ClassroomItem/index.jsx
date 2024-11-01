import { Paper, Avatar, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

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
  return (
    <Item>
      <Avatar
        src={classroom.avatar}
        alt={classroom.name}
        sx={{ width: 56, height: 56, margin: "auto", mb: 2 }}
      />
      <Typography variant="h6">{classroom.name}</Typography>
      <Typography variant="body2">{classroom.description}</Typography>
    </Item>
  );
}

export default ClassroomItem;
