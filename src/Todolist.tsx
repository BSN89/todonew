import React, {ChangeEvent, FC, JSX} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
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
                    <Checkbox
                        size={"small"}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} classes={taskClasses} changeTitle={changeTaskTitle}/>
                </div>
                <IconButton
                    size={"small"}
                    onClick={removeTask}>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </li>

        )
    })


    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h2>

                <EditableSpan title={props.title}  changeTitle={changeTodoListTitle}/>
                <IconButton
                    size={"small"}
                    onClick={removeTodoListHandler}>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </h2>

            <AddItemForm titleMaxLength={25} addItem={addTask}/>

            <ul>
                {mappedTask}
            </ul>

            <div className={"filter-btn-wrapper"}>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "primary" : "success"}
                    onClick={handlerCreator("all")}>All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "primary" : "success"}
                    onClick={handlerCreator("active")}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "primary" : "success"}
                    onClick={handlerCreator("completed")}>Completed
                </Button>
            </div>
        </div>
    );
};

