import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row, Badge } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveTitle, searchOmdb } from '../utils/API';
import { saveTitleIds, getSavedTitleIds } from '../utils/localStorage';

const SearchTitles = () => {
  // returned OMDb search data
  const [searchedTitles, setSearchedTitles] = useState([]);
  // search input
  const [searchInput, setSearchInput] = useState('');
  // optional filter (movie / series)
  const [typeFilter, setTypeFilter] = useState('');

  // saved imdbIDs
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());

  // persist ids on unmount
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  }, [savedTitleIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput.trim()) return false;

    try {
      const response = await searchOmdb(searchInput, typeFilter);

      if (!response.ok) throw new Error('OMDb request failed');

      const data = await response.json();

      if (data.Response === 'False') {
        setSearchedTitles([]);
        return;
      }

      // Normalize OMDb fields to our app shape
      const titleData = (data.Search || []).map((item) => ({
        imdbID: item.imdbID,
        title: item.Title,
        year: item.Year,
        type: item.Type, // movie | series | episode
        poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : '',
        imdbLink: `https://www.imdb.com/title/${item.imdbID}/`,
      }));

      setSearchedTitles(titleData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTitle = async (imdbID) => {
    const titleToSave = searchedTitles.find((t) => t.imdbID === imdbID);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      const response = await saveTitle(titleToSave, token);

      if (!response.ok) throw new Error('Save failed');

      setSavedTitleIds([...savedTitleIds, titleToSave.imdbID]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Search Movies & Shows</h1>
          <p className='mb-4'>
            Build your personal <strong>Watch Later</strong> queue using the OMDb API.
          </p>

          <Form onSubmit={handleFormSubmit}>
            <Row className='g-2'>
              <Col xs={12} md={7}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search by title (ex: "star wars")'
                />
              </Col>

              <Col xs={12} md={3}>
                <Form.Select
                  size='lg'
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  aria-label='Filter by type'
                >
                  <option value=''>All Types</option>
                  <option value='movie'>Movies</option>
                  <option value='series'>Series</option>
                </Form.Select>
              </Col>

              <Col xs={12} md={2}>
                <Button type='submit' variant='success' size='lg' className='w-100'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedTitles.length ? `Viewing ${searchedTitles.length} results:` : 'Search to begin'}
        </h2>

        <Row>
          {searchedTitles.map((t) => (
            <Col md='4' key={t.imdbID} className='mb-4'>
              <Card border='dark' className='h-100'>
                {t.poster ? (
                  <Card.Img src={t.poster} alt={`${t.title} poster`} variant='top' />
                ) : null}
                <Card.Body className='d-flex flex-column'>
                  <Card.Title className='d-flex justify-content-between align-items-start gap-2'>
                    <span>{t.title}</span>
                    <Badge bg='secondary' pill>
                      {t.type}
                    </Badge>
                  </Card.Title>

                  <Card.Text className='small text-muted mb-3'>Year: {t.year || 'N/A'}</Card.Text>

                  <div className='mt-auto d-flex flex-column gap-2'>
                    <Button
                      variant='outline-dark'
                      href={t.imdbLink}
                      target='_blank'
                      rel='noreferrer'
                    >
                      View on IMDb
                    </Button>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedTitleIds?.some((id) => id === t.imdbID)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveTitle(t.imdbID)}
                      >
                        {savedTitleIds?.some((id) => id === t.imdbID)
                          ? 'Already in Watch Later ✅'
                          : 'Add to Watch Later'}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchTitles;
