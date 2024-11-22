import { Box } from "@mui/material";

function Header({ title, description }) {
  return (
    <Box>
      <h1
        style={{
          margin: "10px 0",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          margin: "10px 0",
        }}
      >
        {description}
      </p>
    </Box>
  );
}

export default Header;
