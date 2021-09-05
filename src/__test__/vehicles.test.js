import * as React from "react";
import { SWRConfig } from "swr";
import fetch from "jest-fetch-mock";
import { render, waitFor } from "@testing-library/react";
import { AppContext } from "store/context";
import Vehicles from "components/Vehicles";
import fetcher from "libs/fetcher";

const AppContextWithoutValue = () => (
  <AppContext.Provider value={{ state: { make: "", model: "" } }}>
    <SWRConfig value={{ dedupingInterval: 0, shouldRetryOnError: false, fetcher: fetcher }}>
      <Vehicles />
    </SWRConfig>
  </AppContext.Provider>
);

const AppContextWithValue = () => (
  <AppContext.Provider value={{ state: { make: "Ford", model: "Fiesta" } }}>
    <SWRConfig value={{ dedupingInterval: 0, shouldRetryOnError: false, fetcher: fetcher }}>
      <Vehicles />
    </SWRConfig>
  </AppContext.Provider>
);

describe("<Vehicles />", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.doMock();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing", async () => {
    const { container, asFragment } = render(<AppContextWithValue />);
    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows empty wrapper if make value is falsy", async () => {
    fetch.mockReject(() => Promise.reject("server is down"));
    const { getByTestId, asFragment } = render(<AppContextWithoutValue />);

    await waitFor(() => {
      const emptyWrapper = getByTestId(/empty-wrapper/i);
      expect(emptyWrapper).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows laoding icon if fetch reject", async () => {
    fetch.mockReject(() => Promise.reject("server is down"));
    const { getByTestId, asFragment } = render(<AppContextWithValue />);

    await waitFor(() => {
      const loading = getByTestId(/loading/i);
      expect(loading).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/vehicles?make=Ford&model=Fiesta", undefined);
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows loading icon in loading stage", async () => {
    fetch.mockResponseOnce("");
    const { getByTestId, asFragment } = render(<AppContextWithValue />);

    await waitFor(() => {
      const loading = getByTestId(/loading/i);
      expect(loading).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows message if fetch success with empty array", async () => {
    const mockResponse = [];

    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const { getByTestId, asFragment } = render(<AppContextWithValue />);

    await waitFor(() => {
      const loading = getByTestId(/no-data/i);
      expect(loading).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows data if fetch success", async () => {
    const mockResponse = [
      {
        make: "Ford",
        model: "Fiesta",
        enginePowerPS: 54,
        enginePowerKW: 40,
        fuelType: "Diesel",
        bodyType: "Limousine",
        engineCapacity: 1119,
      },
    ];

    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const { findAllByText, asFragment } = render(<AppContextWithValue />);

    const car = await findAllByText("Ford Fiesta");

    expect(car).toHaveLength(1);
    expect(asFragment()).toMatchSnapshot();
  });
});
