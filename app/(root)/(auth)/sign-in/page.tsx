import { SignInForm } from '@/app/(root)/(auth)/sign-in/_components/forms/sign-in-form'
import { PageSectionContainer } from '@/components/page-section-container'

export default function SignInPage() {
	return (
		<main>
			<PageSectionContainer>
				<SignInForm />
			</PageSectionContainer>
		</main>
	)
}
