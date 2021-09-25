import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
    {courseParts.map(part => {
      return (
        <Part key={part.name} part={part} />
      )
    })}
    </>
  )
}

export default Content;