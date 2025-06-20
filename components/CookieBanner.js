import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_given');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_given', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
        <Link href="/privacy-policy" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
          Learn more
        </Link>
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}