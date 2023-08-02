import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';


type AddItemFormPropsType = {
    titleMaxLength: number
    addItem: (title: string) => void
}


export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const {titleMaxLength, addItem} = props

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)


    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addItemHandler()


    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is too long!</div>
        : null

    const userMessage = error
        ? <div style={{color: 'red'}}>Title is required</div>
        : null

const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined
    return (
        <div className="add-form">
            <TextField
                size={"small"}
                placeholder={"Please, enter title"}
                value={title}
                onChange={setTitleHandler}

                onKeyDown={addTaskOnKeyPressHandler}
                className={inputClasses}
            />

            <IconButton
                size={"small"}
                disabled={isAddBtnDisabled}
                onClick={addItemHandler}>
                <BorderColorRoundedIcon/>
            </IconButton>
            {titleMaxLengthWarning || userMessage}

        </div>
    );
};

