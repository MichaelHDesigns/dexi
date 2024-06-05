import React, { useState } from "react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react"; // Import useWallet hook

interface Order {
  Exchange: string;
  SellAmount: string;
  BuyAmount: string;
}

const List: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  
  const wallet = useWallet(); // Use useWallet hook to access wallet information
  const walletAddress = wallet.connected && wallet.publicKey ? wallet.publicKey.toString() : "";

  const validAddress = (address: string): boolean => {
    const base58Chars: string = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    if (address.length < 32 || address.length > 44) {
      return false;
    }
    for (let char of address) {
      if (!base58Chars.includes(char)) {
        return false;
      }
    }
    return true;
  };

  const fetchOrders = async (): Promise<void> => {
    if (validAddress(tokenAddress)) {
      try {
        const response = await fetch(`https://dex-book.xyz/api/v1/getOrders?token=${tokenAddress}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ordersData: { buyOrders: Order[]; sellOrders: Order[] } = await response.json();
        setBuyOrders(ordersData.buyOrders);
        setSellOrders(ordersData.sellOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert("Invalid Solana Address");
    }
  };

  return (
    <>
      <header>
        <div className="wallet-info">
          {wallet.connected ? (
            <>
              <span>Wallet Address: {walletAddress}</span>
              <WalletDisconnectButton />
            </>
          ) : (
            <span>Hello! Click the button to connect</span>
          )}
        </div>
        <nav className="main-nav">
          <a href="/">dApp</a>
          <a href="https://t.me/cryptochaos_pump">Telegram</a>
        </nav>
      </header>
        <div className="logo">DEX-Book</div>
<br />
<br />
<br />
        <div className="search-container">
          <input 
            id="tokenAddress" 
            type="text" 
            placeholder="Search..."
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <button onClick={fetchOrders}>Get Orders</button>
        </div>
      <div className="mobile-search-container">
        <input 
          id="tokenAddressMobile" 
          type="text" 
          placeholder="Search..."
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button onClick={fetchOrders}>Get Orders</button>
      </div>

<br />
<br />
<br />
<br />
<br />
    <div className="container">
      <main>
        <div className="info-header">
          <div id="metadata" style={{ display: "none" }}>
            <div className="info-logo">Logo</div>
            <div className="info-name">Token Name</div>
            <div className="info-symbol">(SYM)</div>
          </div>
          
        {/*  <div className="div-error" id="metadata-error"><p>Metadata Not Found</p></div> */}
<br /> 
        {/*  <div className="info-rate">Exchange Rate: <span id="exchange-rate">100 SOL</span></div> */}
<br />   
     </div>
        <div className="table-container">
    <div className="table-wrapper">
          <div className="order-table">
            <table id="sell-orders" className="sell-orders">
              <thead>
                <tr>
                  <th>Buying</th>
                  <th>Selling</th>
                  <th>Ask</th>
                </tr>
              </thead>
              <tbody>
                {sellOrders.map((order: Order, index: number) => (
  <tr key={index}>
    <td className="sell-order-text">{order.BuyAmount}</td> {/* Apply sell-order-text class */}
    <td className="sell-order-text">{order.SellAmount}</td> {/* Apply sell-order-text class */}
    <td className="sell-order-text">{order.Exchange}</td> {/* Apply sell-order-text class */}
  </tr>
))}
              </tbody>
            </table>
          </div>
 </div>
          <div className="order-table">
    <div className="table-wrapper">
            <table id="buy-orders" className="buy-orders">
              <thead>
                <tr>
                  <th>Bid</th>
                  <th>Buying</th>
                  <th>Selling</th>
                </tr>
              </thead>
              <tbody>
                {buyOrders.map((order: Order, index: number) => (
  <tr key={index}>
    <td className="buy-order-text">{order.Exchange}</td> {/* Apply buy-order-text class */}
    <td className="buy-order-text">{order.BuyAmount}</td> {/* Apply buy-order-text class */}
    <td className="buy-order-text">{order.SellAmount}</td> {/* Apply buy-order-text class */}
  </tr>
))}
              </tbody>
            </table>
          </div>
</div>
        </div>
      </main>
</div>

<div>
<br />
<br />
<br />
<br />
      <footer>
        <div>© 2024 DEX-Book</div>
        <nav className="footer-nav">
          <a href="/use">How to Use</a>
          <a href="https://t.me/cryptochaos_pump">Contact Us</a>
        </nav>
      </footer>
</div>
<br />
<br />
    </>
  );
}

export default List;