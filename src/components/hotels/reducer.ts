import { createReducer } from '@reduxjs/toolkit';

import { fetchHotelsThunk } from '@components/hotels/actionts';

export interface IHotel {
  name: string;
  country: string;
  address: string;
  stars: number;
  type: string;
  description: string;
  services: string[];
  min_price: number;
  currency: string;
  rating: number;
  reviews_amount: number;
  last_review: string;
}

export interface IHotelsStore {
  items: IHotel[];
  error: string;
  isLoading: boolean;
}

const INITIAL_STATE: IHotelsStore = {
  items: [],
  error: '',
  isLoading: false,
};

export const hotels = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(fetchHotelsThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchHotelsThunk.fulfilled, (state, action) => {
      // eslint-disable-next-line no-console
      console.log('payload', action.payload);
      state.items = action.payload.hotels;
      state.isLoading = false;
    })
    .addCase(fetchHotelsThunk.rejected, (state) => {
      state.error = 'error';
      state.isLoading = false;
    });
});
