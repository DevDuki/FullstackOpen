import React from 'react'

const Input = ({changeHandler, searchValue}) => {
    return (
        <input onChange={changeHandler} value={searchValue} />
    )
}

export default Input