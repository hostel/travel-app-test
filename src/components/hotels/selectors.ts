import { createSelector } from '@reduxjs/toolkit';

import { IHotelsStore } from '@components/hotels/reducer';
import { TFilter } from '@components/hotels/filters';
import { RootState } from '@store/store';

export interface IAvailableFilterss {
  price: { minPrice: number; maxPrice: number };
}

/**
 * Return hotels store
 *
 * @param {RootState} state - root state
 * @returns {IHotelsStore} - hotels store
 */
export const getHostelsStore = (state: RootState): IHotelsStore => state.hotels;

/**
 * Get loading status
 */
export const getLodingStatus = createSelector(
  getHostelsStore,
  ({ isLoading }: IHotelsStore): boolean => isLoading
);

/**
 * Return hotels list
 *
 * @param {IHotelsStore} state - root state
 * @returns {IHotelsStore.items} - hotels list
 */
export const getHotelsList = createSelector(
  getHostelsStore,
  (_: RootState, activeFilters: TFilter) => activeFilters,
  ({ items }, activeFilters): IHotelsStore['items'] => {
    const isEmptyFilters = activeFilters && Object.values(activeFilters).length === 0;

    if (!activeFilters || isEmptyFilters) return items;

    let filtredData = [...items];
    if (activeFilters.stars) {
      filtredData = filtredData.filter(
        (item) => (activeFilters.stars as Record<string, boolean>)[item.stars]
      );
    }

    if (activeFilters.reviewsAmount) {
      filtredData = filtredData.filter(
        (item) => item.reviews_amount >= activeFilters.reviewsAmount
      );
    }

    if (activeFilters.minPrice || activeFilters.maxPrice) {
      filtredData = filtredData.filter((item) => {
        const isMinPrice = activeFilters.minPrice ? item.min_price >= activeFilters.minPrice : true;
        const isMaxPrice = activeFilters.maxPrice ? item.min_price <= activeFilters.maxPrice : true;

        return isMinPrice && isMaxPrice;
      });
    }

    return filtredData;
  }
);

/**
 * Get min and max prices from list
 */
export const getMinMaxPrice = createSelector(
  getHotelsList,
  (items: IHotelsStore['items']): IAvailableFilterss['price'] => {
    const [minPrice, maxPrice] = items.reduce(
      ([prevMin, prevMax], curr) => [
        Math.min(prevMin, curr.min_price),
        Math.max(prevMax, curr.min_price),
      ],
      [Infinity, -Infinity]
    );

    return {
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === -Infinity ? 0 : maxPrice,
    };
  }
);

/**
 * Get avaiable fitlers for render
 */
export const getHotelsAvailableFilters = createSelector(
  getMinMaxPrice,
  (price): IAvailableFilterss => ({
    price,
  })
);
