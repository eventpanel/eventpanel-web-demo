import styles from './Header.module.css';
import logo from '../assets/Logo.png';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="EventPanel" className={styles.logoImg} />
      </div>
      <p className={styles.tagline}>
        Type-safe analytics events with <span className={styles.highlight}>React</span> + <span className={styles.highlight}>TypeScript</span>. 
        Click the buttons below to track events through multiple providers.
      </p>
      <div className={styles.badges}>
        <span className={styles.badge}>🎯 Type-Safe</span>
        <span className={styles.badge}>⚡ Multi-Provider</span>
        <span className={styles.badge}>📊 Real-Time</span>
      </div>
    </header>
  );
}

