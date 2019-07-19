import {CHANGE_COMPANY_NAME} from "../types/index";

// 2、创建存储

let data = {name: 'beings.com'};

function company(state = data, action) {
    switch (action.type) {
        // case SET_NAME:
        //     return {
        //         ...state,
        //         name: action.name
        //     };
        case CHANGE_COMPANY_NAME:
            return {
                ...state,
                name: action.comName
            };
        default:
            return state
    }
}

export default company;