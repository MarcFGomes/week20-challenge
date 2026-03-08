export const getSavedTitleIds = () => {
  const savedTitleIds = localStorage.getItem('saved_titles')
    ? JSON.parse(localStorage.getItem('saved_titles'))
    : [];

  return savedTitleIds;
};

export const saveTitleIds = (idArr) => {
  if (idArr.length) {
    localStorage.setItem('saved_titles', JSON.stringify(idArr));
  } else {
    localStorage.removeItem('saved_titles');
  }
};

export const removeTitleId = (imdbID) => {
  const savedTitleIds = localStorage.getItem('saved_titles')
    ? JSON.parse(localStorage.getItem('saved_titles'))
    : null;

  if (!savedTitleIds) return false;

  const updatedSavedTitleIds = savedTitleIds.filter((id) => id !== imdbID);
  localStorage.setItem('saved_titles', JSON.stringify(updatedSavedTitleIds));

  return true;
};
