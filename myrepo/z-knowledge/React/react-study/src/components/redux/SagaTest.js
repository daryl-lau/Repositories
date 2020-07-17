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
      </>
    )
  }
}

export default connect(
  state => {
    return {
      houseList: [...state]
    }
  },
  {
    getHouseList (cityId) {
      return { type: 'getHouseList', payload: cityId }
    },
  }
)(SagaTest)