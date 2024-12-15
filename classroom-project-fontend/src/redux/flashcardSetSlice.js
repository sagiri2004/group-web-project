import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "~/api/apiClient";

const initialState = {
  data: {
    id: "",
    title: "",
    description: "",
    flashcardOrderIds: [],
    flashcards: [],
  },
  changes: [],
  loading: false,
  error: null,
};

export const fetchFlashcardSet = createAsyncThunk(
  "flashcardSet/fetchFlashcardSet",
  async (flashcardSetId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/flashcard/${flashcardSetId}`);
      console.log("Fetch flashcard set response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Fetch flashcard set error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveChanges = createAsyncThunk(
  "flashcardSet/saveChanges",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const changes = state.flashcardSet.changes;
      const response = await apiClient.put(`/flashcard/terms/save`, changes);

      return response.data;
    } catch (error) {
      console.error("Save changes error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveChangeOrder = createAsyncThunk(
  "flashcardSet/saveChangeOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/flashcard/terms/save`, data);
      return response.data;
    } catch (error) {
      console.error("Change order error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFlashcard = createAsyncThunk(
  "flashcardSet/deleteFlashcard",
  async (flashcardId, { rejectWithValue }) => {
    try {
      // console.log("Delete flashcard:", flashcardId);
      const response = await apiClient.delete(
        `/flashcard/terms/${flashcardId}`
      );
      return response.data;
    } catch (error) {
      console.error("Delete flashcard error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const flashcardSetSlice = createSlice({
  name: "flashcardSet",
  initialState,
  reducers: {
    updateFlashcardSet: (state, action) => {
      state.changes.push(action.payload);
    },
    addFlashcard: (state, action) => {
      console.log("A:", action.payload);
      state.data.flashcards.push(action.payload.flashcard);
      console.log("B:", action.payload.flashcard);
      state.data.flashcardOrderIds.push(action.payload.flashcard.id);
      console.log("C:", action.payload.flashcard.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch flashcard set
      .addCase(fetchFlashcardSet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashcardSet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFlashcardSet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save changes to flashcard set
      .addCase(saveChanges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveChanges.fulfilled, (state) => {
        state.loading = false;
        state.changes = [];
      })
      .addCase(saveChanges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete flashcard
      // Delete flashcard
      .addCase(deleteFlashcard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        state.loading = false;

        const flashcardId = action.payload.id || action.payload.data.id;

        // Loại bỏ flashcard khỏi mảng state.data.flashcards
        state.data.flashcards = state.data.flashcards.filter(
          (flashcard) => flashcard.id != flashcardId
        );

        console.log("state.data.flashcards", state.data.flashcards);

        // Loại bỏ flashcardId khỏi mảng state.data.flashcardOrderIds
        state.data.flashcardOrderIds = state.data.flashcardOrderIds.filter(
          (id) => id != flashcardId
        );

        console.log(
          "state.data.flashcardOrderIds",
          state.data.flashcardOrderIds
        );
      })

      .addCase(deleteFlashcard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change order of flashcards
    builder
      .addCase(saveChangeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveChangeOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.data.flashcardOrderIds = action.payload.data.flashcardOrderIds;
      })
      .addCase(saveChangeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFlashcardSet, addFlashcard } = flashcardSetSlice.actions;

export default flashcardSetSlice.reducer;
