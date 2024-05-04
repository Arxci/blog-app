import Link from 'next/link'

import { SignUpForm } from '@/app/(auth)/sign-up/_components/forms/sign-up-form'
import { PageSectionContainer } from '@/components/layout/page-section-container'
import { WrapperCard } from '../_components/wrapper-card'

export default function SignUpPage() {
	return (
		<main className="flex h-full items-center">
			<PageSectionContainer>
				<WrapperCard
					title={'Sign up'}
					subtext={'Enter your email below to create an account'}
					footer={
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<Link
								href="/sign-in"
								className="underline"
							>
								Sign in
							</Link>
						</div>
					}
				>
					<SignUpForm />
				</WrapperCard>
			</PageSectionContainer>
		</main>
	)
}
