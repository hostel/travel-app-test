import React from 'react';
import { Form, Select, Checkbox, Input, Slider } from 'antd';

import { IAvailableFilterss } from '@components/hotels/selectors';
import { renderStrAmount } from '@utils/renderStrAmount';

import styles from './filters.module.scss';

const maxRating = [...Array(5)].map((_, index) => index + 1);
const words = ['звезда', 'звезды', 'звезд'];

export type TFilter = Record<string, React.ReactText | React.ReactText[] | Record<string, boolean>>;

interface IProps {
  selectedFilters: TFilter;
  selectFilter: (prevState: any) => void;
  availableFilters: IAvailableFilterss;
}

/**
 * Component for render filters
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Filters = ({
  selectedFilters,
  selectFilter,
  availableFilters: { price },
}: IProps): React.ReactElement => {
  /**
   * Change stars filter
   *
   * @param _
   * @param option
   */
  const onChangeStars = (_: string[], option: any): void => {
    let obj: Record<string, boolean> = {};

    option.forEach((item: any) => {
      obj = {
        ...obj,
        [item.value]: true,
      };
    });

    selectFilter((prevState: TFilter) => ({ ...prevState, stars: obj }));
  };

  /**
   * Change amount reviews filter
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - input event
   */
  const onChange = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void => {
    const cloneState = { ...selectedFilters };

    if (value === '') {
      delete cloneState[name];
    } else {
      cloneState[name] = value;
    }

    selectFilter(cloneState);
  };

  /**
   * Change slider price filter
   *
   * @param {number[]} data - data from slider
   */
  const onSliderChange = (data: number[]): void => {
    selectFilter((prevState: TFilter) => ({ ...prevState, minPrice: data[0], maxPrice: data[1] }));
  };

  return (
    <React.Fragment>
      <Form.Item label="Количество звезд">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Нажмите для выбора звезд"
          optionLabelProp="label"
          onChange={onChangeStars}
        >
          {maxRating.map((item) => (
            <Select.Option title="stars" key={item} value={item} label={item}>
              <div className={styles.wrapCheckBox}>
                <Checkbox
                  checked={
                    selectedFilters.stars
                      ? (selectedFilters.stars as Record<string, boolean>)[item]
                      : false
                  }
                >
                  {renderStrAmount(item, words)}
                </Checkbox>
              </div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Количество отзывов (от)">
        <Input
          type="number"
          name="reviewsAmount"
          placeholder="Например, от 10"
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item label="Цена">
        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
          <Input
            type="number"
            name="minPrice"
            placeholder={`от ${price.minPrice}`}
            onChange={onChange}
            value={selectedFilters.minPrice as number}
          />
        </Form.Item>

        <Form.Item style={{ display: 'inline-block', width: '50%', marginLeft: '8px' }}>
          <Input
            type="number"
            name="maxPrice"
            placeholder={`до ${price.maxPrice}`}
            onChange={onChange}
            value={selectedFilters.maxPrice as number}
          />
        </Form.Item>
        {price.minPrice > 0 && price.maxPrice > 0 && (
          <Form.Item>
            <Slider
              range
              min={price.minPrice}
              max={price.maxPrice}
              defaultValue={[price.minPrice, price.maxPrice]}
              value={[selectedFilters.minPrice as number, selectedFilters.maxPrice as number]}
              onChange={onSliderChange}
            />
          </Form.Item>
        )}
      </Form.Item>
    </React.Fragment>
  );
};
