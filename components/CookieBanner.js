import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const consent = localStorage.getItem('cookie_consent_given');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Store the consent and hide the banner
    localStorage.setItem('cookie_consent_given', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
        {/* You can create a Privacy Policy page later and link it here */}
        {/* <Link href="/privacy-policy">Learn more</Link> */}
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}