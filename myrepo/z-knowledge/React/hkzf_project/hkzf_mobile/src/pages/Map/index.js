import React from 'react'
import NavHeader from '../../components/NavHeader'

export default class Map extends React.Component {
  componentDidMount () {

    const curCity = new window.BMap.LocalCity();
    curCity.get(position => {
      console.log(position);

      var map = new window.BMap.Map("container");
      var point = new window.BMap.Point(position.center.lng, position.center.lat);
      map.centerAndZoom(point, 15);
    })
  }
  render () {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    )
  }
}