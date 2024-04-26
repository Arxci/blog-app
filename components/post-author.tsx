import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export const PostAuthor = () => {
	return (
		<div className="flex items-center gap-1">
			<Avatar className="h-8 w-8 p-0 text-sm">
				<AvatarImage src="" />
				<AvatarFallback>GH</AvatarFallback>
			</Avatar>
			<Link
				href="/about"
				className="text-sm font-semibold"
			>
				Garrett Humbert
			</Link>
		</div>
	)
}
