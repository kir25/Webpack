import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    selectItemAct,
    fetchPostsIfNeeded,
    invalidateItem,
} from '../actions/actions'
import Picker from '../presentational/Picker'
import Posts from '../presentational/Posts'
import './App.css'

function App(props) {
    const {
        dispatch,
        selectItem,
        posts,
        isFetching,
        lastUpdated,
        error,
    } = props
    useEffect(() => {
        dispatch(fetchPostsIfNeeded(selectItem))
    }, [selectItem])

    const handleChange = nextItem => {
        dispatch(selectItemAct(nextItem))
    }
    const handleRefreshClick = () => {
        dispatch(invalidateItem(selectItem))
        dispatch(fetchPostsIfNeeded(selectItem))
    }

    const selectHeight = ({ target }) => {
        const numb = target.children.length
        const sel = getComputedStyle(target)
        const margin = `${parseInt(sel.height) * numb - 20}px`
        const elem = document.getElementById('head')
        const computMarg = getComputedStyle(elem).marginTop
        if (parseInt(computMarg) < parseInt(margin)) {
            elem.style.marginTop = margin
        } else {
            elem.style.marginTop = null
        }
    }
    const selectHeightBlur = () => {
        document.getElementById('head').style.marginTop = null
    }

    return (
        <>
            <div className="header">
                <Picker
                    value={selectItem}
                    onClick={selectHeight}
                    onBlur={selectHeightBlur}
                    onChange={handleChange}
                    options={['Reactjs', 'Frontend', 'Reduxjs', 'Javascript']}
                />
                <div className="date">
                    {lastUpdated && (
                        <span className="transparent-text">
                            Last updated at:
                            {new Date(lastUpdated).toLocaleTimeString()}
                        </span>
                    )}
                    {!isFetching && !error && (
                        // eslint-disable-next-line react/button-has-type
                        <button onClick={handleRefreshClick}>Refresh</button>
                    )}
                </div>
            </div>
            {error && <h2>{error}</h2>}
            {isFetching && posts.length === 0 && (
                <div className="loader">Loading...</div>
            )}
            {!isFetching && posts.length === 0 && !error && <h1>Empty.</h1>}
            <h1 style={{ opacity: posts.length > 0 ? 1 : 0 }} id="head">
                {selectItem}
            </h1>
            {posts.length > 0 && (
                <div
                    className="table"
                    style={{ opacity: isFetching ? 0.5 : 1 }}
                >
                    <Posts posts={posts} />
                </div>
            )}
        </>
    )
}

function mapStateToProps(state) {
    const { selectItem, postWithItem } = state
    const { isFetching, lastUpdated, error, items: posts } = postWithItem[
        selectItem
    ] || {
        isFetching: true,
        items: [],
    }

    return {
        selectItem,
        posts,
        isFetching,
        lastUpdated,
        error,
    }
}

export default connect(mapStateToProps)(App)
