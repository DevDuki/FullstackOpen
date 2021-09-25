import React from 'react'
import { assertNever, CoursePart } from '../types'

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            {part.description}
          </p>
        </>
      )
    case 'groupProject':
      return (
        <>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            project exercises {part.groupProjectCount}
          </p>
        </>
      )
    case 'submission':
      return (
        <>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            {part.description}<br />
            submit to {part.exerciseSubmissionLink}
          </p>
        </>
      )
    case 'special':
      return (
        <>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            {part.description}<br />
            required skills: {part.requirements.join(', ')}
          </p>
        </>
      )
    default:
      return assertNever(part);
  }

  return (
    <p>{part.name} {part.exerciseCount}</p>
  )
}

export default Part;