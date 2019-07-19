import {SET_NAME, ADD_AGE} from "../types/index";

// 2、创建存储
let data = {name: 'zhangsan', age: 18};

function users(state = data, action) {
    switch (action.type) {
        case SET_NAME:
            return {
                // 这里的state还是users自己的state，没有和外部state合并，修改也只会修改users的state
                // 所以即便company里面有name属性，修改的也只会修改users的name，而不会影响company里的name
                ...state,
                name: action.name,
                new: 'new'
            };
        case ADD_AGE:
            return {
                ...state,
                age: state.age + action.n
            };
        default:
            return state
    }
}

export default users;