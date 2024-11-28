"use client";

import { useRef, useEffect, useState } from 'react';

import { useGameStore, GameState } from '../store/gameStore';
import useWindowSize from './ui/size';

export const GameBanner = ()=>{
	const crashes = useGameStore((gameState) => gameState.crashes);
	const [isMobile, setIsMobile] = useState(false);  
  
	useEffect(() => {  
		setIsMobile(window.innerWidth < 768);  
	}, []);  
	
	const cnt = isMobile ? -5 : -7;
	const styleString = !isMobile ? "calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem)" : "calc(20% - 0.3rem) calc(20% - 0.3rem) calc(20% - 0.3rem) calc(20% - 0.3rem) calc(20% - 0.3rem) calc(20% - 0.3rem)";
	return (
		<div id="crash-banner" className="px-2 flex">
			<div className="overflow-hidden flex-auto bg-layer4 rounded-lg md:rounded-lg md:h-[2.5rem]"
				style={{width: "calc(100% - 3rem)"}}>
				<div className="grid grid-auto-flow-column gap-1 h-full overflow-x-visible grid-cols-7"
				style={{gridTemplateColumns: styleString}}>
					{
						crashes.slice(cnt).map((item, idx)=>{							
							const bgBack = ((Number)(item.multiplier)>=10)?"moon-bg-btn":((Number)(item.multiplier))>=2? 'bg-success':'bg-warning';
							const color = ((Number)(item.multiplier)>=10)?"moon-btn-text":((Number)(item.multiplier))>=2? 'text-success':'text-warning';
							const mul = ((Number)(item.multiplier)).toFixed(2);
							return <div className="flex items-center justify-center gap-1 px-2 h-full" key={idx}>
								<span className={`w-3 h-3 rounded-full flex-shrink-0 ${bgBack}`}></span>
								<span className="flex flex-col">
									{!isMobile && <span className="text-xs leading-tight text-tertiary font-semibold">{item.roundId}</span>}
									<span className={`text-sm leading-tight text-left whitespace-nowrap font-extrabold ${color}`}>{mul}×</span>
								</span>
							</div>
						})
					}
				</div>
			</div>
			<div
				className="flex w-[2rem] h-[2rem] justify-center items-center ml-[0.5rem] bg-layer4 rounded-md md:rounded-lg box-border p-2 md:w-10 md:h-10">
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="none"
				className="scale-110 md:scale-75 text-secondary">
				<path fill="currentColor"
					d="M7.534 21.08a3.388 3.388 0 1 1-.001 6.775 3.388 3.388 0 0 1 0-6.775m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775M7.534 12.613a3.387 3.387 0 1 1-.001 6.775 3.387 3.387 0 0 1 0-6.775m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775m-8.466 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775M7.534 4.146a3.388 3.388 0 1 1-.001 6.776 3.388 3.388 0 0 1 0-6.776m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775m-8.466 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775">
				</path>
				</svg>
			</div>
		</div>
	)
}
