"use client"

import { useGameStore, GameState } from '../../store/gameStore';
import Image from 'next/image';
import EthereumIcon from '../../images/currencies/eth.svg';
import BitcoinIcon from '../../images/currencies/btc.svg';


export default function PageHeader() {
	const gameState = useGameStore((gameState: GameState) => gameState);
	return (
    <div style={{display:'flex', gap:'1rem'}}>
      <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
          <Image src={EthereumIcon} alt='' />
          <span>{gameState.ethBalance.toFixed(0)}</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
          <Image src={BitcoinIcon} alt='' />
          <span>{gameState.btcBalance.toFixed(0)}</span>
      </div>
    </div>
	);
}
