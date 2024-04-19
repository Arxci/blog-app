'use client'

import { Dispatch, SetStateAction } from 'react'

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '../ui/button'

import { Icons } from '../icons'

export const SearchDropdown = ({
	options,
	value,
	onValueChanged,
}: {
	options: { id: string; label: string; icon: React.ReactNode }[]
	value: number
	onValueChanged: Dispatch<SetStateAction<number>>
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					radius="full"
				>
					<Icons.filter />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				loop
				className="w-36"
			>
				<DropdownMenuLabel>Filters</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{options.map((option, i) => (
					<DropdownMenuCheckboxItem
						key={option.id}
						className="space-x-1 [&>*]:data-[state=unchecked]:text-foreground cursor-pointer"
						checked={value === i}
						onSelect={(e) => e.preventDefault()}
						onCheckedChange={() => onValueChanged(i)}
					>
						{option.icon}
						<span>{option.label}</span>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
