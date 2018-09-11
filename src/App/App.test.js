/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a default state", () => {
    const expectedState = {
      films: [],
      error: "",
      loading: false
    };
    expect(wrapper.state()).toEqual(expectedState);
  });

  describe("handleClick", () => {
    it("should call setFilmData with the url of the chosen character", () => {
      const mockEvent = { target: { id: "Luke Skywalker" } };
      wrapper.instance().setFilmData = jest.fn();

      wrapper.instance().handleClick(mockEvent);

      expect(wrapper.instance().setFilmData).toHaveBeenCalledWith(
        "https://swapi.co/api/people/1/"
      );
    });

    it("should call reset", () => {
      const mockEvent = { target: { id: "Luke Skywalker" } };
      wrapper.instance().reset = jest.fn();

      wrapper.instance().handleClick(mockEvent);

      expect(wrapper.instance().reset).toHaveBeenCalled();
    });

    it("should set loading state to true", () => {
      const mockEvent = { target: { id: "Luke Skywalker" } };
      wrapper.instance().handleClick(mockEvent);

      expect(wrapper.state().loading).toEqual(true);
    });
  });

  describe("setFilmData", () => {
    it("should set the state of films with an array of films", async () => {
      wrapper.instance().dataCleaner.getFilmInfo = jest.fn().mockImplementationOnce(() => Promise.resolve([
            {
              title: "The Empire Strikes Back",
              date: "Saturday, May 17th 1980"
            }
          ]));
      const expected = [
        {
          title: "The Empire Strikes Back",
          date: "Saturday, May 17th 1980"
        }
      ];

      await wrapper.instance().setFilmData("nonsense");
      expect(wrapper.state().films).toEqual(expected);
    });

    it('should set an error in state if retreval fails', async () => {
      wrapper.instance().dataCleaner.getFilmInfo = jest.fn()
        .mockImplementationOnce(() => Promise.reject(
          'Much failure'
          ))
      await wrapper.instance().setFilmData('nonsense')
      expect(wrapper.state().error).toEqual('Much failure')
    })

    it('should set state of loading to false', () => {
      expect(wrapper.state().loading).toEqual(false);
    })
  });

  describe('reset', () => {
    it('should set the films array and error back to default', () => {
      wrapper.setState({films: [1,2,3,4], error:'full of sadness'});
      expect(wrapper.state().films).toEqual([1,2,3,4]);
      expect(wrapper.state().error).toEqual("full of sadness");
      wrapper.instance().reset()
      expect(wrapper.state().films).toEqual([])
      expect(wrapper.state().error).toEqual('')
    })
  })

  describe('renderCharBtns', () => {
    it('should match the snapshot', () => {
      expect(wrapper.instance().renderCharBtns()).toMatchSnapshot()
    })
  })

  describe('renderResults', () => {
    it('should match the snapshot when there is an error in state', () => {
      wrapper.setState({error: 'So much sadness'});
      expect(wrapper.instance().renderResults()).toMatchSnapshot();
    })
    
    it('should match the snapshot where there are results to show', () => {
      wrapper.setState({
        films: [{ 
          title: 'Empire Strikes Back',
          date: "Saturday, May 17th 1980"
        }]
      });
      expect(wrapper.instance().renderResults()).toMatchSnapshot();
    })
  })
});
