import React, {ChangeEvent, KeyboardEvent, FC, JSX, useRef, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}
export const Todolist: FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState("")
    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler =  () => {
    //     if(taskTitleInput.current){
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //     }
    // }
    //

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const titleMaxLength = 25

    const isTitleLengthTooLong: boolean = title.length > titleMaxLength

    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true) {
            isAllTasksNotIsDone = false
        }
    }

    const titleMaxLengthWarning = isTitleLengthTooLong
    ? <div style={{color: 'red'}}>Title is too long</div>
        : null
const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" &&  !isAddBtnDisabled && addTaskHandler()

    const mappedTask: Array<JSX.Element> = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>

        )
    })


    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Please, enter title"}
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                    //ref={taskTitleInput}
                />
                <button
                    disabled={isAddBtnDisabled}
                    // onClick={addTaskHandler}
                    onClick={addTaskHandler}
                > +
                </button>
                {titleMaxLengthWarning}

            </div>
            <ul>
                {mappedTask}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

