/* eslint-disable */
import apiCall from "../apiCall";

describe("apiCall", () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            films: ["url1", "url2", "url3", "url4", "url5"]
          })
      })
    );
  });

  it("should be called with the correct parameters", () => {
    apiCall("nonsense");
    expect(window.fetch).toHaveBeenCalledWith("nonsense");
  });

  it("returns an object if the status is ok", () => {
    const mockArray = {
      films: ["url1", "url2", "url3", "url4", "url5"]
    };
    expect(apiCall("nonsense")).resolves.toEqual(mockArray);
  });

  it("throws an error if the status is not ok", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 404
      })
    );

    expect(apiCall("nonsense")).rejects.toEqual(
      "Do or do not, there is no try. But in this case, you should try a different URL"
    );
  });
});
