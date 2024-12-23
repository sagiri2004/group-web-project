import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "~/api/apiClient";

const initialState = {
  currentUser: {
    id: null,
    username: null,
    name: null,
    avatar: null,
  },
  error: null,
  loading: false,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/me");
      return response?.data?.data;
    } catch (error) {
      console.error("Fetch user error:", error);
      return rejectWithValue(error.response?.data || "Fetch user failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/user", user);
      console.log("Update user response:", response.data.user);
      return response?.data?.user;
    } catch (error) {
      console.error("Update user error:", error);
      return rejectWithValue(error.response?.data || "Update user failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload; // Cập nhật user từ action
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
