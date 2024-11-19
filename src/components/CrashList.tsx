"use client";

import styles from '../styles/components/CrashList.module.css';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useGameStore, CrashedGame } from '../store/gameStore';

export type CrashListProps = {}

export default function CrashList({}: CrashListProps) {
	const crashes = useGameStore((gameState) => gameState.crashes);
	
	
	return (
		<div className={styles.CrashList} style={{width:"100%", overflowX:'auto', padding:'5px'}}>
			{crashes.map((crash: CrashedGame, idx) =>
				<HoverCard key={idx}>
					<HoverCardTrigger>
						<div className={styles.CrashListItem}>
							{ crash.multiplier }x
						</div>
					</HoverCardTrigger>
					<HoverCardContent>
						<div className={styles.CrashStats}>
							<span>Date:</span>
							<span>{new Date(crash.startTime).toISOString().substr(0,19).replace("T"," ")}</span>
							<span>Hash:</span>
							<span className='break-word'>{crash.hash}</span>
							<span>Duration:</span>
							<span>{Number(crash.duration/1000).toFixed(2)} secs</span>
							<span>Mulitplier:</span>
							<span>{crash.multiplier}x</span>
							<span>Winners:</span>
							<span>{crash.winners}/{crash.players}</span>
						</div>
					</HoverCardContent>
				</HoverCard>
			)}
		</div>
	);
}
