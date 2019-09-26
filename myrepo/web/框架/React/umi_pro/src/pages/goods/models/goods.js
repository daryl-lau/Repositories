import {getGoods} from '../../../../services/getGoods'

export default {
  // namespace: 'goods',
  state: [],
  effects: {
    * getList(action, {call, put}) {
      const res = yield call(getGoods);
      yield put({type: 'initGoods', result: res.data})
    }
  },
  reducers: {
    initGoods(state, action) {
      return action.result
    }
  }
}
