import AuthForm from '@/components/Auth/AuthForm';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.mainTitle}>One-stop management</h1>
          <h2 className={styles.subTitle}>wealth</h2>
        </div>
        
        <div className={styles.logo}>
          <div className={styles.grid}>
            {Array(9).fill(null).map((_, index) => (
              <div key={index} className={styles.gridItem} />
            ))}
          </div>
        </div>
        
        <AuthForm />
      </div>
    </main>
  );
}

