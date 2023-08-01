import React, {ChangeEvent, FC, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const {title, classes, changeTitle} = props

    const [isEditMode, setIsEditMode] = useState(false)
    const [localTitle, setLocalTitle] = useState(title)

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        changeTitle(localTitle)
        setIsEditMode(false)
    }
    const setLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setLocalTitle(event.currentTarget.value)

    return (
        isEditMode
            ? <input
                value={localTitle}
                autoFocus
                onChange={setLocalTitleHandler}
                onBlur={offEditMode}/>
            : <span
                onDoubleClick={onEditMode}
                className={classes}
            >{title}</span>

    );
};

