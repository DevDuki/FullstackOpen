import React from 'react'

interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Course[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
    {courseParts.map(part => {
      return (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      )
    })}
    </>
  )
}

export default Content;