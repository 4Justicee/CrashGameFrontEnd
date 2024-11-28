"use client"
import React, { useState, useMemo  } from 'react';  
import SimpleBar from 'simplebar-react';  
import 'simplebar-react/dist/simplebar.min.css';  
import { useGameStore, GameState } from '../../store/gameStore';
import Image from 'next/image';
import useWindowSize from './size';

interface MoneyPanelProps {  
    toggleMoneyPanel: () => void; // Specifies that toggleMoneyPanel is a function returning void  
}  

const MoneyPanel: React.FC<MoneyPanelProps> = ({ toggleMoneyPanel }) => {  
    const [filterKey, setFilterKey] = useState<string>("");  
    const gameState = useGameStore((state: GameState) => state);  
    const { setCurrency } = useGameStore((game: GameState) => game.actions);
    const size = useWindowSize();  
	const isMobile = size.width && size.width <= 600;

    const setSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setFilterKey(e.target.value);  
    };  

    // Memoizing the filtered balances  
    const filteredBalances = useMemo(() => {  
        if (!filterKey) return gameState.balances; // if filterKey is empty, return all balances  

        // Filter balances based on the filterKey against currency (case-insensitive)  
        return gameState.balances.filter(item =>   
            item.currency.toLowerCase().includes(filterKey.toLowerCase())  
        );  
    }, [gameState.balances, filterKey]); // recompute when balances or filterKey changes  

    const moneySelect = (currency: string) => {
        setCurrency(currency)
        toggleMoneyPanel();
    }

	return (
        <SimpleBar  className="scroll-y dropdown-layer bg-layer3 currency-select"
            style={{left: "0px", top: "48px", transform: "translate(0px, 0px)", opacity: "1", width: isMobile ? "270px": "384px", position:'absolute'}}>
            <div className="top-0 flex items-center justify-between sticky z-20 bg-layer3 sm:pt-4 dark:bg-layer2 sm:dark:bg-layer3">
                <div className="input text-base font-semibold flex-auto bg-layer3"><input placeholder="Search" onChange={(e)=>setSearchText(e)} value={filterKey}/><svg
                        className="icon text-secondary -order-1" viewBox="0 0 32 32">
                        <path
                            d="M20.6097 21.616L19.2692 20.2755C17.6782 21.5776 15.6458 22.3597 13.4305 22.3624C8.33103 22.3624 4.19653 18.2279 4.19653 13.1285C4.19653 8.02903 8.33103 3.89453 13.4305 3.89453C18.5299 3.89453 22.6644 8.02903 22.6644 13.1285C22.6617 15.3277 21.8903 17.3468 20.6061 18.9325L21.9492 20.2755L21.9189 20.305L21.9304 20.2952C22.2203 20.0651 22.643 20.0847 22.9115 20.3522L27.5873 25.0281C27.8753 25.3161 27.8753 25.7843 27.5873 26.0733L26.3994 27.2612C26.1113 27.5493 25.6431 27.5493 25.3542 27.2612L20.6783 22.5854C20.4108 22.3178 20.3912 21.8951 20.6212 21.6044L20.6105 21.6151L20.6097 21.616ZM13.4305 6.10536C9.55193 6.10536 6.40736 9.24993 6.40736 13.1285C6.40736 17.007 9.55193 20.1516 13.4305 20.1516C17.309 20.1516 20.4536 17.007 20.4536 13.1285C20.45 9.25082 17.3081 6.10893 13.4305 6.10536Z">
                        </path>
                    </svg></div>
            </div>
            <div style={{marginTop:'0.5rem'}}>
                {
                    filteredBalances.map((item, idx)=> {
                        return <div onClick={()=>moneySelect(item.currency)} className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 !leading-5 hover:bg-layer4 scroll-target bg-layer4" key={idx}>
                            <img className="h-6 w-6" src={`/coin/${item.currency}.black.png`} />
                            <div className="ml-2">
                                <div className="flex items-center text-base font-extrabold">{item.currency}</div>
                            </div>
                            <div className="ml-auto text-right">
                                <div>{item.balance.toFixed(5)}</div>                               
                            </div>
                        </div>
                    })
                }                               
            </div>
        </SimpleBar >
	);
}

export default MoneyPanel;