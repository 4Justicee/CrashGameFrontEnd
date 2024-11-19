"use client"

import { PropsWithChildren } from 'react';

export type RootProviderProps = PropsWithChildren;

export default function RootProvider({
	children
}: RootProviderProps) {
	return (

		<>{children}</>

	);
}
