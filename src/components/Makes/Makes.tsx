/**
 * Component to fetch the list of makes and display the return data to end user
 */

import React, { useContext } from "react";
import useSWR from "swr";
import { AppContext } from "store/context";
import { Action } from "store/type";
import Loading from "libs/images/Loading.svg";
import styles from "./Makes.module.scss";

const Makes: React.FC = () => {
  /**
   * Connect to the store
   */
  const { state, dispatch } = useContext(AppContext);

  /**
   * Fetch makes data from api
   */
  const { data, error } = useSWR<string[], Error>("http://localhost:8080/api/makes");

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
   * Show the list of makes
   */
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Makes</div>
      <div className={styles.scrollWrapper}>
        {data.map((item, i) => (
          <div
            className={state.make === item ? styles.make + " " + styles.selected : styles.make}
            key={i}
            onClick={() => {
              dispatch({ type: Action.UPDATE_MAKE, payload: item });
              dispatch({ type: Action.UPDATE_MODEL, payload: "" });
            }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Makes;
