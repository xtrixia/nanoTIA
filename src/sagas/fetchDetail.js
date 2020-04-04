import { call, put, takeLatest } from 'redux-saga/effects';

import { requestDetail, succeedDetail, failure } from '../reducers';

export function* fetchDetail({ payload }) {
	try {
		const data = async () => {
			const get = await fetch(
				`https://id.techinasia.com/wp-json/techinasia/3.0/posts/${payload}`
			);
			// convert result into json
			const data = await get.json();
			// return converted result
			return data.posts[0];
		};
		const result = yield call(data);
		yield put(succeedDetail(result));
	} catch (error) {
		yield put(failure(error.message));
	}
}

export function* watchRequest() {
	yield takeLatest(requestDetail.toString(), fetchDetail);
}

export default watchRequest;
