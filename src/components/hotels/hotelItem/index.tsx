import React, { useState } from 'react';
import { Card, Rate, Button } from 'antd';

import { IHotel } from '@components/hotels/reducer';
import { CURRENCIES_MAP } from '@constants/currencies';
import { renderStrAmount } from '@utils/renderStrAmount';

import styles from './hotelItem.module.scss';

const words = ['отзыв', 'отзыва', 'отзывов'];

/**
 * Component for render hotel item
 *
 * @param {IHotel} props - hotel data
 * @returns {React.ReactElement} - element
 */
export const HotelItem = ({
  type,
  name,
  reviews_amount,
  rating,
  description,
  min_price,
  currency,
}: IHotel): React.ReactElement => {
  const [isBooked, setBooking] = useState(false);

  /**
   * Change booking status
   */
  const onClick = (): void => {
    setBooking(true);
  };

  return (
    <div className={styles.wrap}>
      <Card key={`${name}_${type}`} title={name}>
        <div className={styles.wrapRating}>
          <Rate disabled defaultValue={rating} />
          <span className={styles.reviewsAmount}>{renderStrAmount(reviews_amount, words)}</span>
        </div>
        <br />
        <p>{description}</p>
        <div className={styles.wrapBooking}>
          <Button disabled={isBooked} onClick={onClick}>
            {isBooked ? 'Забронировано' : 'Забронировать'}
          </Button>
          <div>
            <span className={styles.price}>
              {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(min_price)}{' '}
              {CURRENCIES_MAP[currency as 'RUR' | 'EUR' | 'USD']}
            </span>
            <br />
            <span className={styles.pricePerNight}>Цена за 1 ночь</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
