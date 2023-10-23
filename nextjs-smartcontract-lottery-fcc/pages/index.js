/*
// 17:19:25 --- web3uikit
// we want to use the Header component to use web3uikit

import Head from "next/head"
import styles from "../styles/Home.module.css"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            //  <ManualHeader /> 
        //     <Header />
        // </div>
    )
}
*/

// 17:22:26 --- Introduction to calling functions in Next.js
// 

import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <ManualHeader /> */}
            <Header />
            <LotteryEntrance />
        </div>
    )
}
