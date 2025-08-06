import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setTimeout(() => navigate('/homeUser'), 1200); // Smooth transition
    } else {
      setTimeout(() => navigate('/login'), 1200);
    }
  }, [navigate]);

  return (
    <div className="auth-success-bg">
      <div className="auth-success-card">
        <div className="auth-success-spinner"></div>
        <div className="auth-success-msg">
          <span style={{fontWeight: 600, fontSize: "1.5em"}}>Welcome!</span>
          <p>
            Connecting your Google account.<br/>
            Please wait a moment...
          </p>
        </div>
      </div>
      <style>
        {`
        .auth-success-bg {
          min-height: 100vh;
          width: 100vw;
          background: radial-gradient(ellipse at 60% 10%, #361e4e 0%, #1c1022 90%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-success-card {
          background: rgba(32,22,50,0.95);
          border-radius: 1.3rem;
          box-shadow: 0 6px 32px 0 #0005, 0 1.5px 12px 0 #8e44ad55;
          padding: 2.5rem 2.3rem 2rem 2.3rem;
          max-width: 370px;
          width: 90%;
          text-align: center;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 0.6s;
        }
        .auth-success-spinner {
          margin: 0 auto 18px auto;
          border: 4px solid #e1c5ff44;
          border-top: 4px solid #ae7af1;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 0.75s linear infinite;
        }
        .auth-success-msg {
          font-size: 1.11rem;
          color: #e9e4f7;
          margin-top: 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97);}
          to   { opacity: 1; transform: scale(1);}
        }
        `}
      </style>
    </div>
  );
}
