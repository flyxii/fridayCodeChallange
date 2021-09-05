import * as React from "react";
import { SWRConfig } from "swr";
import fetch from "jest-fetch-mock";
import { render, waitFor } from "@testing-library/react";
import Makes from "components/Makes";
import fetcher from "libs/fetcher";

const App = () => (
  <SWRConfig value={{ dedupingInterval: 0, shouldRetryOnError:false, fetcher: fetcher }}>
    <Makes />
  </SWRConfig>
);

describe("<Makes />", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.doMock();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing", async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("shows laoding icon if fetch reject", async () => {
    fetch.mockReject(() => Promise.reject("server is down"));
    const { getByTestId, asFragment } = render(<App />);

    await waitFor(() => {
      const loading = getByTestId(/loading/i);
      expect(loading).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/makes", undefined);
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows loading icon in loading stage", async () => {
    fetch.mockResponseOnce("");
    const { getByTestId, asFragment } = render(<App />);

    await waitFor(() => {
      const loading = getByTestId(/loading/i);
      expect(loading).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows data if fetch success", async () => {
    const mockResponse = ["BMW", "Ford"];

    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const { findAllByText, asFragment } = render(<App />);

    const bmw = await findAllByText("BMW");
    const ford = await findAllByText("Ford");

    expect(bmw).toHaveLength(1);
    expect(ford).toHaveLength(1);
    expect(asFragment()).toMatchSnapshot();
  });
});
