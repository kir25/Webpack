import React, { Fragment } from 'react'

export default function Post(props) {
    const { posts } = props
    return (
        <>
            {posts.map(({ id, title, url }) => (
                // eslint-disable-next-line react/no-array-index-key
                <h2 key={id}>
                    <a href={url}>{title}</a>
                </h2>
            ))}
        </>
    )
}
