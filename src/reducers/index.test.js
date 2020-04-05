import reducers, {
	setScrollPosition,
	requestList,
	requestDetail,
	succeedDetail,
	failure,
} from '.';

function setScrollPositionAction (position) {
	const state = reducers(undefined, {});
	return reducers(state, setScrollPosition(position));
}
function requestListAction () {
	const state = reducers(undefined, {});
	return reducers(state, requestList());
}
function requestDetailAction () {
	const state = reducers(undefined, {});
	return reducers(state, requestDetail());
}
function succeedDetailAction (data) {
	const state = reducers(undefined, {});
	return reducers(state, succeedDetail(data));
}
function failureAction (error) {
	const state = reducers(undefined, {});
	return reducers(state, failure(error));
}

describe('reducers', () => {
	it('return default state', () => {
		expect(reducers(undefined, {})).toEqual({
			data: [],
			totalPage: 0,
			currentPage: 1,
			scrollPosition: 0,
			selectedData: null,
			loading: false,
			error: null,
		});
	});
  
	it('return correct actions', () => {
		expect(setScrollPosition.toString()).toEqual('ACTIONS/SET_SCROLL_POSITION');
		expect(requestList.toString()).toEqual('ACTIONS/REQUEST_LIST');
		expect(requestDetail.toString()).toEqual('ACTIONS/REQUEST_DETAIL');
		expect(succeedDetail.toString()).toEqual('ACTIONS/SUCCEED_DETAIL');
		expect(failure.toString()).toEqual('ACTIONS/FAILURE');
	});
	
	it('call setScrollPosition action', () => {
		expect(setScrollPositionAction(278)).toMatchObject({
			scrollPosition: 278
		});
	});

	it('call requestList action', () => {
		expect(requestListAction()).toMatchObject({
			data: [],
			loading: true,
			error: null
		});
	});
  
	it('call requestDetail action', () => {
		expect(requestDetailAction()).toMatchObject({
			selectedData: {},
			loading: true,
			error: null
		});
	});
  
	it('set selectedData when succeedDetail action called', () => {
		expect(succeedDetailAction({ data1: 'data2' })).toMatchObject({
			selectedData: { data1: 'data2' },
			loading: false,
			error: null
		});
	});
  
	it('set error when failure called', () => {
		expect(failureAction('error')).toMatchObject({
			loading: false,
			error: 'error'
		});
	});
});
