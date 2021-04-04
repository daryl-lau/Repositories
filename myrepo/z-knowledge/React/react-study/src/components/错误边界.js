import React from 'react'


// 注意错误边界在开发模式不会生效，仅在生产模式生效

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError (error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch (error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        // logErrorToMyService(error, errorInfo);
    }

    render () {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

class ErrorComp extends React.Component {

    render () {
        // throw new Error('渲染出错了')
        return (
            <div>
                <h3>错误边界在开发模式不会生效，仅在生产模式生效</h3>
            </div>
        )
    }
}

class ErrorTest extends React.Component {
    render () {
        return (
            <ErrorBoundary>
                <ErrorComp></ErrorComp>
            </ErrorBoundary>
        )
    }
}

export default ErrorTest