import Image from 'next/image'
import styles from './page.module.css'
import { Main } from '@/src/components/pages/Main'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Main />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/DrZanuff"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Developed by DrZanuff
        </a>
      </footer>
    </div>
  )
}
