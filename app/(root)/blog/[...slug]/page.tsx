import { notFound } from 'next/navigation'

import { posts } from '#site/content'

import { Icons } from '@/components/icons'
import { MDXContent } from '@/components/mdx/mdx-components'

import { getPostEngagement } from '@/lib/post'
import { formatDate } from '@/lib/utils'

import { PostEngagement } from '@/components/post-engagement'

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

	const {
		views,
		_count: { comments, likes, dislikes },
	} = await getPostEngagement(post.slug)

	return (
		<article className="container py-6 max-w-3xl mx-auto overflow-x-hidden">
			<div className="space-y-4">
				<h1 className="mb-2 font-black text-5xl">{post.title}</h1>
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
					<PostEngagement
						viewsFromProps={views}
						commentsFromProps={comments}
						likesFromProps={likes}
						dislikesFromProps={dislikes}
						slug={post.slug}
					/>
				</div>
			</div>
			<hr className="my-4" />
			<MDXContent code={post.body} />
		</article>
	)
}
