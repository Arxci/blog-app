'use client'

import Link from 'next/link'

import { User } from 'next-auth'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Icons } from './icons'
import { UserAvatar } from './user-avatar'
import { MouseEvent, useState, useTransition } from 'react'

import { signOut } from 'next-auth/react'

interface UserButtonProps {
	user: User
}

export function UserButton({ user }: UserButtonProps) {
	const [open, setOpen] = useState(false)
	const [loading, startTransition] = useTransition()

	const initials = user.name?.slice(0, 2).toLocaleUpperCase()
	const email = user.email

	const confirmDialogHandle = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		startTransition(async () => {
			await signOut()
		})
	}

	return (
		<>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will sign you out of your account.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={loading}
							onClick={confirmDialogHandle}
						>
							{loading ? (
								<Icons.spinner
									className="animate-spin h-4 w-4"
									aria-hidden="true"
								/>
							) : (
								<span>Continue</span>
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="secondary"
						className="relative h-9 w-9 rounded-full"
					>
						<UserAvatar
							image={user.image || undefined}
							alt={user.name ?? ''}
							initials={initials}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56"
					align="end"
					loop
				>
					<DropdownMenuLabel className="font-normal flex space-x-2 items-center">
						<UserAvatar
							image={user.image || undefined}
							alt={user.name ?? ''}
							initials={initials}
						/>
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{user.name}</p>
							<p className="text-xs leading-none text-muted-foreground">
								{email}
							</p>
						</div>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="w-full transition-none"
						onClick={() => setOpen(true)}
					>
						<Icons.logOut
							className="mr-2 h-4 w-4"
							aria-hidden="true"
						/>
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
