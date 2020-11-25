import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content prts={course.parts} />
    <Total prts={course.parts} />
  </>
)


export default Course