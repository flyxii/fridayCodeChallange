/**
 * Root component for the application
 */

import React from "react";
import { SWRConfig } from "swr";
import Makes from "components/Makes";
import Models from "components/Models";
import Vehicles from "components/Vehicles";
import Logo from "libs/images/Logo.svg";
import fetcher from "libs/fetcher";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className={styles.selectionWrapper}>
        <div className={styles.cfa}>Please select the car</div>
        <SWRConfig
          value={{
            errorRetryInterval: 500,
            fetcher: fetcher,
          }}>
          <Makes />
          <Models />
          <Vehicles />
        </SWRConfig>
      </div>
    </div>
  );
};

export default App;
