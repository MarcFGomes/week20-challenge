// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save title data for a logged in user
export const saveTitle = (titleData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(titleData),
  });
};

// remove saved title data for a logged in user
export const deleteTitle = (imdbID, token) => {
  return fetch(`/api/users/titles/${imdbID}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// Search OMDb API
// Docs: https://www.omdbapi.com/
// Example: https://www.omdbapi.com/?apikey=YOUR_KEY&s=star+wars&type=movie
export const searchOmdb = (query, type = '') => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing OMDb API key. Create a .env file in /client and set VITE_OMDB_API_KEY=YOUR_KEY'
    );
  }

  const encoded = encodeURIComponent(query.trim());
  const typeParam = type ? `&type=${encodeURIComponent(type)}` : '';
  return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encoded}${typeParam}`);
};

// Fetch details (optional, but nice for plot/rating)
export const fetchOmdbById = (imdbID) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing OMDb API key. Create a .env file in /client and set VITE_OMDB_API_KEY=YOUR_KEY'
    );
  }

  return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=short`);
};
