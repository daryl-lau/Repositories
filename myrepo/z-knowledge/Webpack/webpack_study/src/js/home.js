import '../css/base.css'
import '../css/home.css'
import '../statics/imgs/flag.png'

// import API from '../../utils/api'

function getComponent () {

  // Lodash, now imported by this script
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;

  }).catch(error => 'An error occurred while loading the component');
}

function getApi () {
  return import( /* webpackChunkName: "API" */ '../../utils/api').then(api => {
    api()
  }).catch(e => 'Load API failed!')
}

window.addEventListener('load', function () {
  document.querySelector('#btn2').onclick = function () {
    alert('点击了-home')
    getComponent().then(component => {
      document.body.appendChild(component);
    })
    getApi()
  };
  console.log('home loaded');
  // API()
})



