/**
 * Component to fetch the list of models and display the return data to end user
 * 
 */

import React, { useContext } from "react";
import useSWR from "swr";
import { AppContext } from "store/context";
import { Action } from "store/type";
import Loading from "libs/images/Loading.svg";
import styles from "./Models.module.scss";

const Models: React.FC = () => {
  /**
   * Connect to the store
   */
  const { state, dispatch } = useContext(AppContext);
  const { make, model } = state;

  /**
   * Fetch models data from api
   */
  const { data, error } = useSWR<string[], Error>(`http://localhost:8080/api/models?make=${make}`);

  /**
   * Show empty box if make is falsy
   */
  if (!make) return <div className={styles.error} data-testid="empty-wrapper"></div>;

  /**
   * Show loading icon if waiting for data to come or error return from api
   */
  if (error || !data)
    return (
      <div className={styles.error}>
        <img src={Loading} className={styles.loading} alt="Loading" data-testid="loading" />
      </div>
    );

  /**
   * Show error message if no data return from api
   */
  if (data.length === 0) return (
    <div className={styles.error} data-testid="no-data">
      No data found
    </div>
  );

  /**
   * Show the list of models
   */
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Models</div>
      <div className={styles.scrollWrapper}>
        {data.map((item, i) => (
          <div
            className={model === item ? styles.model + " " + styles.selected : styles.model}
            key={i}
            onClick={() => {
              dispatch({ type: Action.UPDATE_MODEL, payload: item });
            }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models;
