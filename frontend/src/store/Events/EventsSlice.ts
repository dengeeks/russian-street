import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCityByRegion, getEvents, getEventsByRegion } from '../../utils/EventsApi/EventsApi';
import { EventType } from '../../types/EventType';

export interface UserState {
    value: EventType[] | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    value: null,
    status: 'loading'
}

export const getEventsAsync = createAsyncThunk(
    'events/getEventsAsync',
    async () => {
      const response = await getEvents();
      return response;
});

export const filterByRegion = createAsyncThunk(
    'events/filterByRegion',
    async (id:number) => {
      const response = await getEventsByRegion(id);
      return response;
});

export const filterByCity = createAsyncThunk(
  'events/filterByCity',
  async (id:number) => {
    const response = await getCityByRegion(id);  
    return response;
});

export const eventsSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
      filterByDirection(state) {
        //ДОРАБОТАТЬ
        console.log(state.value)
      }
    },
    extraReducers: (builder) => {
        builder

          .addCase(getEventsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getEventsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
          })
          .addCase(getEventsAsync.rejected, (state) => {
            state.status = 'failed';
          })


          .addCase(filterByRegion.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(filterByRegion.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
          })
          .addCase(filterByRegion.rejected, (state) => {
            state.status = 'failed';
          })

          .addCase(filterByCity.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(filterByCity.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
          })
          .addCase(filterByCity.rejected, (state) => {
            state.status = 'failed';
          });


      },
})

export const { filterByDirection } = eventsSlice.actions;

export default eventsSlice.reducer;