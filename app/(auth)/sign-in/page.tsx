import Link from 'next/link'

import { SignInForm } from '@/app/(auth)/sign-in/_components/forms/sign-in-form'
import { PageSectionContainer } from '@/components/layout/page-section-container'
import { WrapperCard } from '../_components/wrapper-card'

export default function SignInPage() {
	return (
		<main className="py-8">
			<PageSectionContainer>
				<WrapperCard
					title={'Sign in'}
					subtext={'Enter your email below to sign in to your account'}
					footer={
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link
								href="/sign-up"
								className="underline"
							>
								Sign up
							</Link>
						</div>
					}
				>
					<SignInForm />
				</WrapperCard>
			</PageSectionContainer>
		</main>
	)
}

/*

*/
