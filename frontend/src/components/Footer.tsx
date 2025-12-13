import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Built with{' '}
        <a 
          href="https://eventpanel.net" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          EventPanel
        </a>
        {' '}— Type-safe analytics for modern apps
      </p>
      <div className={styles.links}>
        <a 
          href="https://github.com/eventpanel/eventpanel-web-demo" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          GitHub
        </a>
        <span className={styles.separator}>•</span>
        <a 
          href="https://eventpanel.net/docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          Docs
        </a>
      </div>
    </footer>
  );
}

