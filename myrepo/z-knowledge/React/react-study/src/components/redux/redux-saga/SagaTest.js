import React from 'react'
import { connect } from 'react-redux'

class SagaTest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.log(this.props.dispatch, '11111111111111111111111111111111');
    this.props.getHouseList('AREA|dbf46d32-7e76-1196')
  }

  handleClick = () => {
    this.props.getHouseList('AREA|dbf46d32-7e76-1196')
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    console.log(nextProps, 1111111111, nextState);
    return null
  }

  render () {
    console.log(this.props);
    return (
      <>
        <div>SagaTest</div>
        <button onClick={this.handleClick}>获取数据</button>
        <ChildButton getHouseList={this.props.getHouseList}></ChildButton>
        <div>{this.props.houseList.map((item, index) => <p key={item.title + index}>{item.houseImg}</p>)}</div>
      </>
    )
  }
}

function ChildButton (props) {
  const handleClick = () => {
    props.getHouseList('AREA|dbf46d32-7e76-1196')
  }
  return (<button onClick={handleClick}>Child获取数据</button>)
}


export default connect(
  // mapStateToProps
  // state => ({houseList: [...state]})
  (state, props) => {
    console.log(state, props);
    return {
      houseList: state
    }
  },

  // mapDispatchToProps
  // 注意，在connect中如果不给这第二个参数，那么dispatch会被传递到组件内部，可以在组件内部使用this.props.dispatch拿到
  // 但是不建议这么做，如果这么做，函数要想传递给子组件的话，dispatch也要跟着透传，代码耦合度太高了
  // 因此传入第二个参数，直接返回一个函数，用来派发action，传递给子组件也可以直接调用
  // dispatch => {
  //   return {
  //     getHouseList: cityId => dispatch({ type: 'getHouseList', payload: cityId })
  //   }
  // }

  // 由于每次像上面那么写代码有些冗余，因此connect帮我们做了处理，使用bindActionCreators API，帮我们生成上面那种函数
  // 此时形态就和action的创建函数一样，直接可以在组件内部使用this.props.getHouseList获取到
  // 下面定义的方法也会被映射到props上，在组件内部可以使用this.props获取到
  {
    getHouseList (cityId) {
      return { type: 'getHouseList', payload: cityId }
    },
  }

)(SagaTest)