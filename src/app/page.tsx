"use client";

import React, { useState, useMemo, useEffect  } from 'react'; 
import { useGameStore, GameState } from '../store/gameStore';

import Game from '../components/Game';
import { GameBanner } from "@/components/GameBanner";
import GameLayout from '../components/GameLayout';

import { toast } from "sonner"
import GameControllers from '@/components/GameControls';
import GamePlayerList from '@/components/BetList';

import useWindowSize from '@/components/ui/size';

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
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  

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
				</svg><span className={`md:block ml-1 ${isMobile?"hidden":""}`}>146473</span></button><button
				className="button button-m text-secondary" type="button"><svg viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" className="size-6">
				<path fill="currentColor"
					d="m3.755 15.576 15.622-6.555c1.542-.683 6.771-2.869 6.771-2.869s2.413-.955 2.213 1.366c-.067.955-.603 4.302-1.14 7.92L25.547 26.16s-.134 1.57-1.276 1.844c-1.141.273-3.016-.955-3.352-1.229-.268-.204-5.028-3.277-6.772-4.78-.469-.41-1.005-1.229.067-2.185 2.414-2.253 5.297-5.054 7.04-6.829.804-.82 1.61-2.732-1.743-.41l-9.454 6.487s-1.073.683-3.083.069-4.358-1.434-4.358-1.434-1.61-1.025 1.14-2.117h.002z">
				</path>
				</svg></button></div>
			
			<div className="flex items-center md:gap-2 flex-1 justify-end">
			<div aria-pressed="true" data-pressed=""
				className="inline-flex items-center justify-center font-extrabold transition-colors disabled:pointer-events-none disabled:opacity-40 text-primary data-[pressed]:text-brand h-10 px-4 rounded-xl !p-0 bg-transparent"
				role="button" tabIndex={0}><button title="Sound" className="button button-m text-secondary"
				type="button"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
					fill="none" className="size-6 transition-transform duration-300">
					<path fill="currentColor"
					d="m10.609 8.551.008.009 17.26 17.474a.987.987 0 0 1 0 1.387.963.963 0 0 1-1.362.009l-.009-.01-2.247-2.273c-1.01 1.32-2.246 2.095-3.582 2.095-.965 0-1.878-.405-2.691-1.126l-6.82-6.068H6.67c-1.66 0-2.83-1.877-2.83-4.192 0-2.249 1.104-4.085 2.689-4.181l.141-.005h4.28L9.247 9.946a.987.987 0 0 1 0-1.386.963.963 0 0 1 1.362-.009m10.069-4.094c3.416 0 6.189 5.09 6.189 11.393 0 2.399-.401 4.623-1.086 6.456l-3.23-3.34a6.15 6.15 0 0 0 .722-3.103 6.1 6.1 0 0 0-1.209-3.868 1.075 1.075 0 0 0-1.508-.114 1.09 1.09 0 0 0-.14 1.52c.49.724.734 1.587.694 2.462.02.483-.045.962-.19 1.418l-7.432-7.682 4.498-4.016c.813-.721 1.726-1.126 2.69-1.126z">
					</path>
				</svg></button></div><button title="HotKeys" className="button button-m text-secondary"
				type="button"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
				fill="none" className="size-6 transition-transform duration-300 hover:scale-125 ">
				<path fill="currentColor"
					d="M24.333 5.334a5 5 0 0 1 5 5v11.333a5 5 0 0 1-5 5H7.667a5 5 0 0 1-5-5V10.334a5 5 0 0 1 5-5zm-2.11 14.222H9.777a1.778 1.778 0 0 0 0 3.555h12.444a1.777 1.777 0 1 0 0-3.555m-11.556-5.334H7.11a.89.89 0 0 0-.889.89v1.777c0 .49.398.889.89.889h3.555a.89.89 0 0 0 .889-.889v-1.778a.89.89 0 0 0-.89-.889m7.11 0h-3.555a.89.89 0 0 0-.889.89v1.777c0 .49.399.889.89.889h3.555a.89.89 0 0 0 .889-.889v-1.778a.89.89 0 0 0-.89-.889m7.112 0h-3.556a.89.89 0 0 0-.889.89v1.777c0 .49.399.889.89.889h3.555a.89.89 0 0 0 .889-.889v-1.778a.89.89 0 0 0-.89-.889M10.667 8.89H7.11a.89.89 0 0 0-.889.889v1.778c0 .49.398.889.89.889h3.555a.89.89 0 0 0 .889-.89V9.779a.89.89 0 0 0-.89-.889m7.11 0h-3.555a.89.89 0 0 0-.889.889v1.778c0 .49.399.889.89.889h3.555a.89.89 0 0 0 .889-.89V9.779a.89.89 0 0 0-.89-.889m7.112 0h-3.556a.89.89 0 0 0-.889.889v1.778c0 .49.399.889.89.889h3.555a.89.89 0 0 0 .889-.89V9.779a.89.89 0 0 0-.89-.889">
				</path>
				</svg></button><button className="button button-m text-secondary" type="button"><svg
				viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"
				className="transition-transform duration-300 hover:scale-125 size-6">
				<path fill="currentColor"
					d="M25.461 5.249a3.44 3.44 0 0 1 1.485 6.545l-.002-.057q.027.93.022 1.79l-.011.679c-.151 6.343-1.785 9.75-5.373 9.75-1.894 0-3.369-.972-4.516-2.684q-.1-.15-.195-.301l-.186-.306-.178-.317-.174-.331q-.128-.255-.258-.538l-.174-.392-.179-.427-.186-.465-.196-.509-.21-.558-.517-1.404-.194-.512-.189-.478-.18-.443-.176-.41-.086-.193-.168-.362q-.041-.087-.082-.17l-.162-.316c-.696-1.306-1.304-1.785-2.077-1.785-1.273 0-2.272 1.39-2.813 4.397l-.081.488a22 22 0 0 0-.075.515l-.066.542-.03.282-.053.583-.024.302-.042.625q-.018.32-.033.653l-.024.681-.003.102a3.44 3.44 0 1 1-3.013-.012q.037-1.395.144-2.636l.063-.653c.616-5.782 2.522-8.878 6.048-8.878 1.8 0 3.196.946 4.284 2.605q.093.144.183.289l.174.293.168.303.164.317.162.338.164.362.083.193.171.411.18.45.19.494.31.835.305.832.202.541.197.506.19.47.183.439.09.207.178.39.087.183.172.344.17.315c.727 1.298 1.399 1.784 2.275 1.784.883 0 1.59-.93 1.995-2.914l.076-.397q.034-.205.067-.424l.059-.45q.029-.232.051-.478l.043-.504.034-.532.026-.56.01-.29.012-.601.003-.629q0-.322-.006-.658l-.016-.685-.003-.052a3.44 3.44 0 0 1 1.529-6.524z">
				</path>
				</svg></button><button title="Help"
				className="button button-m transition-transform duration-300 text-secondary" type="button"><svg
				viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"
				className="size-6 transition-transform duration-300 hover:scale-125">
				<path fill="currentColor"
					d="M16 3.826c6.724 0 12.174 5.45 12.174 12.174S22.724 28.174 16 28.174 3.826 22.724 3.826 16 9.276 3.826 16 3.826m0 2.609a9.565 9.565 0 1 0 0 19.13 9.565 9.565 0 0 0 0-19.13m-.04 14.71a1.305 1.305 0 1 1-.001 2.61 1.305 1.305 0 0 1 .001-2.61m.23-12.252c1.356 0 2.462.355 3.297 1.106q1.252 1.095 1.252 3.005c0 1.044-.271 1.9-.772 2.567-.188.21-.793.773-1.795 1.65a3.2 3.2 0 0 0-.835 1.043c-.179.357-.28.73-.306 1.145l-.007.211v.292h-2.4v-.292c0-.793.126-1.482.418-2.045.256-.532.996-1.344 2.22-2.452l.221-.198.25-.293c.377-.459.564-.96.564-1.481 0-.69-.208-1.232-.584-1.628-.396-.397-.96-.585-1.67-.585-.918 0-1.565.272-1.961.856-.323.437-.49 1.045-.518 1.81l-.004.235h-2.38c0-1.544.44-2.754 1.357-3.631.898-.877 2.108-1.315 3.653-1.315">
				</path>
				</svg></button>
			</div>
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
