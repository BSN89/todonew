import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML, Css", isDone: true},
        {id: v1(), title: "REACT", isDone: true},
        {id: v1(), title: "RTK", isDone: false},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "MUI", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const removeTask = (taskID: string) => {
        const updateTasks = tasks.filter(t => t.id !== taskID)
        setTasks(updateTasks)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const getTaskForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const tasksWhatIWantToSee = getTaskForMe(tasks, filter)
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksWhatIWantToSee}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<Todolist title={"What to bye"} tasks={tasks1}/>*/}
        </div>
    );
}

export default App;
