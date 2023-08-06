import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [],
  error: null,
  loading: false,
};

// вынес токен в переменную ради удобства
const token = "pk_971a3d7b53dd4d328df975f3dc507e45";

// отправляем fetch запрос на получение данных о каких-то ценах.
// я правда пытался изучать документацию, но так и не смог найти отчеты акций.
export const fetchReports = createAsyncThunk(
  "reports/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        `https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token=${token}`
      );
      const reports = await res.json();

      if (reports.error) {
        return thunkAPI.rejectWithValue(reports.error);
      }

      return thunkAPI.fulfillWithValue(reports);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ReportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchReports.pending, (state, _) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default ReportsSlice.reducer;
