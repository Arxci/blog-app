'use client'

import { ChangeEvent, useState } from 'react'

import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

import { Icons } from '../../../components/icons'

export const SearchInput = () => {
	const [search, setSearch] = useState<string>('')

	const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const clearInputHandle = () => {
		setSearch('')
	}

	return (
		<div className="w-full">
			<form className="grid sm:grid-cols-[1fr_auto] gap-2 w-full">
				<div className="group">
					<div className="border border-input rounded-full group-hover:bg-muted focus-within:ring-2 focus-within:ring-ring bg-background focus-within:ring-offset-2">
						<div className="pl-3 flex items-center gap-2">
							<Icons.search className="text-muted-foreground group-focus-within:text-foreground  " />
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
								placeholder="Search for a post..."
								className="bg-transparent h-auto border-none placeholder:text-sm text-sm px-0 focus-visible:ring-offset-0 focus-visible:ring-0"
								value={search}
								onChange={inputChangeHandle}
							/>
							{search && (
								<Button
									type="button"
									variant="ghost"
									onClick={clearInputHandle}
									size="icon"
									className="p-0 w-auto h-auto flex items-center justify-center   "
								>
									<Icons.cross className="text-muted-foreground hover:text-muted-foreground/80 group-focus-within:text-foreground group-focus-within:hover:text-foreground/80" />
									<span className="sr-only">Clear search</span>
								</Button>
							)}
							<Button
								type="submit"
								radius="full"
								className="sm:px-6"
							>
								Search
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
