import queryString from 'query-string';
import { NextResponse } from 'next/server';
import Link from 'next/link';
import BlogList from '@/components/blogs/BlogList';

async function getBlogs(searchParams) {
	const urlParams = {
		page: searchParams.page || 1,
	};
	const searchQuery = new URLSearchParams(urlParams).toString();
	// console.log('searchQuery => ', searchQuery);
	const response = await fetch(`${process.env.API}/blog?${searchQuery}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 1,
		},
	});

	if (!response.ok) {
		console.log('Failed to fetch blogs =>', response);
		throw new Error('Failed to fetch blogs');
	}

	const data = await response.json();
	return data;
}

export default async function Home({ searchParams }) {
	const data = await getBlogs(searchParams);
	const { blogs, totalPages, currentPage } = data;
	// console.log('data in homepage => ', data);

	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	return (
		<div className='container py-4'>
			<p className='lead text-primary text-center'>Latest Blogs</p>
			<BlogList blogs={blogs} />
			{/* <pre>{JSON.stringify(data, null, 4)}</pre> */}

			<div className='d-flex justify-content-center'>
				<nav aria-label='Page naviation'>
					<ul className='pagination'>
						{hasPreviousPage && (
							<li className='page-item'>
								<Link
									className='page-link px-3'
									href={`?page=${currentPage - 1}`}
								>
									Previous
								</Link>
							</li>
						)}

						{Array.from({ length: totalPages }, (_, i) => {
							const page = i + 1;
							return (
								<li
									key={i}
									className={`page-item ${
										currentPage === page ? 'active' : ''
									}`}
								>
									<Link className='page-link' href={`?page=${page}`}>
										{page}
									</Link>
								</li>
							);
						})}

						{hasNextPage && (
							<li className='page-item'>
								<Link
									className='page-link px-3'
									href={`?page=${currentPage + 1}`}
								>
									Next
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
}
