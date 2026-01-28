import { Pagination, View } from '@fold-dev/core'
import React, { useState } from 'react'

export default {
    title: 'Core/Pagination',
    component: Pagination,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Pagination',
    subtitle: 'The Pagination component indicates the current page and facilitates navigation among other pages.',
    description:
        'Pagination is a frequently employed technique for facilitating user navigation across multiple pages. However, it may not be suitable in cases where lazy loading is implemented or when the user requires access to all content.',
}

export const Usage = () => {
    const [page, setPage] = useState(1)

    return (
        <View
            p="1rem 0"
            width="100%"
            style={{ maxWidth: 600, overflow: 'scroll' }}>
            <Pagination
                width="100%"
                pageSize={5}
                totalCount={100}
                currentPage={page}
                siblingCount={4}
                separator="..."
                onPageChange={(page) => setPage(page)}
            />
        </View>
    )
}
