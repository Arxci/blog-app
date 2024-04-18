'use client'

import { KeyboardEvent, useState, createRef, useMemo, RefObject } from 'react'

import { motion } from 'framer-motion'

export const AnimatedTabs = ({
	tabs,
}: {
	tabs: { id: string; label: string; icon: React.ReactNode }[]
}) => {
	const [activeTab, setActiveTab] = useState(0)
	const buttonRefs = useMemo<
		Array<RefObject<HTMLButtonElement> | undefined>
	>(() => {
		return tabs.map(() => createRef())
	}, [])

	const keyDownHandle = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'ArrowRight') {
			setActiveTab((prevTab) => {
				var newTab = prevTab < tabs.length - 1 ? prevTab + 1 : 0

				buttonRefs[newTab]?.current?.focus()
				return newTab
			})
		}
		if (e.key === 'ArrowLeft') {
			setActiveTab((prevTab) => {
				var newTab = prevTab > 0 ? prevTab - 1 : tabs.length - 1

				buttonRefs[newTab]?.current?.focus()

				return newTab
			})
		}
	}

	const buttonClickHandle = (id: number) => {
		setActiveTab(id)
	}

	return (
		<div
			className="flex space-x-1"
			role="tablst"
		>
			{tabs.map((tab, i) => (
				<button
					role="tab"
					aria-selected={activeTab === i}
					ref={buttonRefs[i]}
					data-state={activeTab === i ? 'active' : 'inactive'}
					key={i}
					tabIndex={activeTab === i ? undefined : -1}
					onClick={() => buttonClickHandle(i)}
					onKeyDown={keyDownHandle}
					className={
						'relative rounded-full px-4 py-2 text-sm font-medium text-white transition [&>*]:data-[state=inactive]:hover:text-muted-foreground/60 [&>*]:data-[state=inactive]:text-muted-foreground flex gap-1 items-center'
					}
				>
					{activeTab === i && (
						<motion.div
							layoutId="active-pill"
							className="bg-black absolute inset-0"
							style={{ borderRadius: 9999 }}
						/>
					)}
					{tab.icon}
					<span className="z-10 relative mix-blend-exclusion">{tab.label}</span>
				</button>
			))}
		</div>
	)
}
