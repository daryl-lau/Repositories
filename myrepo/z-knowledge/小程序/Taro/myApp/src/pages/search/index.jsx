import React, { useState, useEffect } from 'react'
import { View, Button } from '@tarojs/components'

export default function () {
  const [name, setName] = useState('搜索')
  useEffect(() => {
    setName('李淳罡')
  }, [])

  const [fields, setfields] = useState([0]);

  function change () {
    setfields((state) => {
      return [...state, 1]
    })
    setfields((state) => {
      return [...state, 2]
    })
  }

  useEffect(() => {
    console.log(123, fields)
  }, [fields]);

  return (
    <>
      <View>{name}</View>
      <Button onClick={change}>change</Button>
    </>
  )
}