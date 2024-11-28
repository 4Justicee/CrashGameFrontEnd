"use client";

import { useGameStore, CrashedGame } from '../store/gameStore';

export type CrashBannerProps = {}

export default function CrashBanner({}: CrashBannerProps) {
	const crashes = useGameStore((gameState) => gameState.crashes);
	
	
	return (
		<div id="crash-banner" className="px-2 flex">
			<div className="overflow-hidden flex-auto bg-layer4 rounded-lg md:rounded-lg md:h-[2.5rem]"
				style={{width: "calc(100% - 3rem)"}}>
				<div className="grid grid-auto-flow-column gap-1 h-full overflow-x-visible grid-cols-7"
				style={{gridTemplateColumns: "calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem)", transform: "translateX(-14.375%)"}}>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-warning"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616862</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">1.67×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-warning"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616863</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">1.37×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-success"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616864</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">2.95×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-warning"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616865</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">1.14×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-warning"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616866</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">1.05×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 moon-bg-btn"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616867</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold moon-btn-text">47.25×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-success"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616868</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">2.80×</span></span>
				</div>
				<div className="flex items-center justify-center gap-1 px-2 h-full"><span
					className="w-3 h-3 rounded-full flex-shrink-0 bg-success"></span><span
					className="flex flex-col"><span
						className="text-xs leading-tight text-tertiary font-semibold">7616869</span><span
						className="text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">5.12×</span></span>
				</div>
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
	);
}
