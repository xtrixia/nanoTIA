/**
 * @summary
 * Shows a list of posts with title and a snippet of the post content
 *
 * @todo
 * [x] Example: https://id.techinasia.com/category/startups
 * [x] API Endpoint: https://id.techinasia.com/wp-json/techinasia/3.0/categories/startups/posts?page=1&per_page=5
 */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import RefreshIcon from '../../assets/RefreshIcon';
import ErrorIcon from '../../assets/ErrorIcon';

import { requestList, setScrollPosition } from '../../reducers';

import './list.css';

function ListContent() {
	const history = useHistory();

	const dispatch = useDispatch();

	const {
		data,
		scrollPosition,
		totalPage,
		currentPage,
		loading,
		error: errorContent,
	} = useSelector((state) => state);

	const [shouldUpdate, setShouldUpdate] = useState(false);

	useEffect(() => {
		if (data.length <= 0) {
			dispatch(requestList());
		}
		window.scrollTo(0, scrollPosition);
	}, []);

	const convertDate = (timestamp) => {
		const date = new Date(timestamp).toUTCString();
		return date;
	};

	const onScroll = () => {
		if (
			window.scrollY > 0 &&
      window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight * 0.9
		) {
			setShouldUpdate(true);
		}
	};

	// useEffect(() => {
	// 	window.scrollTo(0, scrollPosition);
	// }, [scrollPosition]);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	useEffect(() => {
		// check `shouldUpdate` and `currentPage`
		if (!shouldUpdate || currentPage >= totalPage) return;

		// actually fetching
		dispatch(setScrollPosition(window.scrollY));
		dispatch(requestList(currentPage + 1));
		setShouldUpdate(false);
	}, [shouldUpdate]);

	if (loading && data.length === 0) {
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
			<Helmet>
				<title>nanoTIA | Home</title>
				<meta
					name='og:title'
					property='og:title'
					content='nanoTIA | Home'
				></meta>
				<meta
					name='description'
					content='nanoTIA is a dummy Tech in Asia page'
				/>
			</Helmet>

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
											aria-label='button'
											className='card-title'
											role='button'
											style={{ cursor: 'pointer' }}
											onClick={() => {
												dispatch(setScrollPosition(window.scrollY));
												history.push(`/${post.slug}`);
											}}
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
												)}{' '}
                        - {convertDate(post.date)}
											</small>
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Belum ada data saat ini</p>
					)}

					{loading && data.length > 0 && (
						<div className='refresh'>
							<RefreshIcon />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default ListContent;
