import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-card">
        <div className="about-icon">👩‍💻</div>
        <h1 className="about-title">About</h1>
        <p className="about-author">
          Author: <strong>Dilafruz</strong>
        </p>
        <p className="about-desc">
          This app was built as part of the RS School React Course.
        </p>
        
        <a>
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
          className="about-link"
          RS School React Course
        </a>
        <button className="about-btn" onClick={() => navigate('/')}>
          Back to Main
        </button>
      </div>
    </div>
  );
}

export default AboutPage;