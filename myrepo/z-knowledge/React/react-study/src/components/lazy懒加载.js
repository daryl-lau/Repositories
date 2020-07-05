import React, { Suspense } from 'react'


const List = React.lazy(() => import('./列表渲染'))

class LazyLoadTest extends React.Component {
    render () {
        return (
            <Suspense fallback={<div>Loading</div>}>
                <List></List>
            </Suspense>
        )
    }
}


export default LazyLoadTest