import React, {JSX, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    Paper,
    ThemeProvider,
    createTheme, CssBaseline
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, teal} from "@mui/material/colors";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
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
const [isLightMode, setIsLightMode] = useState<boolean>(true)
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
        const newTodoId = v1()
        const newTodo: TodolistType = {
            id: newTodoId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
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
            <Grid item key={tl.id}>
                <Paper elevation={4}>

                <Todolist
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
                </Paper>
            </Grid>
        )
    })

    const mode = isLightMode ? 'light' : "dark"
const customTheme = createTheme({
    palette: {
        primary: teal,
        success: amber,
        mode: mode
    },
})
    return (
<ThemeProvider theme={customTheme}>
    <CssBaseline/>
    <div className="App">

        <AppBar position={"static"}>
            <Toolbar>

                <IconButton
                    size={"large"}
                    edge={"start"}
                    color={"inherit"}
                    aria-label={"menu"}
                    sx={{mr: 4}}
                >
                    <Menu/>
                </IconButton>
                <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}}>

                    Todolist

                </Typography>
                <Button
                    color={"inherit"}
                    variant={"outlined"}
                    sx={{mr: "15px"}}
                    onClick={ () => setIsLightMode(!isLightMode) }>
                    {isLightMode ? "Set dark" : "Set light"}
                </Button>
                <Button
                    color={"inherit"}
                    variant={"outlined"}>LogOut
                </Button>
            </Toolbar>
        </AppBar>

        <Container>
            <Grid container sx={{p: "25px 0"}}>
                <div className={"add-form"}>
                    <AddItemForm titleMaxLength={25} addItem={addTodoList}/>

                </div>
            </Grid>
            <Grid container spacing={3}>
                {todoListsComponents}

            </Grid>
        </Container>

    </div>
</ThemeProvider>
    );
}

export default App;
