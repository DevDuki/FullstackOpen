import React from 'react'

const Filter = ({changeHandler, filterValue}) => {
    return (
        <div>filter by names: <input onChange={changeHandler} value={filterValue}/></div>
    )
}

export default Filter