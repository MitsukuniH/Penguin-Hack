import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Main } from '@/pages/components/Main'
import { useState } from 'react'
import { Tab } from '@/types'

const serverUrl="http://localhost:8000/"

export default function Home() {
  const [tab, setTab] = useState<Tab>("home");
  return (
    <>
      <Head>
        <title>Week Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.body}>
        <Header serverUrl={serverUrl}/>
        <div className={styles.contents}>
          <Sidebar curTab={tab} setTab={setTab}/>
          <Main curTab={tab} serverUrl={serverUrl}/>
        </div>
        
      </main>
    </>
  )
}
