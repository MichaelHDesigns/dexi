import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const MyWallet: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const wallet = useWallet();
    let walletAddress = "";

    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    // Redirect function to navigate to the List component
    const redirectToWallet = () => {
        navigate('/list');
    }

    return (
        <>
            {wallet.connected ? (
                <>
                    <p>Your wallet is {walletAddress}</p>
                    <div className="button-container">
                        <button onClick={redirectToWallet}>Go to List</button> {/* Button to navigate to List */}
                        <WalletDisconnectButton />
                    </div>
                </>
            ) : (
                <div className="text-p">
                    <p>Hello! Click the button to connect</p>
                </div>
            )}

            <div className="multi-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </span>
            </div>
        </>
    );
};

export default MyWallet;