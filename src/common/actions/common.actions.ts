import {createAction} from "@reduxjs/toolkit";

export const clearTasksAndTodolists = createAction('common/clear-tasks-todolists')


//с доп параметрами
// export const clearTasksAndTodolists = createAction('common/clear-tasks-todolists',
//     (tasks:TasksStateType,todolists:TodolistDomainType[]) => {
//     let random = 100
//         return {
//             payload: {
//                 tasks,
//                 todolists,
//                 id: random > 90 ? nanoid(): Math.random()
//
//             }
//         }
//     })