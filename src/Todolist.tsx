import React, {ChangeEvent, FC, JSX} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}
export const Todolist: FC<TodolistPropsType> = (props) => {

    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler =  () => {
    //     if(taskTitleInput.current){
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //     }
    // }
    //


    const addTask = (title: string) => props.addTask(title, props.todolistId)

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId)
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolistId)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todolistId)


    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true) {
            isAllTasksNotIsDone = false
        }
    }

    const mappedTask: Array<JSX.Element> = props.tasks.map((t) => {
        const removeTask = () => props.removeTask(t.id, props.todolistId)
        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, event.currentTarget.checked, props.todolistId)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistId)
        const taskClasses = t.isDone ? "task-not-isDone" : "task"
        return (
            <li key={t.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} classes={taskClasses} changeTitle={changeTaskTitle}/>
                </div>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })


    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h2>

                <EditableSpan title={props.title}  changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h2>

            <AddItemForm titleMaxLength={25} addItem={addTask}/>

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

