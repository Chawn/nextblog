import blog from '@/models/blog';
import React from 'react';
import BlogCard from '@/components/blogs/BlogCard';

export default function BlogList({ blogs }) {
	return (
		<div className='container mb-5'>
			<div className='row'>
				{blogs?.map(b => (
					<div className='col-lg-4'>
						<BlogCard key={b._id} blog={b} />
					</div>
				))}
			</div>
		</div>
	);
}
