import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2024 GLEOWO VR Igraonica </p>
        <p style={styles.text}>Follow us on social media: <a href="https://www.facebook.com" style={styles.link}>
            <FontAwesomeIcon icon={faFacebookF} style={styles.icon} />
            Facebook
          </a> <a href="https://www.instagram.com" style={styles.link}>
            <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
            Instagram
          </a></p>
       
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1e2124',
    color: '#fff',
    padding: '20px 0',
    width: '100%',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  text: {
    fontSize: '14px',
  },
  socialLinks: {
    marginTop: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '16px',
  },
  icon: {
    marginRight: '5px',
  },
};

export default Footer;
