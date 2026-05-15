import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found!</p>
      <button onClick={() => navigate('/')}>Go to Main</button>
    </div>
  );
}

export default NotFoundPage;