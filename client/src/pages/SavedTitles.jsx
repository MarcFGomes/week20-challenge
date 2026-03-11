import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import { REMOVE_TITLE } from '../utils/mutations';
import { removeTitleId } from '../utils/localStorage';

const SavedTitles = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeTitle] = useMutation(REMOVE_TITLE);

  const userData = data?.me || {};
  const saved = userData.savedTitles || [];

  const handleDeleteTitle = async (imdbID) => {
    try {
      await removeTitle({
        variables: { imdbID },
        refetchQueries: [GET_ME],
      });

      removeTitleId(imdbID);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Your Watch Later List</h1>
          <p className='mb-0'>Everything you’ve saved shows up here.</p>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {saved.length
            ? `Viewing ${saved.length} saved ${saved.length === 1 ? 'title' : 'titles'}:`
            : 'You have no saved titles yet!'}
        </h2>

        <Row>
          {saved.map((t) => (
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

                  <Card.Text className='small text-muted'>Year: {t.year || 'N/A'}</Card.Text>

                  <div className='mt-auto d-flex flex-column gap-2'>
                    {t.imdbLink ? (
                      <Button
                        variant='outline-dark'
                        href={t.imdbLink}
                        target='_blank'
                        rel='noreferrer'
                      >
                        View on IMDb
                      </Button>
                    ) : null}

                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteTitle(t.imdbID)}
                    >
                      Remove from Watch Later
                    </Button>
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

export default SavedTitles;