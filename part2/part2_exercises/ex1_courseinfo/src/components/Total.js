import React from 'react'

const Total = ({prts}) => {

  const total = prts.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <p><b>Total number of exercises {total}</b></p>
  )
}


export default Total