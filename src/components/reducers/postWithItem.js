import {
    INVALIDATE_ITEM,
    REQUEST_POTS,
    RECEIVE_POSTS,
    INITIAL_POST,
    ERROR,
} from '../constants'

const post = (state = INITIAL_POST, action) => {
    switch (action.type) {
        case INVALIDATE_ITEM:
            return { ...state, didIvalidate: true }
        case REQUEST_POTS:
            return { ...state, isFetching: true }
        case ERROR:
            return { ...state, error: action.nameEr, isFetching: false }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didIvalidate: false,
                error: false,
                items: action.posts,
                lastUpdated: action.receivedAt,
            }
        default:
            return state
    }
}

export const postWithItem = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_ITEM:
        case REQUEST_POTS:
        case RECEIVE_POSTS:
        case ERROR:
            return {
                ...state,
                [action.item]: post(state[action.item], action),
            }
        default:
            return state
    }
}
