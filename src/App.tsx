import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ThrowError from './components/ThrowError/ThrowError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'detail/:name',
        element: <DetailPage />,
      },
    ],
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <div className="app__error-trigger">
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;