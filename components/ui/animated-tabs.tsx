'use client'

import {
	KeyboardEvent,
	useState,
	createRef,
	useMemo,
	RefObject,
	Dispatch,
	SetStateAction,
} from 'react'

import { motion } from 'framer-motion'

export const AnimatedTabs = ({
	tabs,
	valueFromProps,
	onChangeFromProps,
}: {
	tabs: { id: string; label: string; icon?: React.ReactNode }[]
	valueFromProps?: number
	onChangeFromProps?: Dispatch<SetStateAction<number>>
}) => {
	const [activeTab, setActiveTab] = useState(0)
	const buttonRefs = useMemo<
		Array<RefObject<HTMLButtonElement> | undefined>
	>(() => {
		return tabs.map(() => createRef())
	}, [])

	const isControlled = typeof valueFromProps != 'undefined'

	const value = isControlled ? valueFromProps : activeTab

	const keyDownHandle = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'ArrowRight') {
			if (onChangeFromProps) {
				onChangeFromProps((prevTab) => {
					var newTab = prevTab < tabs.length - 1 ? prevTab + 1 : 0

					buttonRefs[newTab]?.current?.focus()

					console.log(newTab)

					return newTab
				})
			}

			if (!isControlled) {
				setActiveTab((prevTab) => {
					var newTab = prevTab < tabs.length - 1 ? prevTab + 1 : 0

					buttonRefs[newTab]?.current?.focus()

					return newTab
				})
			}
		}
		if (e.key === 'ArrowLeft') {
			if (onChangeFromProps) {
				onChangeFromProps((prevTab) => {
					var newTab = prevTab > 0 ? prevTab - 1 : tabs.length - 1

					buttonRefs[newTab]?.current?.focus()

					return newTab
				})
			}

			if (!isControlled) {
				setActiveTab((prevTab) => {
					var newTab = prevTab > 0 ? prevTab - 1 : tabs.length - 1

					buttonRefs[newTab]?.current?.focus()

					return newTab
				})
			}
		}
	}

	const buttonClickHandle = (id: number) => {
		if (onChangeFromProps) {
			onChangeFromProps(id)
		}

		if (!isControlled) {
			setActiveTab(id)
		}
	}

	return (
		<div
			className="flex space-x-1"
			role="tablist"
		>
			{tabs.map((tab, i) => (
				<button
					role="tab"
					aria-selected={value === i}
					ref={buttonRefs[i]}
					data-state={value === i ? 'active' : 'inactive'}
					key={i}
					tabIndex={value === i ? undefined : -1}
					onClick={() => buttonClickHandle(i)}
					onKeyDown={keyDownHandle}
					className={
						'relative rounded-full px-4 py-2 text-sm font-medium text-white transition [&>*]:data-[state=inactive]:hover:text-muted-foreground/60 [&>*]:data-[state=inactive]:text-muted-foreground flex gap-1 items-center'
					}
				>
					{value === i && (
						<motion.div
							layoutId="active-pill"
							className="bg-foreground absolute inset-0"
							style={{ borderRadius: 9999 }}
						/>
					)}
					{tab.icon && tab.icon}
					<span className="z-10 relative mix-blend-exclusion">{tab.label}</span>
				</button>
			))}
		</div>
	)
}
