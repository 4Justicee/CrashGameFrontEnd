"use client";

import React, { useState, useMemo, useEffect  } from 'react'; 
import { useGameStore, GameState } from '../store/gameStore';

import Game from '../components/Game';
import { GameBanner } from "@/components/GameBanner";
import GameLayout from '../components/GameLayout';

import { toast } from "sonner"
import GameControllers from '@/components/GameControls';
import GamePlayerList from '@/components/BetList';
import Modal from '@/components/ui/fair-modal';
import SimpleBar from 'simplebar-react';  
import 'simplebar-react/dist/simplebar.min.css';  

const GameTypeTab = () => {
	const classicGame = ()=> {

	}

	const TrenballGame = ()=>{
		toast("⚠️ Not available in v1");
	}

	return (
		<div data-orientation="horizontal" id="crash-tab" className="h-12 md:h-10 flex items-center bg-layer4 rounded-md mb-5 md:mb-2 w-full md:max-w-[24.5rem] ml-auto ">
			<div role="tablist" aria-orientation="horizontal" data-orientation="horizontal" className="relative flex items-center rounded-lg w-full h-full md:h-10 light-layer2-tabs">
				<button	id="crash-tab-trigger-classic" onClick={classicGame} role="tab" aria-selected="true" data-key="classic" data-orientation="horizontal" data-selected="" type="button" className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:!outline-none focus-visible:!outline-0 rounded-md flex-1 data-[selected]:bg-tab_selected text-secondary data-[selected]:text-primary" tabIndex={0} data-highlighted="">Classic</button>
				<button id="crash-tab-trigger-trenball" onClick={TrenballGame} role="tab" aria-selected="false" data-key="trenball" data-orientation="horizontal" type="button" className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:!outline-none focus-visible:!outline-0 rounded-md flex-1 data-[selected]:bg-tab_selected text-secondary data-[selected]:text-primary" tabIndex={-1}>Trenball</button>
			</div>
	  </div>
	)
}


const GameBody = () => {
	return (
		<div className="min-h-[15.875rem]">
			<div className="relative mt-1 md:mt-4 after:content-[''] after:block after:pt-[40%] min-h-[15rem] max-h-[19rem]">
				{/* <canvas width="1536" height="608" className="pl-2 w-full h-full absolute top-0 left-0"></canvas> */}
				<Game />
			</div>
		</div>
	)
}

const GameContent = ()=>{
	return (
		<div className="mx-auto w-full relative light-game-view -mt-2 pt-3 rounded-t-xl dark:bg-[#292D2E] md:h-[25rem] md:px-4">
			<GameBanner />
			<GameBody />
		</div>
	)
}


const GameButtons = () => {
	const [isMobile, setIsMobile] = useState(false);  
	
	const [isModalOpen, setModalOpen] = useState(false);  

    const handleOpenModal = () => {  
        setModalOpen(true);  
    };  
    const handleCloseModal = () => {  
        setModalOpen(false);  
    };  

	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  

	const crashes = useGameStore((gameState) => gameState.crashes);

	return (
		<div className="relative justify-between bg-layer3 h-12 md:justify-self-end md:static w-full md:px-5 px-1 flex border-t border-third rounded-b-xl z-[100] order-last">
			<div className="flex items-center md:gap-2 flex-1"><button className="button button-m text-secondary"
				type="button"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
				fill="none" className="size-6">
				<path
					d="m15.184 26-5.445 2.99c-.856.47-1.915.127-2.365-.767a1.9 1.9 0 0 1-.177-1.16l1.04-6.333a1.88 1.88 0 0 0-.504-1.62L3.33 14.626a1.89 1.89 0 0 1-.031-2.587c.269-.289.621-.476 1.002-.534l6.087-.923a1.76 1.76 0 0 0 1.32-1.001l2.722-5.76c.428-.906 1.478-1.28 2.346-.832.346.178.626.47.796.831l2.723 5.761c.255.54.748.915 1.319 1l6.087.925c.957.145 1.62 1.074 1.482 2.074a1.86 1.86 0 0 1-.51 1.047l-4.405 4.484a1.88 1.88 0 0 0-.504 1.62l1.04 6.332c.163.996-.478 1.941-1.431 2.113-.38.068-.77.003-1.111-.184l-5.445-2.99c-.51-.28-1.12-.28-1.63 0z"
					fill="currentColor"></path>
				</svg><span className={`md:block ml-1 ${isMobile?"hidden":""}`}>155857</span></button>
				<button className="button button-m text-secondary" type="button"><svg viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" className="size-6 mt-0.5">
				<path fill="currentColor"
					d="M25.887 17.426 16 28.054 6.095 17.408l-.018-.018-.453-.488.02-.023c-2.406-3.098-2.255-7.715.45-10.623 2.707-2.91 7.002-3.07 9.886-.484l.02-.024.023.024.045-.042c2.883-2.543 7.146-2.368 9.837.526 2.706 2.908 2.857 7.525.45 10.624l.021.022-.455.49z">
				</path>
				</svg><span className={`md:block ml-1 ${isMobile?"hidden":""}`}>146473</span></button></div>
			
			<div className="flex items-center md:gap-2 flex-1 justify-end">
			<button title="Help" onClick={()=>handleOpenModal()}
				className="button button-m transition-transform duration-300 text-secondary" type="button"><svg
				viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"
				className="size-6 transition-transform duration-300 hover:scale-125">
				<path fill="currentColor"
					d="M16 3.826c6.724 0 12.174 5.45 12.174 12.174S22.724 28.174 16 28.174 3.826 22.724 3.826 16 9.276 3.826 16 3.826m0 2.609a9.565 9.565 0 1 0 0 19.13 9.565 9.565 0 0 0 0-19.13m-.04 14.71a1.305 1.305 0 1 1-.001 2.61 1.305 1.305 0 0 1 .001-2.61m.23-12.252c1.356 0 2.462.355 3.297 1.106q1.252 1.095 1.252 3.005c0 1.044-.271 1.9-.772 2.567-.188.21-.793.773-1.795 1.65a3.2 3.2 0 0 0-.835 1.043c-.179.357-.28.73-.306 1.145l-.007.211v.292h-2.4v-.292c0-.793.126-1.482.418-2.045.256-.532.996-1.344 2.22-2.452l.221-.198.25-.293c.377-.459.564-.96.564-1.481 0-.69-.208-1.232-.584-1.628-.396-.397-.96-.585-1.67-.585-.918 0-1.565.272-1.961.856-.323.437-.49 1.045-.518 1.81l-.004.235h-2.38c0-1.544.44-2.754 1.357-3.631.898-.877 2.108-1.315 3.653-1.315">
				</path>
				</svg></button>
			</div>
			
			<Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Probability Fairness Check">  
				<SimpleBar className='fairbar' style={{height:'400px'}}>
                <p style={{overflowWrap: "break-word",wordBreak: "break-all"}}>We are a fair and unbiased prediction and speculation platform.<br/>
				Our goal is to remove all unfair elements and make players feel comfortable and enjoy themselves.<br/>
				We have created a hash chain containing millions of hashes, the generated chain is user verifiable, and each hash corresponds to a crash multiplier.<br/>
				We release these hashes in reverse order, each corresponding to one turn of the game.
				That is, the crash numbers for each turn already exist and are not calculated after the game starts.<br/><br/>
				The integrity check value is key to verifying whether there is any official manipulation; <br/>The test algorithm is provided as follows.
				<br/>Example: <br/><br/>6b5124897c3c48d0e46cc9249f08c7e560792459f1bad1171224643b5d2be231<br/><br/>

Take a random value in the 2^52 range, namely 16^13, i.e. a 13-bit hexadecimal <br/>number (because the hash value is hexadecimal, 2^52 === 16^13)<br/><br/>6b5124897c3c4 (0x6b5124897c3c4 equals 1887939992208324 in the decimal system).<br/>
Distribute the random value to 0~1, by dividing it by the maximum value of 13 fs, <br/>namely 0x6b5124897c3c4/0x10000000000000.<br/> <br/>Given the discrete random nature of the hash value, we then can think that any hash value <br/>can be transformed into a random number of 0~1, 1887939992208324/4503599627370496 = 0.419206889692064.<br/><br/>
Make the house edge 1%. <br/>Further to calculate 99/(1-X), where X is the random value calculated at Step 2. <br/>When X is 0, the result is 99; when X is 1, the result is positive infinite; when X is 0.01, the result is 100; <br/>when X is less than 0.01, the result is less than 100.<br/><br/>
Conclusion: The overall random number distribution is 99 to positive infinite;<br/> and when the random number distribution is 0~0.01, the result is less than 100.
<br/><br/>
99/(1-0.419206889692064) = 170.45656748150867
<br/><br/>
All values less than 100 will be set to 100. <br/>In other words, there is a probability of 1% that 100 will appear. <br/>Round off the number and divide it by 100 to get the final result.<br/><br/>
170/100 = 1.70
<br/><br/>
You can check this yourself by looking at the last 5 hashes.<br/>
You can also check if this is a hash chain. If you take the sha256 of the hash value above, <br/>you can check if you get the hash value below.<br/><br/>
</p>
				{
					crashes.slice(-7).reverse().map((item, idx)=>{
						return <p style={{overflowWrap: "break-word",wordBreak: "break-all"}} key={idx}><span style={{fontWeight:700}}>{((Number)(item.multiplier)).toFixed(2)}</span>&nbsp;&nbsp;{item.hash}</p>
					})
				} 
				<br/>
				</SimpleBar>
            </Modal>  

		</div>
	);
}

const GameView = () => {
	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  

	return (
		<div className="order-1 lg:order-2 col-span-8 lg:col-span-7 bg-layer4 dark:bg-[#292D2E] md:relative md:pt-2 flex flex-col rounded-t-xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-br-none lg:rounded-tr-xl lg:h-[37.5rem] md:min-h-[42rem] lg:!col-span-8 "
                style={{height: "auto", borderRadius: "0.75rem"}}>
			{ isMobile && <GameTypeTab />
			}
			<GameContent />
			<GameControllers/>
			<GameButtons />
		</div>
	)
}


const GameListView = () => {
	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  
	
	return (
		<div className={`order-3 lg:order-2 col-span-8 lg:col-span-3 ${!isMobile ? "min-w-[25rem] lg:!col-span-4" : ""}`}>
			{ !isMobile && <GameTypeTab /> }
			<GamePlayerList />
		</div>
	)
}

const MainElem = ()=> {
	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-8 lg:grid-cols-10 bg-layer2 relative md:pb-0 rounded-lg lg:!grid-cols-12 items-start">
				<GameView />
				{ !isMobile && <GameListView />}
			</div>
		</div>
	);
}



export default function Home() {
	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  

	return (
		<div className="w-full px-4 mx-auto max-w-[1248px] pb-18 pt-18 sm:px-6 sm:pb-6 sm:pt-[84px]">
      		<div className="py-3 sm:py-0">        		
				<GameLayout>					
					<MainElem />
					{ isMobile && <GameListView />}
				</GameLayout>				
			</div>
		</div>
	);
}
