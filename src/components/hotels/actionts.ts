import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const fetchHotelsAction = createAction<undefined, string>('hotels/fetchList');

export const fetchHotelsThunk = createAsyncThunk(fetchHotelsAction.type, async () => {
  const url = `${process.env.PUBLIC_URL}/hotels.json`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
});
