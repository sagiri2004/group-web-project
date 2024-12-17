import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { loginUser } from "~/redux/authSlice";
import ForgotPassword from "./ForgotPassword";

function LoginForm({ handleToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpenForgotPassword(true);
  };
  const handleClose = (event) => {
    event.preventDefault();
    setOpenForgotPassword(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const result = await dispatch(loginUser(user));

      console.log("Login result:", result);

      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      } else {
        console.error("Failed to login:", result.payload);
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <Box flex="1">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 5,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            color="white" // Đổi màu chữ thành trắng
          >
            Hello,
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            color="white" // Đổi màu chữ thành trắng
          >
            Welcome!
          </Typography>
        </Box>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: "white", // Đổi màu label thành trắng
              },
              "& .MuiOutlinedInput-root": {
                color: "white", // Đổi màu chữ bên trong input thành trắng
                "& fieldset": {
                  borderColor: "white", // Đổi màu viền input thành trắng
                },
              },
            }}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Link
            component="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{
              alignSelf: "baseline",
              color: "white", // Đổi màu chữ liên kết thành trắng
            }}
            inert={openForgotPassword ? "true" : undefined}
          >
            Forgot your password?
          </Link>
        </Box>

        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "white" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white", // Đổi màu chữ bên trong input thành trắng
                "& fieldset": {
                  borderColor: "white", // Đổi màu viền input thành trắng
                },
              },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ color: "white" }} // Đổi màu chữ checkbox thành trắng
        />
        <Box>
          <Typography variant="body2" align="center" color="white">
            Don't have an account?{" "}
            <Button
              underline="hover"
              onClick={handleToggle}
              sx={{
                textTransform: "none",
                color: "white", // Đổi màu chữ nút đăng ký thành trắng
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            mt: 2,
            textTransform: "none",
            backgroundColor: "#1976d2", // Màu nền nút
          }}
        >
          Sign in
        </Button>
      </Box>
      <ForgotPassword open={openForgotPassword} handleClose={handleClose} />
    </Box>
  );
}

export default LoginForm;
