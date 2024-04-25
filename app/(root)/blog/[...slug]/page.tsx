import { notFound } from 'next/navigation'
import Image from 'next/image'

import { posts } from '#site/content'

import { Icons } from '@/components/icons'
import { MDXContent } from '@/components/mdx/mdx-components'

import { getPostEngagement } from '@/app/_server/actions/post'
import { formatDate } from '@/lib/utils'

import { PostEngagement } from '@/components/post-engagement'
import { auth } from '@/auth'

interface PostPageProps {
	params: {
		slug: string[]
	}
}

async function getPostFromParams(params: PostPageProps['params']) {
	const slug = params?.slug?.join('/')
	const post = posts.find((post) => post.slugAsParams === slug)

	return post
}

export async function generateStaticParams(): Promise<
	PostPageProps['params'][]
> {
	return posts.map((post) => ({ slug: post.slugAsParams.split('/') }))
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	const session = await auth()
	const user = session?.user

	const initialData = await getPostEngagement(post.slug)

	return (
		<div className="max-w-3xl space-y-4 mx-auto w-screen">
			<div className="relative aspect-video overflow-hidden md:rounded-b-lg">
				<Image
					src={post.banner}
					alt="Banner"
					fill
					priority
					className="object-cover"
				/>
			</div>
			<article className="container overflow-x-hidden">
				<div className="space-y-4 ">
					<h1 className="mb-2 font-black text-3xl md:text-4xl lg:text-5xl">
						{post.title}
					</h1>
					{post.description ? (
						<p className="text-lg mt-0 text-muted-foreground">
							{post.description}
						</p>
					) : null}
					<div className="flex flex-col md:flex-row gap-2">
						<div className="flex gap-2 items-center ">
							<div className="text-md font-semibold">Garrett Humbert</div>

							<div>
								<p className="sr-only">Published On</p>
								<div className="flex text-sm items-center gap-1">
									<Icons.calendar />
									<time dateTime={post.date}>{formatDate(post.date)}</time>
								</div>
							</div>
						</div>
						<div className="md:ml-auto">
							<PostEngagement
								initialData={initialData}
								user={user}
							/>
						</div>
					</div>
				</div>
				<hr className="my-4 pb-6" />
				<MDXContent code={post.body} />
			</article>
		</div>
	)
}
