// 18:04:13 --- Tailwind & Styling 

import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl"> Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false}/>
            </div>
        </div>
    )
}


/*
// 17:19:25 --- web3uikit

import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <div>
            Decentralized Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
*/