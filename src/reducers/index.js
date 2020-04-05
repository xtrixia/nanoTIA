import { createActions, handleActions } from 'redux-actions';

const initialState = {
	data: [],
	totalPage: 0,
	currentPage: 1,
	scrollPosition: 0,
	selectedData: null,
	loading: false,
	error: null,
};

export const {
	actions: {
		setScrollPosition,
		requestList,
		requestDetail,
		succeedList,
		succeedDetail,
		failure,
	},
} = createActions({
	ACTIONS: {
		SET_SCROLL_POSITION: (position) => position,
		REQUEST_LIST: (url) => url,
		REQUEST_DETAIL: (url) => url,
		SUCCEED_LIST: (action) => action,
		SUCCEED_DETAIL: (action) => action,
		FAILURE: (action) => action,
	},
});

export default handleActions(
	{
		[setScrollPosition]: (state, { payload: position }) => ({
			...state,
			scrollPosition: position,
		}),
		[requestDetail]: (state) => ({
			...state,
			loading: true,
		}),
		[requestList]: (state) => ({
			...state,
			loading: true,
		}),
		[succeedDetail]: (state, { payload: selectedData }) => ({
			...state,
			selectedData,
			error: null,
			loading: false,
		}),
		[succeedList]: (state, { payload: list }) => ({
			...state,
			data: state.data.concat(list.posts),
			totalPage: list.total_pages,
			currentPage: list.current_page,
			error: null,
			loading: false,
		}),
		[failure]: (state, { payload: error }) => ({
			...state,
			error,
			loading: false,
		}),
	},
	initialState
);
