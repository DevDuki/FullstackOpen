import React from 'react'

const Input = ({text, changeHandler, inputValue}) => {
    return (
        <div>
            {text}: <input onChange={changeHandler} value={inputValue} />
        </div>
    )
}

export default Input