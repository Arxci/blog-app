import { AuthCardHeader } from './auth-card-header'
import { AuthBackButton } from './auth-back-button'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { AuthCardWrapper } from './auth-card-wrapper'
import { Icons } from '../icons'

export const ErrorCard = () => {
	return (
		<AuthCardWrapper
			headerLabel="Oops! Something went wrong"
			backButtonHref="/sign-in"
			backButtonLabel="Back to sign in"
		>
			<div className="w-full items-center flex justify-center">
				<Icons.triangleAlert className="text-destructive" />
			</div>
		</AuthCardWrapper>
	)
}
