import React, {ChangeEvent, KeyboardEvent, FC, JSX, useRef, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListsId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType, todoListId: string) => void
}
export const Todolist: FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler =  () => {
    //     if(taskTitleInput.current){
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //     }
    // }
    //

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todolistId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId)
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler()
const removeTodoListHandler = () => {props.removeTodoList(props.todolistId)}

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
    const userMessage = error
        ? <div style={{color: 'red'}}>Title is required</div>
        : null
    const mappedTask: Array<JSX.Element> = props.tasks.map((t) => {
        const removeTask = () => props.removeTask(t.id, props.todolistId)
        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, event.currentTarget.checked, props.todolistId)
        const taskClasses = t.isDone ? "task-not-isDone" : "task"
        return (
            <li key={t.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                </div>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })


    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h2>
                {props.title}
                <button onClick={removeTodoListHandler}>x</button>
            </h2>
            <div>
                <input
                    placeholder={"Please, enter title"}
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                    className={error || isTitleLengthTooLong ? "input-error" : undefined}
                    //ref={taskTitleInput}
                />
                <button
                    disabled={isAddBtnDisabled}
                    // onClick={addTaskHandler}
                    onClick={addTaskHandler}
                > +
                </button>
                {titleMaxLengthWarning}
                {userMessage}
            </div>
            <ul>
                {mappedTask}
            </ul>

            <div className={"filter-btn-wrapper"}>
                <button
                    className={props.filter === "all"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>

        </div>
    );
};

