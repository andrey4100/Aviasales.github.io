/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Функция для получения searchId
export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    return data; 
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, rejectWithValue }) => {
  try {
    const { searchId } = getState().tickets;
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    valueFilterTransfer: [0, 1, 2, 3],
    showAllTickets: true,
    numShowTicket: 5,
    isLoading: false,
    error: false,
    searchId: false,
    stopFetch: false,
    fetchStatus500: 0,
  },
  reducers: {
    showMoreTicket(state) {
      state.numShowTicket += 5;
    },

    sortByPrice(state) {
      state.tickets = [...state.tickets].sort((a, b) => a.price - b.price);
    },

    sortByDuration(state) {
      state.tickets = [...state.tickets].sort((a, b) => {
        const durationA = a.segments.reduce((sum, seg) => sum + seg.duration, 0);
        const durationB = b.segments.reduce((sum, seg) => sum + seg.duration, 0);
        return durationA - durationB;
      });
    },

    sortByOptimal(state) {
      state.tickets = [...state.tickets].sort((a, b) => {
        const durationA = a.segments.reduce((sum, seg) => sum + seg.duration, 0);
        const durationB = b.segments.reduce((sum, seg) => sum + seg.duration, 0);
        return (durationA + a.price) - (durationB + b.price);
      });
    },

    setTab(state, action) {
      state.selectedTab = action.payload;
    },
    toggleAllFilters(state, action) {
      const checked = action.payload;
      state.showAllTickets = checked;
      state.valueFilterTransfer = checked ? [0, 1, 2, 3] : [];
    },

    setFilterValue(state, action) {
      const { filterValue, isChecked } = action.payload;
      state.valueFilterTransfer = isChecked
        ? [...state.valueFilterTransfer, filterValue]
        : state.valueFilterTransfer.filter(item => item !== filterValue);
      state.showAllTickets = state.valueFilterTransfer.length === 4;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.stopFetch = action.payload.stop;
        state.isLoading = !action.payload.stop;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.error = action.error.message; 
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        if (action.payload === '500') {
          state.fetchStatus500 += 1;
        }
      });
  },
});

export const {
  showMoreTicket,
  sortByPrice,
  sortByDuration,
  sortByOptimal,
  setTab,
  setFilterValue,
  toggleAllFilters,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;