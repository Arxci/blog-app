import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { visit } from 'unist-util-visit'
import prismaDB from './lib/prisma'

const computedFields = <T extends { slug: string }>(data: T) => ({
	...data,
	slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const posts = defineCollection({
	name: 'Post',
	pattern: 'blog/**/*.mdx',
	schema: s
		.object({
			slug: s.path(),
			title: s.string().max(99),
			description: s.string().max(999).optional(),
			date: s.isodate(),
			published: s.boolean().default(true),
			tags: s.array(s.string()).optional(),
			banner: s.string(),
			body: s.mdx(),
			isFeatured: s.boolean().default(false),
		})
		.transform(computedFields),
})

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { posts },
	mdx: {
		rehypePlugins: [
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === 'element' && node?.tagName === 'pre') {
						const [codeEl] = node.children

						if (codeEl.tagName !== 'code') return

						node.raw = codeEl.children?.[0].value
					}
				})
			},
			rehypeSlug,
			[rehypePrettyCode, { theme: 'one-dark-pro' }],
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap',
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section',
					},
				},
			],
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === 'element' && node?.tagName === 'figure') {
						const preElement = node.children.at(-1)

						if (preElement.tagName !== 'pre') return

						preElement.properties['raw'] = node.raw
					}
				})
			},
		],
		remarkPlugins: [],
	},
	complete: async (data) => {
		const { posts } = data

		// Add local MDX file to DB
		for (let i = 0; i < posts.length; i++) {
			const post = posts[i]

			if (post) {
				await prismaDB.post.upsert({
					create: { id: post.slug, slug: post.slug },
					update: {},
					where: { slug: post.slug },
				})
			}
		}

		// Delete locally removed MDX files from the DB
		const postsSlugs = posts.map((post) => post.slug)

		await prismaDB.post.deleteMany({
			where: {
				slug: {
					notIn: postsSlugs,
				},
			},
		})
	},
})
