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
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { registerUser } from "~/redux/authSlice";

function SignUpForm({ handleToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    // Kiểm tra xem username và password có rỗng không
    if (!username || !password || !confirmPassword) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    // kiem tra da tick vao checkbox dieu khoan chua
    if (!document.querySelector('input[type="checkbox"]').checked) {
      setSnackbar({
        open: true,
        message: "Please agree to the Terms and Conditions",
        type: "error",
      });
      return;
    }

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true); // Start the loading indicator
      const result = await dispatch(registerUser(user)); // Gọi dispatch trực tiếp ở đây

      if (result) {
        if (result.payload.success) {
          setSnackbar({
            open: true,
            message: "Account created successfully",
            type: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: result.payload?.message || "An unexpected error occurred",
            type: "error",
          });
        }
        // window.location.href = "/login";
      }

      console.log("Register result:", result);

      setIsLoading(false); // Stop the loading indicator
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "An unexpected error occurred",
        type: "error",
      });
      console.log("Register error:", error.message ? error.message : error);

      setIsLoading(false); // Stop the loading indicator
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  return (
    <Box flex="1">
      {isLoading && <LinearProgress color="secondary" />}
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
            color="white"
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
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "white",
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
                color: "white",
                "& fieldset": {
                  borderColor: "white",
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
                color: "white",
                "& fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="terms" color="primary" />}
          label="I agree to the Terms and Conditions"
          sx={{ color: "white" }}
        />
        <Box>
          <Typography variant="body2" align="center" color="white">
            Already have an account?{" "}
            <Button
              underline="hover"
              onClick={handleToggle}
              sx={{
                textTransform: "none",
                color: "white",
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
            backgroundColor: "#1976d2",
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignUpForm;
