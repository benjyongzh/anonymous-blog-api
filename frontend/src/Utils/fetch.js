export const fetchData = async (location) => {
  const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location}`;
  const response = await fetch(url);
  if (response) {
    return await response.json();
  } else {
    return { message: "Error fetching content" };
  }
};
