/**
 * Component to fetch the list of vehicle and display the return data to end user
 * 
 */

import React, { useContext } from "react";
import useSWR from "swr";
import { AppContext } from "store/context";
import Loading from "libs/images/Loading.svg";
import styles from "./Vehicles.module.scss";

type Vehicle = {
  bodyType: string;
  engineCapacity: number;
  enginePowerKW: number;
  enginePowerPS: number;
  fuelType: string;
  make: string;
  model: string;
};

const Vehicles: React.FC = () => {
  /**
   * Connect to the store
   */
  const { state } = useContext(AppContext);
  const { make, model } = state;

  /**
   * Fetch vehicles data from api
   */
  const { data, error } = useSWR<Vehicle[], Error>(`http://localhost:8080/api/vehicles?make=${make}&model=${model}`);

  /**
   * Show empty box if make and model is falsy
   */
  if (!make || !model) return <div className={styles.error} data-testid="empty-wrapper"></div>;

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
   * Show the list of vehicles
   */
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Vehicles</div>
      <div className={styles.scrollWrapper}>
        {data.map((item, i) => (
          <div className={styles.vehicle} key={i}>
            <div className={styles.vehicleName}>{`${make} ${model}`}</div>
            <div>Body : {item.bodyType}</div>
            <div>Fuel : {item.fuelType}</div>
            <div>Engine Power PS : {item.enginePowerPS}</div>
            <div>Engine Power KW : {item.enginePowerKW}</div>
            <div>Engine Capacity : {item.engineCapacity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
