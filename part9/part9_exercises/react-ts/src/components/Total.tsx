import React from 'react'

interface TotalProps {
  numberOfExercises: number;
}

const Total = ({ numberOfExercises }: TotalProps) => {
  return (
    <p>Number of exercises {numberOfExercises}</p>
  )
}

export default Total;