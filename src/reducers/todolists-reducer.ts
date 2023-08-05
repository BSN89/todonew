//1. исходный стейт

//2.1. какой тип действия мы хотим сделать
//2.2. данные необходимые для выполнения необходимого действия
// {type: , payload: } => action


import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListId: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListId: string
}


export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const todolistsReducer =
    (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todolists.filter(tl => tl.id !== action.todoListId)
            case "ADD-TODOLIST":
                const newTodo: TodolistType = {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all'
                }
                return [...todolists, newTodo]
            case "CHANGE-TODOLIST-TITLE":
                return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
            default:
                return todolists
        }
    }

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => (
    {type: "REMOVE-TODOLIST", todoListId: todoListId}
)

export const AddTodoListAC = (title: string): AddTodoListAT => ({
    type: "ADD-TODOLIST", title: title, todoListId: v1()
})

export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: todoListId
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: todoListId
})
