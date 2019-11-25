import fetch from 'cross-fetch'
import {
    SELECT_ITEM,
    INVALIDATE_ITEM,
    REQUEST_POTS,
    RECEIVE_POSTS,
    ERROR,
} from '../constants'

export const selectItemAct = item => ({ type: SELECT_ITEM, item })
export const invalidateItem = item => ({ type: INVALIDATE_ITEM, item })
export const requestPosts = item => ({ type: REQUEST_POTS, item })
export const errorPost = (item, error) => ({
    type: ERROR,
    item,
    nameEr: error.message,
})
export const receivePosts = (item, json) => ({
    type: RECEIVE_POSTS,
    item,
    posts: json.data.children.map(it => it.data),
    receivedAt: Date.now(),
})

const fetchPost = item => {
    return dispatch => {
        dispatch(requestPosts(item))
        fetch(`https://www.reddit.com/r/${item}.json`)
            .then(responce => responce.json())
            .then(json => dispatch(receivePosts(item, json)))
            .catch(error => dispatch(errorPost(item, error)))
    }
}

const shouldFetch = (state, item) => {
    const posts = state.postWithItem[item]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didIvalidate
}
export const fetchPostsIfNeeded = item => {
    return (dispatch, getState) => {
        if (shouldFetch(getState(), item)) {
            return dispatch(fetchPost(item))
        }
        return Promise.resolve()
    }
}
