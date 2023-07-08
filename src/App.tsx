import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | 'completed'
function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title: "HTML, Css", isDone: true},
        {id:2, title: "REACT", isDone: true},
        {id:3, title: "RTK", isDone: false},
        {id:4, title: "TS", isDone: false},
        {id:5, title: "MUI", isDone: false}
    ])
const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const removeTask = (taskID: number) => {
        const updateTasks = tasks.filter(t => t.id !== taskID)
        setTasks(updateTasks)
    }

    const getTaskForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
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
              removeTask={removeTask}
              changeFilter={changeFilter}
          />
          {/*<Todolist title={"What to bye"} tasks={tasks1}/>*/}
        </div>
    );
}

export default App;
