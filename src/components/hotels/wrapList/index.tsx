import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Empty, Spin, Pagination } from 'antd';

import { IHotel } from '@components/hotels/reducer';
import { fetchHotelsThunk } from '@components/hotels/actionts';
import {
  getHotelsList,
  getHotelsAvailableFilters,
  getLodingStatus,
} from '@components/hotels/selectors';
import { HotelItem } from '@components/hotels/hotelItem';
import { Filters, TFilter } from '@components/hotels/filters';
import { usePagination } from '@utils/usePagination';
import { RootState } from '@store/store';

import styles from './wrapList.module.scss';

const PER_PAGE = 5;

/**
 * Component for render list of hotels
 *
 * @returns {React.ReactElement} - element
 */
export const WrapList = (): React.ReactElement => {
  const [selectedFilters, selectFilter] = useState<TFilter>({});
  const [activeFilters, addActiveFilters] = useState({});
  const dispatch = useDispatch();
  const { items, availableFilters, isLoading } = useSelector((state: RootState) => ({
    items: getHotelsList(state, activeFilters),
    isLoading: getLodingStatus(state),
    availableFilters: getHotelsAvailableFilters(state, activeFilters),
  }));
  const { jump, currentData, currentPage } = usePagination(items, PER_PAGE);

  useEffect(() => {
    dispatch(fetchHotelsThunk());
  }, []);

  /**
   * Apply selected filters
   */
  const applySelectedFilters = (): void => {
    addActiveFilters(selectedFilters);
  };

  /**
   * Clear active filters
   */
  const clearFilters = (): void => {
    addActiveFilters({});
  };

  const isActiveFilters = Object.values(activeFilters).length > 0;
  const isSelectedFilters = Object.values(selectedFilters).length > 0;

  return (
    <div className={styles.wrap}>
      {isLoading ? (
        <div className={styles.wrapSpin}>
          <Spin />
        </div>
      ) : (
        <React.Fragment>
          <div className={styles.wrapForm}>
            <Form layout="vertical">
              <Filters
                selectedFilters={selectedFilters}
                selectFilter={selectFilter}
                availableFilters={availableFilters}
              />
              <Form.Item>
                <Button block disabled={!isSelectedFilters} onClick={applySelectedFilters}>
                  Применить фильтрs
                </Button>
              </Form.Item>
              {isActiveFilters ? (
                <Form.Item>
                  <Button block onClick={clearFilters}>
                    Очистить фильтры
                  </Button>
                </Form.Item>
              ) : null}
            </Form>
          </div>
        </React.Fragment>
      )}

      {!isLoading && items.length === 0 && (
        <React.Fragment>
          <Empty />
          <div className={styles.emptyText}>
            {isActiveFilters ? <p>Записей не найдено</p> : <p>Ничего не найдено</p>}
          </div>
        </React.Fragment>
      )}

      {!isLoading && items.length > 0 && (
        <React.Fragment>
          {currentData.map((item: IHotel, index) => (
            <HotelItem key={`${item.name}_${item.type}_${index}`} {...item} />
          ))}
          <Pagination
            current={currentPage}
            onChange={jump}
            total={items.length}
            pageSize={PER_PAGE}
          />
        </React.Fragment>
      )}
    </div>
  );
};
