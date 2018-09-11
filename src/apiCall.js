const apiCall = async (url) => {
  try {
    const initialFetch = await fetch(url);
    if (initialFetch.status === 404) {
      /* eslint-disable-next-line */
      throw new Error('Do or do not, there is no try. But in this case, you should try a different URL');
    }
    return await initialFetch.json();
  } catch (error) {
    throw error.message;
  }
};

export default apiCall;