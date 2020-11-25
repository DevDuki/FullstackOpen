import React from 'react'
import Part from './Part'

const Content = ({prts}) => (
  <>
    {prts.map(part => 
      <Part key={part.id} prt={part} />
      )
    }
  </>
)

export default Content