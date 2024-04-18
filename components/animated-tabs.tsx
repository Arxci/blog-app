'use client'

import { KeyboardEvent, useState, createRef, useMemo, RefObject } from 'react'

import { motion } from 'framer-motion'

import { Button } from './ui/button'

export const AnimatedTabs = ({
	tabs,
}: {
	tabs: { id: string; label: string }[]
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
		<div>
			<div className="flex gap-1">
				{tabs.map((tab, i) => (
					<Button
						ref={buttonRefs[i]}
						variant="outline"
						data-state={activeTab === i ? 'active' : 'inactive'}
						key={i}
						tabIndex={activeTab === i ? undefined : -1}
						onClick={() => buttonClickHandle(i)}
						onKeyDown={keyDownHandle}
						className="data-[state=active]:text-primary-foreground border-transparent data-[state=inactive]:hover:border-input relative bg-transparent "
						radius="full"
					>
						{activeTab === i && (
							<motion.div
								layoutId="active-pill"
								className="bg-primary absolute inset-0"
								style={{ borderRadius: 9999 }}
							/>
						)}

						<span className="relative z-10">{tab.label}</span>
					</Button>
				))}
			</div>
		</div>
	)
}
