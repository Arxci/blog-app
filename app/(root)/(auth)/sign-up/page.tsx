import { SignUpForm } from '@/app/(root)/(auth)/sign-up/_components/forms/sign-up-form'
import { PageSectionContainer } from '@/components/page-section-container'

export default function SignUpPage() {
	return (
		<main>
			<PageSectionContainer>
				<SignUpForm />
			</PageSectionContainer>
		</main>
	)
}
