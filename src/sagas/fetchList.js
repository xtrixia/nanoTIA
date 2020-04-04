import { call, put, takeLatest } from 'redux-saga/effects';

import { requestList, succeedList, failure } from '../reducers';

export function* fetchList() {
	try {
		const data = async () => {
			const get = await fetch(
				'https://id.techinasia.com/wp-json/techinasia/3.0/categories/startups/posts?page=1&per_page=5'
			);
			// convert result into json
			const data = await get.json();
			// return converted result
			return data.posts;
		};
		const result = yield call(data);
		yield put(succeedList(result));
	} catch (error) {
		yield put(failure(error.message));
	}
}

export function* watchRequest() {
	yield takeLatest(requestList.toString(), fetchList);
}

export default watchRequest;
