import { notFound } from 'next/navigation'
import Image from 'next/image'

import { posts } from '#site/content'

import { MDXContent } from '@/components/mdx/mdx-components'

import { getPostBySlug, getPostEngagement } from '@/app/_server/actions/post'
import { formatDate } from '@/lib/utils'

import { PostEngagement } from '@/components/post/post-engagement'
import { PostAuthor } from '@/components/post/post-author'

import { auth } from '@/auth'

interface PostPageProps {
	params: {
		slug: string[]
	}
}

async function getPostFromParams(params: PostPageProps['params']) {
	const slug = params?.slug?.join('/')

	const post = await getPostBySlug({
		slug: `blog/${slug}`,
		include: { comments: true, likes: true, dislikes: true },
	})

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
			<div className="relative aspect-video overflow-hidden ">
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
					<div className="flex items-center ">
						<PostAuthor />
						<div
							aria-label="Published on"
							className="flex ml-auto text-sm text-muted-foreground items-center "
						>
							<time
								dateTime={post.date}
								className=""
							>
								{formatDate(post.date)}
							</time>
						</div>
					</div>
					<h1 className="mb-2 font-black text-3xl md:text-4xl lg:text-5xl">
						{post.title}
					</h1>
					{post.description ? (
						<p className="text-lg mt-0 text-muted-foreground">
							{post.description}
						</p>
					) : null}
					<PostEngagement
						initialData={initialData}
						user={user}
					/>
				</div>

				<hr className="my-4 pb-6" />
				<MDXContent code={post.body} />
			</article>
		</div>
	)
}
