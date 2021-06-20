import React, { useState } from 'react';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

import { fakeRequest } from '@utils/fakeRequest';

import styles from './form.module.scss';

interface IProps {
  toggleVisibility: () => void;
}

/**
 * Component for render form send review
 *
 * @param {IProps} props - props component
 * @returns {React.ReactElement} - element
 */
export const Form = ({ toggleVisibility }: IProps): React.ReactElement => {
  const [isSuccess, set] = useState(false);
  const [form, setValues] = useState({ username: '', email: '', review: '' });

  /**
   * Handler onsubmit form
   *
   * @param {React.FormEvent<HTMLFormElement>} event - event from form
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const target = event.target as HTMLFormElement;

    const form = {
      username: (target.elements.namedItem('username') as HTMLInputElement).value,
      email: (target.elements.namedItem('email') as HTMLInputElement).value,
      review: (target.elements.namedItem('review') as HTMLTextAreaElement).value,
    };

    fakeRequest().then((res: boolean) => {
      set(res);
      setValues(form);
    });
    event.preventDefault();
  };

  /**
   * Utility method for back to episodes
   */
  const backToEpisodes = (): void => {
    toggleVisibility();
  };

  return (
    <div>
      {isSuccess ? (
        <div>
          <p className={styles.successMessage}>Поздравляем с успешным прохождением вызарда</p>
          <div className={styles.grid}>
            <span className={styles.name}>Username:</span>
            <span className={styles.value}>{form.username}</span>
            <span className={styles.name}>Email:</span>
            <span className={styles.value}>{form.email}</span>
            <span className={styles.name}>Review:</span>
            <span className={styles.value}>{form.review}</span>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.wrapInput}>
            <label className={styles.label}>Username</label>
            <Input type="text" name="username" placeholder="Enter username" required />
          </div>
          <div className={styles.wrapInput}>
            <label className={styles.label}>Email</label>
            <Input type="email" name="email" placeholder="Enter email" required />
          </div>
          <div className={styles.wrapInput}>
            <label className={styles.label}>Review</label>
            <Textarea name="review" required placeholder="Enter review" />
          </div>
          <Button type="submit">Send</Button>
        </form>
      )}
      <Button onClick={backToEpisodes}>Back to episodes</Button>
    </div>
  );
};
