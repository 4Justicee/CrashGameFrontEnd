"use client";

import { useRef, useEffect, useState } from 'react';

import { useGameStore, GameState } from '../store/gameStore';

import styles from '../styles/components/Game.module.css';
import { getMultiplier, getValueMultiplier, calculateXI, interpolate, calculateYI} from '@/lib/utils';

let explodeImage: HTMLImageElement;
//let craneImage: HTMLImageElement;
let loadImage: HTMLImageElement;

if (typeof window !== 'undefined') {

	explodeImage = new Image();
	explodeImage.src = 'explode.svg';

	//craneImage = new Image();
	//craneImage.src = 'crane.png'

	loadImage = new Image();
	loadImage.src = 'load.png'
}

//const craneWidth = 3600;
//const craneHeight = 2200;

const loadWidth = 180;
const loadHeight = 190;

const xStartPosition = 1000;
const xMaxPosition = 3500; //max length of crane arm

const aa = 0.517;	
const bb = 110; //ax+b of arm of crane

function render(
	gameState: GameState,
	context: CanvasRenderingContext2D,
) {
	if (!context)
		return;

	const canvas = context.canvas;

	context.clearRect(0, 0, canvas.width, canvas.height);

	const maxX = canvas.width - loadWidth;
	const minY = loadHeight;

	context.save();

	drawCrane(context);

	const position = calcLoadPosition(context, gameState.timeElapsed, gameState.multiplier, gameState.status);
	const expectedX = position.lastX;//gameState.timeElapsed;
	const expectedY = position.lastY;//canvas.height - curveFunction(gameState.timeElapsed/1000);
	
	const rocketX = Math.min(expectedX, maxX);
	const rocketY = Math.max(expectedY, minY);

	if (gameState.status == 'Crashed')
		drawCrashedLoad(context, gameState.timeCrashElapsed, rocketX, rocketY);
	else
		drawLoad(context, gameState.timeElapsed, rocketX, rocketY);

	
	context.restore();

	if (gameState.status == 'Waiting')
		drawCountdown(context, gameState.timeRemaining);
	else if(gameState.status == "Crashed" && gameState.myWin == 1) {
		drawResultText(context, 'lose');		
	}
	else {		
		if(gameState.myWin == 2 && Date.now() - gameState.winTime < 1500) {						
			drawResultText(context, 'win')
		}
		else {
			drawMultiplier(context, gameState.multiplier);		
		}
		drawTimeAxis(context, gameState.timeElapsed, canvas.width); 
		drawValueAxis(context, gameState.multiplier, canvas.height); 
	}
}

function drawResultText(
	context: CanvasRenderingContext2D,
	result: string,
) {
	const canvas = context.canvas;

	if (result == 'lose')
		context.fillStyle = 'red';
	else 
		context.fillStyle = 'blue';

	context.font = '240px Arial';
	const text = result.toUpperCase();
	const textWidth = context.measureText(text).width;

	context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2);
}

function drawTimeAxis(context:CanvasRenderingContext2D, currentTime:number,canvasWidth:number) {  
    const numIntervals = 10;  // You can adjust this for more or fewer time markers  
    const interval = (xMaxPosition - xStartPosition) / numIntervals;  
	const canvas = context.canvas;
	const multiplier = getMultiplier(currentTime);

    context.beginPath();  
    context.fillStyle = 'rgba(30, 30, 30, 1.0)';
    context.font = "60px Arial";  

    for (let i = 0; i <= numIntervals; i++) {  
        let xPosition = interval * i + xStartPosition;  
        context.moveTo(xPosition, canvas.height - 30);  
        context.lineTo(xPosition, canvas.height - 5);  

		let timeMark =  Math.pow(Math.E, multiplier * (i)).toFixed(1);
	    context.fillText(`${timeMark}s`, xPosition, canvas.height-45); // Adjust label positioning as needed  
    }  
    context.stroke();  
} 

function drawValueAxis(context:CanvasRenderingContext2D, multiplier:string,canvasHeight:number) {  
    const numIntervals = 10;  // You can adjust this for more or fewer time markers  
    const interval = canvasHeight / numIntervals;  
	const v = getValueMultiplier((Number)(multiplier));

    context.beginPath();  
    context.fillStyle = 'rgba(30, 30, 30, 1.0)';
    context.font = "60px Arial";  

    for (let i = 1; i <= numIntervals; i++) {  
        let yPosition = canvasHeight - interval * i;  
        context.moveTo(30, yPosition);  
        context.lineTo(5, yPosition);  

		let valueMark =  Math.pow(Math.E, v * (i)).toFixed(1);
	    context.fillText(`${valueMark}`, 45, yPosition); // Adjust label positioning as needed  
    }  
    context.stroke();  
} 

function drawCrane(context: CanvasRenderingContext2D) {
	//context.drawImage(craneImage, 0, 0, craneWidth, craneHeight);
}

function drawMultiplier(
	context: CanvasRenderingContext2D,
	multiplier: string,
) {
	const canvas = context.canvas;

	const multiplierNumeric = Number.parseFloat(multiplier);

	if (multiplierNumeric > 5)
		context.fillStyle = 'red';
	else if (multiplierNumeric > 2)
		context.fillStyle = 'blue';
	else
		context.fillStyle = 'rgba(30, 30, 30, 1.0)';

	context.font = '220px Arial';
	const text = `${multiplier}x`;
	const textWidth = context.measureText(text).width;

	context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2);
}

function drawCountdown(
	context: CanvasRenderingContext2D,
	timeRemaining: number,
) {
	const canvas = context.canvas;
	timeRemaining = timeRemaining == 0 ? 7 : timeRemaining;
	context.fillStyle = 'rgba(30, 30, 30, 1.0)';
	context.font = '220px Arial';
	const text = `Launch in ${timeRemaining} secs`;
	const textWidth = context.measureText(text).width;
	context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2);
}

function calcLoadPosition(
	context: CanvasRenderingContext2D,
	timeElapsed: number,
	multiplier: string,
	status: string,
) {
	const canvas = context.canvas;

	const originX = xStartPosition;
	const originY = context.canvas.height;
	const valueInterval = originY / 10;

	let lastX, lastY;
	if(status == 'Waiting') {
		lastX = xStartPosition;
		lastY = originY - 85;
	}
	else {
		let vx = calculateXI(timeElapsed / 1000) * (xMaxPosition - xStartPosition) / 10;
		let vy = canvas.height - calculateYI(Number(multiplier)) * valueInterval;
		vx = vx < 0 ? 0 : vx;
		vy = vy < 0 ? 0 : vy;
		vy = vy > originY - 85 ? originY - 85 : vy;
		vx = isNaN(vx) ? 0 : vx;
		lastX = vx + xStartPosition;
		lastY = vy;
	}	

	return {lastX, lastY};
}

function drawLoad(
	context: CanvasRenderingContext2D,
	timeElapsed: number,
	x: number,
	y: number,
) {

	context.strokeStyle = '#707070';  // Red line  
	context.lineWidth = 8;
	context.beginPath();

	context.moveTo(x-5, y);  // Start point (x, y)  

	const t = aa * x + bb;
	const yy = context.canvas.height - t;
	context.lineTo(x-5, yy);  // End point (x, y)  

	context.stroke();

	context.translate(x - loadWidth/2, y - loadHeight/2);
	context.drawImage(loadImage, 0, 0, loadWidth, loadHeight);
	
	
}	

function drawCrashedLoad(
	context: CanvasRenderingContext2D,
	crashedTime: number,
	x: number,
	y: number,
) {
	let newY = y;  
	context.strokeStyle = '#707070';  // Red line  
	context.lineWidth = 8;
	context.beginPath();

	context.moveTo(x-5, y-60);  // Start point (x, y)  

	const t = aa * x + bb;
	const yy = context.canvas.height - t;
	context.lineTo(x-5, yy);  // End point (x, y)  

	context.stroke();

    if (crashedTime < 1000) {  
        const canvasHeight = context.canvas.height;  
        const maxTravelDistance = canvasHeight - y - 80;  // Maximum distance the image can move downward  
        newY += maxTravelDistance * (crashedTime / 1000); // Interpolate position  

		context.translate(x - loadWidth/2,  newY - loadHeight/2);
		context.drawImage(loadImage, 0, 0, loadWidth, loadHeight);
		context.translate(-(x - loadWidth/2),  -(newY - loadHeight/2)); 		
    } 
	else {
		context.translate(x - loadWidth/2,  context.canvas.height-80-loadHeight/2);
		context.drawImage(explodeImage, 0, 0, loadWidth, loadHeight);
	}
}

export default function Game() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<any>(null);

	const gameState = useGameStore((gameState: GameState) => gameState);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const aspectRatio = canvas.clientWidth / canvas.clientHeight;			
			canvas.width = 4000;
			canvas.height = 2000;//Math.round(4000 * aspectRatio);
		}
		setContext(ctx);
	}, []);

	const doRender = () => {
		render(
			gameState,
			context
		);
	}

	useEffect(() => {
		const frame = requestAnimationFrame(doRender);
		return () => cancelAnimationFrame(frame);
	}, [context, gameState]);

	return (
		<canvas className={styles.Game} ref={canvasRef}></canvas>
	);
}
