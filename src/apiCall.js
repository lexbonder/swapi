const apiCall = async (url) => {
  try {
    const initialFetch = await fetch(url);
    return await initialFetch.json();
  } catch (error) {
    return error.message;
  }
};

export default apiCall;