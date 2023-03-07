import axios from 'axios'
import React, {useEffect, useState} from "react";

const settings = {
    withCredentials: true,
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {
//         item: TodolistType
//     }
// }
// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {}
// }
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {}
// }

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: null | string

}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskType){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}
