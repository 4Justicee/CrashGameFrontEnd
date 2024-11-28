"use client";

import { currencyById } from '../lib/currencies';
import { useGameStore, GameState } from '../store/gameStore';
import SimpleBar from 'simplebar-react';  
import 'simplebar-react/dist/simplebar.min.css';  

const GamePlayerList = () => {
	const totalPlayers = useGameStore((gameState) => gameState.totalPlayers);
	const players = useGameStore((gameState) => gameState.players);
	const waiting = useGameStore((gameState) => gameState.waiting);
	const isWaiting = useGameStore((game: GameState) => game.isWaiting);
	const isPreparing = useGameStore((game: GameState) => game.isPreparing);
	const isPlaying = useGameStore((game: GameState) => game.isPlaying);

	let playerCount = isWaiting ? waiting.length : 0;
	playerCount = isPlaying ? players.length : playerCount;
	const data = isWaiting ? waiting : isPlaying ? players : [];

	return (
		<div className="p-2 rounded-xl bg-layer4 relative mt-4 md:mt-0 md:ml-2 overflow-hidden">
			<div className="flex items-center justify-between bg-layer5 dark:bg-layer3 p-2 rounded-lg h-9">
			<div className="flex items-center justify-center">
				<div className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14"
					viewBox="0 0 13 14" fill="none">
					<circle cx="6.5" cy="6.78613" r="6.5" fill="#23EE88" fillOpacity="0.2"></circle>
					<circle cx="6.5" cy="6.78613" r="2.36328" fill="#23EE88"></circle>
				</svg></div>
				<div className="font-extrabold font-mono">{playerCount}/{totalPlayers} Players</div>
			</div>
			{/* <div className="flex font-semibold font-mono">THB&nbsp;185,845.84</div> */}
			</div>
			<div className="bg-layer4 p-1">
			<div className="flex text-left whitespace-nowrap">
				<div className="font-normal text-secondary py-2 w-[40%] truncate">Player</div>
				<div className="font-normal text-secondary py-2 text-left w-[20%]">Cashout</div>
				<div className="font-normal text-secondary py-2 text-left w-[40%]">Amount</div>
			</div>
			</div>
			<SimpleBar className="p-1 pt-0 overflow-y-auto h-[32.5rem] md:h-[35rem] mb-0 relative" style={{maskImage: "linear-gradient(to top, transparent 0%, black 10%)"}}>
				<div className="w-full h-full relative">
					<div className="h-auto">
					{
						data.map((item, idx)=> {
							const currency = item.currency;
							const winnings = (item.winnings == '0') ? "-" : ((Number)(item.winnings)).toFixed(4);
							const b = ((Number)(item.betAmount)).toFixed(4);
							return <div className="flex h-10 items-center w-full justify-start font-extrabold" key={idx}>
							<div className="flex items-center w-[40%]"><a className="truncate inactive">HIDDEN</a></div>
							<div className="w-[20%] text-left">
							<div className="pl-1 whitespace-nowrap">{winnings}</div>
							</div>
							<div className="w-[40%] flex pr-1">
							<div className="w-full flex justify-start items-center"><img alt=""
								className="inline-block w-4 h-4 mr-1" src={`/coin/${currency}.black.png`} />
								<div className="truncate">{b}</div>
							</div>
							</div>
						</div>
						})
					}				
					
					</div>
				</div>
			</SimpleBar>
		</div>
	)
}

export default GamePlayerList;