import moment from 'moment';

class DataCleaner {
  constructor(apiCall) {
    this.apiCall = apiCall;
  }

  getFilmInfo = async (url) => {
    try {
      const { films } = await this.apiCall(url);
      return Promise.all(films.map(url => this.getNamesAndDates(url)));
    } catch (error) {
      throw error;
    }
  }

  getNamesAndDates = async (url) => {
    try {
      const data = await this.apiCall(url);
      return { 
        title: data.title,
        date: moment(data.release_date).format("dddd, MMMM Do YYYY")
      };
    } catch (error) {
      throw error;
    }
  }
}

export default DataCleaner;