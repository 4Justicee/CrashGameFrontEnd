"use client"

import { io } from "socket.io-client";

import { jwtDecode } from 'jwt-decode';

import { create } from "zustand";

import { elapsedToMultiplier } from '../lib/utils';

import Cookies from 'js-cookie';  
import { toast } from "sonner";

export type GameStatus =
	'Unknown'
	| 'Waiting'
	| 'Running'
	| 'Stopped'
	| 'Crashed';

export type JwtToken = {
	exp: number;
	nbf: number;
	wallet: string;
}

export type Bet = {
	wallet: string;
	uid: number,
	betAmount: string;
	currency: string;
	autoCashOut: string;
	cashOut: string;
	cashOutTime: Date;
	isCashedOut: boolean;
	winnings: string;
}

export type CashedUser = {
	userCode: string;
	cashOut: string;
	winTime: number;
}

export type CrashedGame = {
	id: string;
	duration: number,
	multiplier: string;
	players: number;
	winners: number;
	startTime: number;
	roundId: number;
	hash: string;
}

export type Balance = {
	user_id: number;
	currency: string;
	balance: number;
}

export type GameStateData = {
	gameId: string|null,
	status: GameStatus,
	players: Bet[],
	cashOutUsers: CashedUser[],
	waiting: Bet[],
	totalPlayers: number,
	startTime: number,
	crashedTime: number,
	winTime: number,
	isConnected: boolean,
	isLoggedIn: boolean,
	isWaiting: boolean,
	isPreparing: boolean,
	isPlaying: boolean,
	isCashedOut: boolean,
	autoBetCount: number,
	timeRemaining: number,	
	timeElapsed: number,
	timeCrashElapsed:number,
	multiplier: string,
	crashes: CrashedGame[],
	balances: Balance[],
	selectedCurrency: string,
	wallet: string|null,
	myWin: number, //0-not participate, 1-not win, 2-win
	uid: number,
	errors: string[],
	errorCount: number,
}

export type GameActions = {
	authenticate: (message: string, signature: string) => void;
	login: () => void;
	getNonce: () => Promise<string>;
	placeBet: (betAmount: string, autoCashOut: string, currency: string) => void;
	placeAutoBet: (betAmount: number, autoCashOut: number, currency: string, autoCount: number) => void;
	cashOut: () => void;
	cancelBet: () => void;
	cancelAutoBet: () => void;
	setCurrency: (currency:string) => void;
}

export type GameState = GameStateData & { actions: GameActions };

const initialState : GameStateData = {
	gameId: null,
	status: 'Unknown',
	players: [],
	cashOutUsers: [],
	waiting: [],
	totalPlayers: 0,
	startTime: 0,
	crashedTime : 0,
	winTime : 0,
	isConnected: false,
	isLoggedIn: false,
	isWaiting: false,
	isPreparing: false,
	isPlaying: false,
	isCashedOut: false,
	autoBetCount : 0,
	timeRemaining: 0,
	timeElapsed: 0,
	timeCrashElapsed: 0,
	multiplier: '0',
	crashes: [],
	balances:[],
	selectedCurrency:"BTC",
	wallet: null,
	myWin: 0,
	uid: 0,
	errors: [],
	errorCount: 0,
};

type NonceResponse = {
	nonce: string;
}

export const useGameStore = create<GameState>((set, get) => {
	const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL!);

	let gameWaitTimer: ReturnType<typeof setInterval>|null = null;
	let gameRunTimer: ReturnType<typeof setInterval>|null = null;
	let crashRunTimer: ReturnType<typeof setInterval>|null = null;

	const crashTimer = () => {
		const {crashedTime, status} = get();
		const timeElapsed = Math.round(new Date().getTime() - crashedTime);

		if (status != 'Crashed') {
			if (crashRunTimer) {
				clearInterval(crashRunTimer);
				crashRunTimer = null;

				set({
					timeCrashElapsed : 0,				
				});
			}
		} else {
			set({
				timeCrashElapsed : timeElapsed,				
			});
		}
	}

	socket.onopen = function () {
		//console.log('Socket connected');

		const token = Cookies.get('token') ?? null;

		if (token !== null)
			actions.login();

		set({ isConnected: true });
	};

	socket.onclose = function() {
		//console.log('Socket disconnected');
		set({ isConnected: false });
	};

	socket.onmessage = function(event) {
		//console.log('Message from server ', event.data);  

		const data = JSON.parse(event.data);  
		const params = data.params;
		
		if (data.type === 'GameWaiting') {  
			//console.log('Game in waiting state')		

			set({
				status: 'Waiting',
				startTime: params.startTime,
				timeElapsed: 0,
				myWin: 0,
				winTime: 0,
				isPreparing : false,
				multiplier : '0',
				cashOutUsers: [],
			});

			if (gameWaitTimer) {
				clearInterval(gameWaitTimer);
				gameWaitTimer = null;
			}

			//gameWaitTimer = setInterval(gameWaiter, 1000);
		}
		else if(data.type == 'g') {
			set({
				multiplier: params.m.toFixed(2),
				timeElapsed: params.e
			});
		}
		else if(data.type == 'r') {
			set({
				timeRemaining: params.t,
			});
		}
		else if(data.type == "GameRunning") {
			set({
				startTime: params.startTime,
				status: 'Running',
				timeRemaining:0,
			});

			if (gameWaitTimer) {
				clearInterval(gameWaitTimer);
				gameWaitTimer = null;
			}

			if (gameRunTimer) {
				clearInterval(gameRunTimer);
				gameRunTimer = null;
			}
		}
		else if(data.type == "GameCrashed") {
			const { players, crashes, uid } = get();			

			set({
				//players,
				status: 'Crashed',
				crashedTime: Date.now(),
				crashes: crashes.length >= 36   
					? [...crashes.slice(1), params.game]  // Remove the first element and add the new game at the end  
					: [...crashes, params.game], 
				timeElapsed: params.game.duration,
			});

			if (gameWaitTimer) {
				clearInterval(gameWaitTimer);
				gameWaitTimer = null;
			}

			if (gameRunTimer) {
				clearInterval(gameRunTimer);
				gameRunTimer = null;
			}
			
			if (crashRunTimer) {
				clearInterval(crashRunTimer);
				crashRunTimer = null;
			}

			crashRunTimer = setInterval(crashTimer, 50);
		}
		else if(data.type == "BetList") {
			//console.log('Received bet list')
			const params = data.params;
			const { uid } = get();
			const playing = params.players.find((player: Bet) => player.uid == uid);
			const waiting = params.waiting.find((player: Bet) => player.uid == uid);
			const playerInList = playing ?? waiting;

			set({
				players: params.players,
				waiting: params.waiting,
				totalPlayers: params.totalPlayers,
				isWaiting: !!waiting,
				isPlaying: !!playing,
				isCashedOut: !!playerInList?.isCashedOut,
			});
		}
		else if(data.type == "PlayerWon") {		
			const { players, cashOutUsers, uid } = get();
			const index = players.findIndex((player) => player.uid == params.uid);
			if (index != -1) {
				const newPlayers = [...players];

				newPlayers[index].isCashedOut = true;
				newPlayers[index].cashOut = params.multiplier;
				newPlayers[index].cashOutTime = new Date();

				const cash_users = [...cashOutUsers];
				cash_users.push({
					userCode:'Hidden',
					cashOut: params.multiplier,
					winTime: params.time
				});
				
				if (uid == params.uid) {		
					set({ players: newPlayers, cashOutUsers: cash_users, isCashedOut: true, balances: params.balance, myWin:2, winTime:Date.now() });
				} else {
					set({ players: newPlayers, cashOutUsers: cash_users });
				}
			}
		}				
		else if(data.type == "authenticate") {
			if (params?.success && params?.token) {
				//console.log(`Token: ${params.token}`);
				Cookies.set('token', params.token, {expires:365*20, path:''});
				actions.login();
			}
		}
		else if(data.type == "login") {
			if (params?.success)
				set({ isLoggedIn: true, uid: params.uid, balances: params.balance});
			else
				set({ isLoggedIn: false, uid: 0});
		}
		else if(data.type == "placeBet") {
			if (!params?.success) {
				const { errorCount, errors } = get();
				const error = 'Error placing bet';
				set({
					errors: [
						...(errors.length <= 5 ? errors : errors.slice(0, 5)),
						error
					],
					errorCount: errorCount + 1,
				});
			}
			else {
				set({isPreparing : params.isPreparing == 1, balances: params.balance, myWin: 1})
			}
		}
		else if(data.type == "cancelBet") {
			if (params?.success) {
				set({isWaiting: false, balances: params.balance, myWin:0, isPreparing:false});
			}
		}
		else if(data.type == "autoBet") {
			if (params?.success) {
				toast("⚠️ Autobet started.");
				set({autoBetCount: params.count});
			}			
		}
		else if(data.type == "cancelAutoBet") {
			if (params?.success) {
				toast("⚠️ Auto bet canceled.");
				set({autoBetCount: 0});
			}			
		}
		else if(data.type == "auto_cancel") {
			if (params?.success) {
				toast("⚠️ Can not continue auto bet due to insufficent fund.");
				set({autoBetCount: 0});
			}			
		}
		else if(data.type == "auto_count") {
			if (params?.success) {
				set({autoBetCount: params.count, balances: params.balance});
			}			
		}
	}

	const actions = {
		authenticate: (
			message: string,
			signature: string
		) => {
			//console.log('Authenticating...');

			socket.send(JSON.stringify({
				type: 'authenticate',
				message,
				signature
			}));
		},

		login: () => {
			//console.log('Logging in with token...');

			const token = Cookies.get('token') ?? '';

			if (token !== null) {
				const decoded: JwtToken = jwtDecode(token);

				if (!decoded.wallet)
					return;

				set({ wallet: decoded.wallet });

				socket.send(JSON.stringify({ type:'login', token }));
			}
		},

		getNonce: async (): Promise<string> => {
			const response = await fetch(process.env.NEXT_PUBLIC_REST_URL! + '/nonce');
			const result = await response.json() as NonceResponse;

			if (!result?.nonce)
				throw new Error('Failed to query nonce API');

			return result?.nonce;
		},

		placeBet: (
			betAmount: string,
			autoCashOut: string,
			currency: string
		) => {
			//console.log(`Placing bet ${betAmount} with currency ${currency} and autoCashOut ${autoCashOut}...`);

			const token = Cookies.get('token') ?? '';

			socket.send(JSON.stringify({
				type:'placeBet',
				token,
				betAmount,
				autoCashOut,
				currency
			}));
		},

		placeAutoBet: (betAmount: number, autoCashOut: number, currency: string, autoCount: number ) => {
			const token = Cookies.get('token') ?? '';

			socket.send(JSON.stringify({
				type:'autoBet',
				token,
				betAmount,
				autoCashOut,
				currency,
				autoCount
			}));
		},

		cashOut: () => {
			//console.log(`Cashing out...`);
			
			const token = Cookies.get('token')?? "";
			const { multiplier } = get();

			socket.send(JSON.stringify({
				type:'cashOut',
				token,
				multiplier,
			}));

		},

		cancelBet: () => {
			//console.log(`Cancelling bet...`);

			const token = Cookies.get('token') ?? "";

			socket.send(JSON.stringify({
				type:'cancelBet',
				token,
			}));
		},

		cancelAutoBet: () => {
			//console.log(`Cancelling bet...`);

			const token = Cookies.get('token') ?? "";

			socket.send(JSON.stringify({
				type:'cancelAutoBet',
				token,
			}));
		},

		setCurrency: (currency: string)=>{
			set({selectedCurrency : currency})
		}
	};

	return {
		...initialState,
		actions
	};
});
