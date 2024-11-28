
"use client"
import React, { useState, useMemo, useRef, useEffect  } from 'react';  

import MoneyPanel from "./ui/money-panel";
import { useGameStore, GameState } from '../store/gameStore';
import useWindowSize from './ui/size';

export default function PageHeader() {	
	const gameState = useGameStore((state: GameState) => state); 
	const size = useWindowSize();  
	const isMobile = size.width && size.width <= 600;

	const [showMoneyPanel, setShowMoneyPanel] = useState(false);  

	const { balances, selectedCurrency } = gameState;  

    // Using useMemo to only recalculate when balances or selectedCurrency changes  
    const currentBalance = useMemo(() => {  
        return balances.find(balance => balance.currency === selectedCurrency);  
    }, [balances, selectedCurrency]);  

    // Function to toggle MoneyPanel visibility  
    const toggleMoneyPanel = () => {  
        setShowMoneyPanel(!showMoneyPanel);  
    }; 	

	const panelRef = useRef<HTMLDivElement>(null);  

    // Hide panel when clicking outside  
    useEffect(() => {  
        const handleClickOutside = (event : MouseEvent) => {  
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {  
                setShowMoneyPanel(false);  
            }  
        };  

        document.addEventListener('mousedown', handleClickOutside);  
        return () => {  
            document.removeEventListener('mousedown', handleClickOutside);  
        };  
    }, []);  

	return (
		<div className="header">  
            <div className="relative flex h-full flex-1 items-center" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 8px 0px" }}>  
                <div className="relative h-full w-full px-4 mx-auto max-w-[1248px]">  
                    <div className="absolute left-0 top-0 flex size-full items-center px-3 justify-end"  
                        style={{ transform: "translate(0px, 0px)",opacity: "1" }}>  
                        <div className="relative ml-3 flex items-center">  
                            <div className="relative flex h-10 rounded-xl w-52 border-2 p-0.5 sm:w-[16.5rem] border-input bg-layer3"  
                                onClick={toggleMoneyPanel} style={{width:"16.5rem"}}> {/* Added onClick event listener */}  
                                <div className="relative mr-1 flex cursor-pointer select-none items-center ml-1.5 flex-auto">  
                                    <img className="mr-1.5 flex h-6 w-6 flex-none" src={`/coin/${selectedCurrency}.black.png`} />  
                                    <div className="font-extrabold ellipsis w-0 flex-auto">{selectedCurrency}&nbsp;{currentBalance?.balance.toFixed(5)}</div>  
                                    <svg className="icon w-4 -rotate-90 text-secondary" viewBox="0 0 32 32">  
                                        <path d="M20.1912 6.1001L9.79119 16.5001L20.1912 26.9001L23.2088 23.8825L15.8264 16.5001L23.2088 9.1177L20.1912 6.1001Z"></path>  
                                    </svg>  
                                </div>  
                                <button className="button button-brand button-m ml-auto h-8 flex-none rounded-lg"  
                                    type="button"><span>Deposit</span></button>  									
                            </div>                            
							{showMoneyPanel && <div ref={panelRef}><MoneyPanel toggleMoneyPanel={toggleMoneyPanel} /></div>}  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
	);
}
