import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchTitles from './pages/SearchTitles';
import SavedTitles from './pages/SavedTitles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchTitles />,
      },
      {
        path: '/watch-later',
        element: <SavedTitles />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
