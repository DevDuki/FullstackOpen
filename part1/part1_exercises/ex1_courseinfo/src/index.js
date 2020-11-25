import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.prt.name}: {props.prt.exercises} exercises
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part prt={props.prts[0]} />
      <Part prt={props.prts[1]} />
      <Part prt={props.prts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Total number of exercises {props.prts[0].exercises + props.prts[1].exercises + props.prts[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content prts={course.parts} />
      <Total prts={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);