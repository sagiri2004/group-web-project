import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { registerUser } from "~/redux/authSlice";

function SignUpForm({ handleToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Đặt useDispatch ở đây

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(registerUser(user)); // Gọi dispatch trực tiếp ở đây

      if (result) {
        navigate("/login");
      }

      console.log("Register result:", result);
    } catch (error) {
      console.log("Register error:", error.message ? error.message : error);
    }
  };

  return (
    <Box flex="1">
      <Box
        component="form"
        onSubmit={handleSignUp}
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
            Create an account
          </Typography>
        </Box>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <TextField
            id="outlined-basic-username"
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
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-confirm-password"
            sx={{ color: "white" }}
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            label="Confirm Password"
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
          control={<Checkbox value="terms" color="primary" />}
          label="I agree to the Terms and Conditions"
          sx={{ color: "white" }} // Đổi màu chữ checkbox thành trắng
        />
        <Box>
          <Typography variant="body2" align="center" color="white">
            Already have an account?{" "}
            <Button
              underline="hover"
              onClick={handleToggle}
              sx={{
                textTransform: "none",
                color: "white", // Đổi màu chữ nút đăng nhập thành trắng
              }}
            >
              Sign in
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
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default SignUpForm;
