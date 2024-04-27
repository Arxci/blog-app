import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'

import { OAuthSignIn } from '@/app/(root)/(auth)/_components/oauth-signin'

interface WrapperCardProps {
	children: React.ReactNode
	title: string
	subtext: string
	footer: React.ReactNode
}

export const WrapperCard = ({
	children,
	title,
	subtext,
	footer,
}: WrapperCardProps) => {
	return (
		<Card className="mx-auto max-w-sm ">
			<CardHeader className="text-center ">
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription>{subtext}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<OAuthSignIn />
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				{children}

				{footer}
			</CardContent>
		</Card>
	)
}
