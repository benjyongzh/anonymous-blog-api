export const fetchDataGet = async (location, headers = {}) => {
  const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location}`;
  const response = await fetch(url, { method: "GET", headers: headers });
  if (response) {
    return await response.json();
  } else {
    return false;
  }
};

export const fetchDataPost = async (location, headers = {}, body = {}) => {
  const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location}`;
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (response) {
    return await response.json();
  } else {
    return false;
  }
};
