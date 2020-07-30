import React, { useState, useEffect } from 'react'
import { View, Button } from '@tarojs/components'

export default function () {
  const [user, setUser] = useState({ name: '徐凤年', age: 18 })
  useEffect(() => {
    setUser({ name: '徐凤年', age: 18 })
  }, [])

  function changeAge () {
    let newUser = { ...user }
    newUser.age = 20
    setUser(newUser)
  }

  return (
    <>
      <View>{user.name}</View>
      <View>{user.age}</View>
      <Button onClick={changeAge}>修改年龄</Button>
    </>
  )
}