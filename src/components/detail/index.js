/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * @summary
 * Upon clicking on the post title on the front page, it will bring you to the single post page.
 *
 * @todo
 * [x] Example: https://id.techinasia.com/cashlez-fabelio-fitur-baru-bayar-furnitur
 * [x] API Endpoint: https://id.techinasia.com/wp-json/techinasia/3.0/posts/cashlez-fabelio-fitur-baru-bayar-furnitur
 */

import React, { useEffect, useRef } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import ErrorIcon from '../../assets/ErrorIcon';
import ArrowUpIcon from '../../assets/ArrowUpIcon';

import { requestDetail } from '../../reducers';

import './detail.css';

function DetailContent() {
	const startRef = useRef(null);

	const dispatch = useDispatch();

	// get slugId from router params
	const { slugId } = useParams();

	// use the following global states from redux
	const { selectedData, loading, error: errorData } = useSelector(
		(state) => state
	);

	useEffect(() => {
		// call action `requestDetail` by `slugId`
		dispatch(requestDetail(slugId));
	}, [dispatch, slugId]);

	const scrollToBottom = () => {
		startRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	if (loading) {
		return (
			<div className='container' style={{ marginTop: '5rem' }}>
				<p>Memuat . . .</p>
			</div>
		);
	}

	if (errorData) {
		return (
			<div className='container' style={{ marginTop: '5rem' }}>
				<ErrorIcon /> Tidak dapat memuat post
			</div>
		);
	}

	return (
		<>
			<div className='container'>
				{selectedData !== null && (
					<>
						<Helmet>
							<title>nanoTIA | {selectedData.seo.title}</title>
							<meta
								name='og:title'
								property='og:title'
								content={selectedData.seo.title}
							></meta>
							<meta name='description' content={selectedData.seo.description} />
						</Helmet>

						<div ref={startRef} />

						<div
							className='jumbotron-fluid'
							style={{ padding: '5rem 1rem 1rem' }}
						>
							<div className='container'>
								<h1 className='display-4'>
									{React.createElement('div', {
										dangerouslySetInnerHTML: { __html: selectedData.title },
									})}
								</h1>

								<p className='lead'>
                  By &nbsp;
									{selectedData.author.author_url.length > 0 ? (
										<a href={selectedData.author.author_url}>
											{selectedData.author.display_name}
										</a>
									) : (
										selectedData.author.display_name
									)}
								</p>
							</div>
						</div>

						{selectedData.featured_image &&
              selectedData.featured_image.source.length > 0 && (
							<img
								className='banner'
								src={selectedData.featured_image.source}
								alt={selectedData.featured_image.title}
							/>
						)}

						{React.createElement('article', {
							dangerouslySetInnerHTML: { __html: selectedData.content },
						})}
					</>
				)}
			</div>

			{selectedData ? (
				<button
					className='btn btn-outline-secondary scroll-top'
					type='button'
					id='button-addon1'
					onClick={scrollToBottom}
				>
					<ArrowUpIcon />
				</button>
			) : (
				<p>Post kosong atau sudah dihapus</p>
			)}
		</>
	);
}

export default withRouter(DetailContent);
