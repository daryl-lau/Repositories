import React from 'react'
import { connect } from 'react-redux'

class SagaTest extends React.Component {
  componentDidMount () {
    this.props.getHouseList('cityId')
  }
  render () {
    console.log(this.props);
    return (
      <>
        <div>SagaTest</div>
        <div>{this.props.houseList.map(item => <p key={item.title}>{item.houseImg}</p>)}</div>
      </>
    )
  }
}

export default connect(
  // mapStateToProps
  // state => ({houseList: [...state]})
  state => {
    return {
      houseList: [...state]
    }
  },

  // mapDispatchToProps
  // 这种方式可以简写为下面的方式，connect帮我们做了处理
  // dispatch => {
  //   return {
  //     getHouseList: cityId => dispatch({ type: 'getHouseList', payload: cityId })
  //   }
  // }

  {
    getHouseList (cityId) {
      return { type: 'getHouseList', payload: cityId }
    },
  }

)(SagaTest)