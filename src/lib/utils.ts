import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { GameStatus } from '../store/gameStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortenWallet = (wallet: string): string => {
	return '#' + wallet.substring(2, 10).toUpperCase();
}

export const elapsedToMultiplier = (elapsed: number): string => {
	const secondsSinceStart = elapsed / 1000;  
	return Math.pow(Math.E, 0.2 * secondsSinceStart).toFixed(2);
}

export const getMultiplier = (elapsed: number): number => {
	let multiplier = 0.4;
	if(elapsed > 250000) {
		multiplier = 0.8;
	}
	else if(elapsed > 90000) {
		multiplier = 0.7;
	}
	else if(elapsed > 35000) {
		multiplier = 0.6;
	}
	else if(elapsed > 10000) {
		multiplier = 0.5;
	}
	return multiplier;
}

export const calculateXI = (timeValue: number): number=> {  
	let multiplier = 0.4;
	if(timeValue > 500) {
		multiplier = 0.8;
	}
	else if(timeValue > 180) {
		multiplier = 0.7;
	}
	else if(timeValue > 70) {
		multiplier = 0.6;
	}
	else if(timeValue > 30) {
		multiplier = 0.5;
	}
	const multi = 1 / multiplier;
    const i = multi * Math.log(timeValue);  
    return i;  
} 

export const getValueMultiplier = (value: number): number => {
	let multiplier = 0.3;
	if(value > 13000) {
		multiplier = 1.3;
	}
	else if(value > 5000) {
		multiplier = 1.2;
	}
	else if(value > 2400) {
		multiplier = 1.1;
	}
	else if(value > 1100) {
		multiplier = 1;
	}
	else if(value > 450) {
		multiplier = 0.9;
	}
	else if(value > 200) {
		multiplier = 0.8;
	}
	else if(value > 80) {
		multiplier = 0.7;
	}
	else if(value > 30) {
		multiplier = 0.6;
	}
	else if(value > 13) {
		multiplier = 0.5;
	}
	else if(value > 5) {
		multiplier = 0.4;
	}	
	return multiplier;
}

export const calculateYI = (value: number): number=> {  
	let multiplier = 0.3;
	if(value > 13000) {
		multiplier = 1.3;
	}
	else if(value > 5000) {
		multiplier = 1.2;
	}
	else if(value > 2400) {
		multiplier = 1.1;
	}
	else if(value > 1100) {
		multiplier = 1;
	}
	else if(value > 450) {
		multiplier = 0.9;
	}
	else if(value > 200) {
		multiplier = 0.8;
	}
	else if(value > 80) {
		multiplier = 0.7;
	}
	else if(value > 30) {
		multiplier = 0.6;
	}
	else if(value > 13) {
		multiplier = 0.5;
	}
	else if(value > 5) {
		multiplier = 0.4;
	}	
	const multi = 1 / multiplier;
    const i = multi * Math.log(value);  
    return i;  
}  

export const interpolate = (x1: number, y1: number, x2: number, y2: number, t: number, pow: number) : number=> {  
    let easeT = Math.pow(t, pow); // Getting the eased t value  

    let newX = x1 + (x2 - x1) * easeT;  // Interpolate x  
    let newY = y1 + (y2 - y1) * easeT;  // Interpolate y  

	return newY; 
} 