import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/blog';
import slugify from 'slugify';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
	const _req = await req.json(); // req.body
	await dbConnect();

	try {
		const { title, content, category, image } = _req;
		switch (true) {
			case !title:
				return NextResponse.json({ err: 'Title is required' }, { status: 400 });
			case !content:
				return NextResponse.json(
					{ err: 'Content is required' },
					{ status: 400 }
				);
			case !category:
				return NextResponse.json(
					{ err: 'Category is required' },
					{ status: 400 }
				);
				// check if blog with title already exists
				const existingBlog = await Blog.findOne({ slug: slugify(title) });
				if (existingBlog) {
					return NextResponse.json(
						{ err: 'Blog title is taken' },
						{ status: 409 }
					);
				}
		}
		// create blog
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});
		const blog = await Blog.create({
			title,
			content,
			category,
			image: image || null,
			postedBy: token.user._id,
			slug: slugify(title),
		});

		return NextResponse.json(blog, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				err: err.message,
			},
			{
				status: 500,
			}
		);
	}
}
