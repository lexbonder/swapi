/* eslint-disable */
import apiCall from '../apiCall';
import DataCleaner from '../dataCleaner';
import moment from 'moment';

// jest.mock('../apiCall');

describe('dataCleaner', () => {
  let cleaner;
  const mockUrl = "https://swapi.co/api/people/1/";

  beforeEach(() => {
    cleaner = new DataCleaner(apiCall)
  })

  describe('getFilmInfo', () => {
    it('takes in a url and calls getNamesAndDates with Each retrieved URL', async () => {
      cleaner.apiCall = jest.fn().mockImplementationOnce(() => ({
        films: [
          'swapi.co/api/films/1',
          'swapi.co/api/films/2',
          'swapi.co/api/films/3',
          'swapi.co/api/films/4',
          'swapi.co/api/films/5'
        ]
      }));
      cleaner.getNamesAndDates = jest.fn().mockImplementation(() => {});

      await cleaner.getFilmInfo(mockUrl)
      expect(cleaner.getNamesAndDates.mock.calls.length).toEqual(5);
    });
  });

  describe('getNamesAndDates', () => {
    it('takes in a url and returns an object with the title and formatted release date', async () => {
      cleaner.apiCall = jest.fn().mockImplementationOnce(() => ({
        title: 'The Emperor Strikes Back',
        release_date: '1980-05-17'
      }))
      const expected = {
        title: 'The Emperor Strikes Back',
        date: 'Saturday, May 17th 1980'
      }
      expect(await cleaner.getNamesAndDates('nonsense')).toEqual(expected);
    })
  })
});