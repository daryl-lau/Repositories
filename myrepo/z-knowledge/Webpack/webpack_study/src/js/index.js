import a from './a'
import b from './b'

import $ from 'jquery'

import ud from 'underscore'

import { cube } from '../../utils/math'

import { add } from '../../utils/es6.js'

import '../css/base.css'
import '../css/index.css'
import '../statics/imgs/flag.png'




window.addEventListener('load', function () {
  $('#btn1').click(function () {
    alert('点击了-index')
    a()
    b()
    let arr = ['1', '2', '3', '4', 'a', 'b', 'c', 'd', 'e'];
    console.log(ud.shuffle(arr));
    console.log(cube(5));
    console.log(add([1, 2, 3, 4, 5]));
    console.log('20'.padStart(5, '0'));
  })


  console.log($('#btn1'));
  console.log('index loaded');
})