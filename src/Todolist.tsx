import React, {FC, JSX} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}
export const Todolist: FC<TodolistPropsType> = (props) => {
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true) {
            isAllTasksNotIsDone = false
        }
    }

    const mappedTask: Array<JSX.Element> = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id) }>x</button>
            </li>

        )
    })


    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTask}
            </ul>
            <div>
                <button onClick={ () => props.changeFilter("all") }>All</button>
                <button onClick={ () => props.changeFilter("active") }>Active</button>
                <button onClick={ () => props.changeFilter("completed") }>Completed</button>
            </div>
        </div>
    );
};

