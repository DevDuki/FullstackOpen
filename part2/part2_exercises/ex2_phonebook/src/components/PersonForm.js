import React from 'react'
import Input from './Input'
import Button from './Button'

const PersonForm = ({submitHandler, nameInputHandler, nameInputValue, numberInputHandler, numberInputValue}) => {
    return (
        <form onSubmit={submitHandler}>
            <Input text="name" changeHandler={nameInputHandler} inputValue={nameInputValue} />
            <Input text="number" changeHandler={numberInputHandler} inputValue={numberInputValue} />
            <Button text="add" />
        </form>
    )
}

export default PersonForm