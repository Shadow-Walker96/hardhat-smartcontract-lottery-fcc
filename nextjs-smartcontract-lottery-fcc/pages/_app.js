// 17:52:58 ---> useNotification
/**
 * @notice we import NotificationProvider from 'web3uikit' for we to see the notifications
 */

import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp

/*
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
*/

/*
import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    return (
        // initializedMount means we can hook into our server to add some more features to our website
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp
*/
