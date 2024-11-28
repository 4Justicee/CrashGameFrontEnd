"use client";

import React, { useState, useEffect, useMemo } from 'react';

import { toast } from "sonner"

import { useGameStore, GameState } from '../store/gameStore';
import { useEffectEvent } from '../hooks/useEffectEvent';

const style = {  
	'--motion-translateX': '0px',  
	opacity: 1,  
	transform: 'translateX(var(--motion-translateX))'  
}; 

const GameControllers = ()=>{
	const gameState = useGameStore((state: GameState) => state); 
	const { balances, selectedCurrency } = gameState;  

	const [betAmount, setBetAmount] = useState<string>('0');
	const [autoCashOut, setAutoCashOut] = useState<string>('0');
	const [autoRun, setAutoRun] = useState<string>('');
	const [chance, setChance] = useState<string>('0')
	const [currentPane, setCurrentPane] = useState<string>('manual');

	const isWaiting = useGameStore((game: GameState) => game.isWaiting);
	const isPreparing = useGameStore((game: GameState) => game.isPreparing);
	const isPlaying = useGameStore((game: GameState) => game.isPlaying);
	const isCashedOut = useGameStore((game: GameState) => game.isCashedOut);
	const gameStatus = useGameStore((game: GameState) => game.status);
	const isConnected = useGameStore((game: GameState) => game.isConnected);
	const isLoggedIn = useGameStore((game: GameState) => game.isLoggedIn);
	const errors = useGameStore((game: GameState) => game.errors);
	const errorCount = useGameStore((game: GameState) => game.errorCount);
	const autoBetCount = useGameStore((game: GameState) => game.autoBetCount);

	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []); 

	// Using useMemo to only recalculate when balances or selectedCurrency changes  
    const currentBalance = useMemo(() => {  
        return balances.find(balance => balance.currency === selectedCurrency);  
    }, [balances, selectedCurrency]);  

	const {
		placeBet,
		cancelBet,
		cancelAutoBet,
		cashOut,
		authenticate,
		placeAutoBet
	} = useGameStore((game: GameState) => game.actions);

	const haveValidBet = /^[0-9]+(\.?[0-9])*$/.test(betAmount) && parseFloat(betAmount);

	const handleChangeBetAmount = (amount: string) => {
		setBetAmount(amount);
	}

	const handleChangeAutoCashOut = (amount: string) => {
		const a = (Number)(amount);
		if(isNaN(a)) {
			return;
		}
		const chance = (99 / a).toFixed(2);
		setChance(chance);
		setAutoCashOut(amount);
	}

	const handleButtonClick = () => {		
		if (!isConnected)// || !walletAuth.isWalletConnected)
			return;

		if (!isLoggedIn) {// && walletAuth.canSignIn) {
			//walletAuth.signIn();
			authenticate('testdata','testdata');
			return;
		}

		if (!isLoggedIn)
			return;

		if (isWaiting || isPreparing) {
			cancelBet();
			return;
		}

		if (isPlaying && !isCashedOut) {
			cashOut();
		} else {
			
			if(isNaN(Number(autoCashOut))) {
				toast("⚠️ autoCashout value error.");
				return;
			}
			let b =  currentBalance?.balance;
			b = (b == undefined) ? 0 : b;
			if((Number)(betAmount) > b) {
				toast("⚠️ insufficent fund");
				return;
			}
			placeBet(betAmount, autoCashOut, selectedCurrency);
		}
	}

	const isButtonDisabled: boolean =
		!isConnected  || (isLoggedIn && !haveValidBet) || autoBetCount != 0;
	
	const isAutoButtonDisabled: boolean = (autoBetCount == 0) ? (!isConnected  || (!isLoggedIn && !haveValidBet) || isPlaying || isWaiting) : (!isConnected || !isLoggedIn);

	const getButtonText = () : string => {

		if (!isConnected)
			return 'Connecting...';

		if (!isLoggedIn) {
			return 'Sign In';
		}

		if(autoBetCount != 0) {
			return 'Autobetting now';
		}

		if (isWaiting || isPreparing) {
			return 'Cancel bet';
		}

		if (gameStatus == 'Running') {
			if (isPlaying && !isCashedOut) {
				return 'Cash out';
			} else {
				return 'Place bet (next round)';
			}
		} else {
			return 'Place bet';
		}
	}

	const getAutoButtonText = () : string => {
		if(autoBetCount != 0) {
			return `Cancel auto bet(${autoBetCount} remaining)`;
		}
		return 'Start auto bet';
	}
	const showErrorToast = useEffectEvent(() => {
		if (errors.length > 0)
			toast("⚠️ " + errors[errors.length - 1]);
	});

	useEffect(() => {
		showErrorToast();
	}, [errorCount]);

    const halfBet = (): void => {  
		const currentBet = Number(betAmount);  
		if (currentBet === 0) return;  
	
		let newBetAmount = currentBet / 2;  
		newBetAmount = Math.max(newBetAmount, 1e-5); // Ensure new bet doesn't drop below the minimum  
		setBetAmount(newBetAmount.toFixed(5));  
	};  
	
	const doubleBet = (): void => {  
		const currentBet = Number(betAmount);  
		if (currentBet === 0) return;  
	
		let newBetAmount = currentBet * 2;  
		newBetAmount = Math.min(newBetAmount, 1000000); // Cap the bet amount at the maximum  
		setBetAmount(newBetAmount.toFixed(5));  
	}; 

	const increaseCashout = () : void =>{
		const a = Number(autoCashOut);  
		if (a <= 1) return;  
	
		let newCashout = a - 1;  
		newCashout = Math.max(newCashout, 1); // Ensure new bet doesn't drop below the minimum  

		const chance = (99 / newCashout).toFixed(2);
		setChance(chance);

		setAutoCashOut(newCashout.toFixed(2)); 
	}

	const decreaseCashout = () : void =>{
		const a = Number(autoCashOut);  
		if (a >= 100000) return;  
		
		let newCashout = a + 1;  
		newCashout = Math.min(newCashout, 100000); // Cap the bet amount at the maximum  

		const chance = (99 / newCashout).toFixed(2);
		setChance(chance);

		setAutoCashOut(newCashout.toFixed(2));  
	}

	const autoBetPane = () => {
		setCurrentPane("auto");

	}

	const manualBetPane = () => {
		setCurrentPane("manual");
	}

	const handleAutoBet = () => {
		if(autoBetCount == 0) {
			if(isNaN(Number(autoCashOut)) || isNaN(Number(autoRun))) {
				toast("⚠️ autoCashout value error.");
				return;
			}
			let b =  currentBalance?.balance;
			b = (b == undefined) ? 0 : b;
			if((Number)(betAmount) > b) {
				toast("⚠️ insufficent fund");
				return;
			}

			placeAutoBet((Number)(betAmount), (Number)(autoCashOut), selectedCurrency, (Number)(autoRun));
		}
		else {
			cancelAutoBet();
		}
	}

	return (
		<div className="col-span-8 lg:col-span-3 order-2 lg:order-none flex md:rounded-tl-xl flex-col gap-3 bg-layer4 rounded-t-none pt-1 lg:pt-0.5 lg:max-h-[37.5rem] lg:overflow-hidden !rounded-t-none lg:!col-span-8">
			<div data-orientation="horizontal" id="tabs-cl-43" className="flex flex-col relative lg:h-full">
			<div id="tabs-cl-43-content-manual" role="tabpanel" data-orientation="horizontal" data-selected=""
				className="mt-0 md:relative z-100 lg:overflow-auto" style={{maxHeight: "calc(100% - 48px)"}}
				aria-labelledby="tabs-cl-43-trigger-manual">
				<div className="flex flex-col gap-3 px-3 mb-2 md:mb-3 mt-2 lg:py-3 relative z-100"
				style={style}>
				<div className="md:px-2 py-1">
					<div className="relative w-full flex items-center">
						{currentPane == "manual" ? 
						<button className="button button-brand button-m flex-1 w-full m-auto text-primary_brand font-[800] md:max-w-[400px] md:h-12" type="button" onClick={handleButtonClick} disabled={isButtonDisabled}>
							<span className="flex flex-col items-center justify-center leading-tight"><span>{getButtonText()}</span></span>
						</button> :
						<button className="button button-brand button-m flex-1 w-full m-auto text-primary_brand font-[800] md:max-w-[400px] md:h-12" type="button" onClick={handleAutoBet} disabled={isAutoButtonDisabled}>
						<span className="flex flex-col items-center justify-center leading-tight"><span>{getAutoButtonText()}</span></span>
					</button>
						}
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-3 justify-between">
					<div className="w-full md:w-1/2">
					<div role="group" id="NumberField-cl-44" className="w-full">
						<div className="flex items-center mb-1 justify-between"><label id="NumberField-cl-44-label"
							className="peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-[invalid]:text-secondary px-1 flex items-center h-4.5 pl-1 mr-1 text-sm font-extrabold">Amount</label>
						
						</div>
						<div className="relative">
						<div className="input font-extrabold pr-1 sm:pr-[.1875rem] nowidth-input rounded-lg"><input value={betAmount} style={{ fontSize: '1.25rem', height: '2rem', padding: '0.5rem' }} onChange={(e) => handleChangeBetAmount(e.target.value)}/>  
							<div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 order-first scale-[1.2]">
							<img src={`/coin/${selectedCurrency}.black.png`} className="w-4 h-4" />
							</div>
							<div className="flex items-center gap-1"><button onClick={halfBet}
								className="button button-input button-m text-primary h-10 sm:h-8 w-[3.125rem] rounded-md"
								type="button">1/2</button><button onClick={doubleBet}
								className="button button-input button-m text-primary h-10 sm:h-8 w-[3.125rem] rounded-md"
								type="button">2×</button>
							</div>
						</div>
						<div className="w-full">
							<div className="grid grid-cols-4 gap-2 rounded-xl w-full bg-transparent p-0 pt-1">
								<button onClick={()=>setBetAmount('10')} className="button button-second button-m px-0 h-10 sm:h-8 rounded-md bg-layer5" type="button" style={{backgroundImage: "none"}}>
									<span className="truncate text-sm font-extrabold text-primary">10</span>
								</button>
								<button	onClick={()=>setBetAmount('100')} className="button button-second button-m px-0 h-10 sm:h-8 rounded-md bg-layer5"	type="button" style={{backgroundImage: "none"}}>
									<span className="truncate text-sm font-extrabold text-primary">100</span>
								</button>
								<button	onClick={()=>setBetAmount('1000')} className="button button-second button-m px-0 h-10 sm:h-8 rounded-md bg-layer5"	type="button" style={{backgroundImage: "none"}}>
									<span className="truncate text-sm font-extrabold text-primary">1.0K</span>
								</button>
								<button	onClick={()=>setBetAmount('10000')} className="button button-second button-m px-0 h-10 sm:h-8 rounded-md bg-layer5"	type="button" style={{backgroundImage: "none"}}>
									<span className="truncate text-sm font-extrabold text-primary">10.0K</span>
								</button>
							</div>
						</div>
						</div>
					</div>
					</div>
					<div className="w-full md:w-1/2">
					<div role="group" id="NumberField-cl-46"><label id="NumberField-cl-46-label"
						className="font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-[invalid]:text-secondary px-1 flex w-full items-center justify-between mb-1 text-sm"><span
							className="font-semibold">Auto cash out</span><span>Chance {chance}%</span></label>
						<div className="relative font-extrabold">
						<div className="input rounded-lg">
							<input value={autoCashOut} onChange={(e) => handleChangeAutoCashOut(e.target.value)}/>
						</div>
						<div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1"><b
							className="text-primary mr-1 text-base">×</b>
							<div tabIndex={-1} className="bottom-1 right-1.5 inline-flex items-center justify-center text-secondary hover:opacity-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed static size-auto opacity-100" role="button"><button onClick={increaseCashout}
								className="button button-input button-m text-primary h-10 sm:h-8 w-[3.125rem] rounded-md"
								type="button"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
								width="32" height="32" fill="none">
								<path stroke="currentColor" strokeWidth="2.4" d="M18.4 11.2 13.6 16l4.8 4.8">
								</path>
								</svg></button></div>
							<div tabIndex={-1} className="right-1.5 top-1 inline-flex items-center justify-center text-secondary hover:opacity-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed static size-auto opacity-100" role="button"><button onClick={decreaseCashout}
								className="button button-input button-m text-primary h-10 sm:h-8 w-[3.125rem] rounded-md"
								type="button"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
								width="32" height="32" fill="none" className="rotate-180">
								<path stroke="currentColor" strokeWidth="2.4" d="M18.4 11.2 13.6 16l4.8 4.8">
								</path>
								</svg></button></div>
						</div>
						</div>
					</div>
					{currentPane == "auto" && <div role="group" id="NumberField-cl-46">
						<div className="relative font-extrabold">
						<div className="input rounded-lg">
							<input placeholder='Auto bet count' value={autoRun} onChange={(e)=>setAutoRun(e.target.value)}/>
						</div>						
						</div>
					</div>}
					</div>
				</div>
				</div>
			</div>
			<div role="tablist" aria-orientation="horizontal" data-orientation="horizontal"
				className="relative flex items-center w-full py-1 bg-layer4 overflow-hidden flex-shrink-0 rounded-none h-12 lg:order-first lg:border-b lg:border-input lg:sticky top-0 z-10 lg:rounded-b-none">

				<button id="tabs-cl-43-trigger-manual" role="tab" aria-selected="true" data-key="manual" data-orientation="horizontal" data-selected={currentPane === "manual" ? "" : undefined}  type="button" 		className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:!outline-none focus-visible:!outline-0 rounded-md bg-none text-secondary data-[selected]:text-primary flex-1" aria-controls="tabs-cl-43-content-manual" onClick={manualBetPane}>Manual</button>

				<button id="tabs-cl-43-trigger-auto" role="tab" aria-selected="false" data-key="auto" data-orientation="horizontal" data-selected={currentPane === "auto" ? "" : undefined}   type="button" className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:!outline-none focus-visible:!outline-0 rounded-md bg-none text-secondary data-[selected]:text-primary flex-1" onClick={autoBetPane}>Auto</button>

				<div role="presentation" data-orientation="horizontal" className="duration-250ms absolute transition-all data-[orientation=horizontal]:bottom-[-1px] data-[orientation=vertical]:right-[-1px] data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px] bg-gradient-to-r from-[#24ee89] to-[#9fe871] data-[disabled]:opacity-40" style={{transform: currentPane == "manual" ? "translateX(0px)" : "translateX(400px)", width: isMobile ? "0px" :"400px"}}></div>
			</div>
			</div>
		</div>
	)
}

export default GameControllers;
