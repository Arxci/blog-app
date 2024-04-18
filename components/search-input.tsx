'use client'

import { ChangeEvent, useState } from 'react'

import { Input } from './ui/input'
import { Button } from './ui/button'

import { Icons } from './icons'

export const SearchInput = () => {
	const [search, setSearch] = useState<string>('')

	const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	return (
		<div className=" w-full">
			<form className="grid grid-cols-[1fr_auto] gap-2 w-full">
				<div className="group">
					<div className="border border-input rounded-full group-hover:bg-muted focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
						<div className="px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
							<Icons.search className="text-muted-foreground group-focus-within:text-foreground" />
							<label
								htmlFor="search"
								className="sr-only"
							>
								Search for an article
							</label>
							<Input
								id="search"
								type="text"
								name="search"
								autoComplete="off"
								placeholder="Search..."
								className="bg-transparent border-none placeholder:text-lg text-lg px-0 focus-visible:ring-offset-0 focus-visible:ring-0"
								value={search}
								onChange={inputChangeHandle}
							/>
							{search && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="p-0 w-auto h-auto flex items-center justify-center   "
								>
									<Icons.cross className="text-muted-foreground hover:text-muted-foreground/80 group-focus-within:text-foreground group-focus-within:hover:text-foreground/80" />
									<span className="sr-only">Clear search</span>
								</Button>
							)}
						</div>
					</div>
				</div>
				<Button
					type="submit"
					radius="full"
				>
					Search
				</Button>
			</form>
		</div>
	)
}
