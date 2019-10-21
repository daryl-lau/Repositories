import {getGoods} from '../../../../services/getGoods'

export default {
  namespace: 'goods',
  state: [],  // [{title: 'web'}, {title: 'java'}]
  effects: {
    * getList(action, {call, put}) {
      const res = yield call(getGoods);
      yield put({type: 'initGoods', result: res.data.result})
    }
  },
  reducers: {
    initGoods: (state, action) => {
      return action.result
    },
    addGood(state, action){
      return [...state, {title: action.title}]
    }
  }
}
