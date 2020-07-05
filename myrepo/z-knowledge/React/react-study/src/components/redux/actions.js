

// Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
export const change_user_age = { type: 'change_user_age', age: 20 }


// action创建函数，实际上就是返回action的一个函数，这样做的话，我们就不需要每次都写对象了，而且还可以进行传参
export function change_company (name) {
    return {
        type: 'change_com_name',
        name: name
    }
}

export function changeCompanySync (name) {
    return {
        type: 'change_com_name',
        name: name
    }
}

export function changeCompanyAsync (name) {
    return dispatch => {
        setTimeout(() => {
            dispatch(change_company(name))
        }, 1000)
    }

    // return {
    //     type: 'change_com_name',
    //     name: name
    // }
}


// 如果我要修改的数据是从服务器获取过来的，或者需要延迟修改，那么就涉及到异步操作
// 一下的方式是thunk的解决方案，要先在中间件中应用thunk，才能这么写
const api = 'http://localhost:3000/api'
export function changeComAsync () {
    return (dispatch, getState) => {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                dispatch(change_company(data.name))
            })
    }
} 
