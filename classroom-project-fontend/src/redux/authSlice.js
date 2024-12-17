import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "~/api/apiClient";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", user);
      console.log("response", response);
      return response?.data.data; // Trả về dữ liệu đăng nhập
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", user);
      return response?.data.data;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(
        error.response?.data.data || "Registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Call API để đăng xuất nếu cần
      // await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data.data || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: {
        id: null,
        username: null,
        name: null,
        avatar: null,
      },
      token: null,
      error: null,
      loading: false,
    },
    logout: {
      error: null,
      loading: false,
    },
    register: {
      error: null,
      loading: false,
    },
  },
  reducers: {
    clearError: (state) => {
      state.login.error = null;
      state.register.error = null;
      state.logout.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý Login
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.token = action.payload?.token;

        // Lưu token vào localStorage
        localStorage.setItem("token", action.payload?.token);

        console.log("action.payload?.user", action.payload);
        state.login.currentUser = action.payload?.user;
        state.login.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || "Login failed";
      })

      // Xử lý Logout
      .addCase(logoutUser.pending, (state) => {
        state.logout.loading = true;
        state.logout.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logout.loading = false;

        // Xóa thông tin người dùng và token
        state.login.currentUser = null;
        state.login.token = null;

        // Xóa token khỏi localStorage
        localStorage.removeItem("token");

        state.logout.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logout.loading = false;
        state.logout.error = action.payload || "Logout failed";
      })

      // Xử lý Register
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.register.loading = false;
        state.register.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload || "Registration failed";
      });
  },
});

export default authSlice.reducer;
