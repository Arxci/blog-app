import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
	image: string | undefined
	alt: string
	initials: string | undefined
}

export const UserAvatar = ({ image, alt, initials }: UserAvatarProps) => {
	return (
		<Avatar className="h-9 w-9">
			<AvatarImage
				src={image}
				alt={alt ?? ''}
			/>
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	)
}
