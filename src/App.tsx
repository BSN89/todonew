import React, {JSX, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | 'completed'

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML, Css", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "RTK", isDone: false},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "MUI", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "EGG", isDone: false},
            {id: v1(), title: "BREAD", isDone: false},
            {id: v1(), title: "POTATO", isDone: false}
        ]
    })

    const removeTask = (taskID: string, todoListId: string) => {
        const updateTasks = tasks[todoListId].filter(t => t.id !== taskID)
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updateTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        const updateTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, isDone: newIsDoneValue}
            : t
        )
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const updateTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, title: title}
            : t
        )
        setTasks({...tasks, [todoListId]: updateTasks})
    }




    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, filter: nextFilter}
            : tl
        ))
    }

    const removeTodoList = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
        const copy = {...tasks}
        delete copy[todoListsId]
        setTasks(copy)
    }
    const addTodoList = (title: string) => {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: title}
            : tl
        ))
    }
    const getTaskForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTaskForRender(tasks[tl.id], tl.filter)

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksWhatIWantToSee}


                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}

                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })


    return (
        <div className="App">
            <AddItemForm titleMaxLength={25} addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
