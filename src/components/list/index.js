/**
 * @summary
 * Shows a list of posts with title and a snippet of the post content
 *
 * @todo
 * [x] Example: https://id.techinasia.com/category/startups
 * [x] API Endpoint: https://id.techinasia.com/wp-json/techinasia/3.0/categories/startups/posts?page=1&per_page=5
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIcon from '../../assets/ErrorIcon';

import { requestList } from '../../reducers';

import './list.css';

function ListContent() {
	const history = useHistory();

	const dispatch = useDispatch();

	const { data, loading, error: errorContent } = useSelector((state) => state);

	useEffect(() => {
		dispatch(requestList());
	}, [dispatch]);

	const convertDate = (timestamp) => {
		const date = new Date(timestamp).toUTCString();
		return date;
	};

	if (loading) {
		return (
			<div className='container' style={{ marginTop: '5rem' }}>
				<p>Memuat . . .</p>
			</div>
		);
	}

	if (errorContent) {
		return (
			<div className='container' style={{ marginTop: '5rem' }}>
				<ErrorIcon /> Tidak dapat memuat data
			</div>
		);
	}

	return (
		<>
			<div className='container' style={{ marginTop: '5rem' }}>
				<div className='cards'>
					{data.length > 0 ? (
						data.map((post, index) => (
							<div
								className='card justify-content-center'
								key={`post_${index}`}
								style={{ margin: '2rem' }}
							>
								<div className='card-body'>
									{post.featured_image &&
                    post.featured_image.source.length > 0 && (
										<img
											className='card-img-top'
											src={post.featured_image.source}
											alt={post.featured_image.title}
										/>
									)}

									<div className='card-content'>
										<h5
											className='card-title'
											role='button'
											style={{ cursor: 'pointer' }}
											onClick={() => history.push(`/${post.slug}`)}
										>
											{React.createElement('div', {
												dangerouslySetInnerHTML: { __html: post.title },
											})}
										</h5>

										<p className='card-text'>
											{React.createElement('span', {
												dangerouslySetInnerHTML: { __html: post.excerpt },
											})}
										</p>

										<p className='card-text'>
											<small className='text-muted'>
												{post.author.author_url.length > 0 ? (
													<a href={post.author.author_url}>
														{post.author.display_name}
													</a>
												) : (
													post.author.display_name
												)} - {convertDate(post.date)}
											</small>
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Belum ada saat ini</p>
					)}
				</div>

				{/* <nav
					aria-label='pagination'
					style={{ marginTop: '3rem', marginBottom: '5rem' }}
				>
					<ul className='pagination justify-content-center'>
						<li className='page-item disabled'>
							<a className='page-link' href='#' aria-label='Previous'>
								<span aria-hidden='true'>&laquo;</span>
								<span className='sr-only'>Previous</span>
							</a>
						</li>
						<li className='page-item disabled'>
							<span className='page-link'>1</span>
						</li>
						<li className={`page-item ${posts.length !== 0 ? '' : 'disabled'}`}>
							<a className='page-link' href='#' aria-label='Next'>
								<span aria-hidden='true'>&raquo;</span>
								<span className='sr-only'>Next</span>
							</a>
						</li>
					</ul>
				</nav> */}
			</div>
		</>
	);
}

export default ListContent;
