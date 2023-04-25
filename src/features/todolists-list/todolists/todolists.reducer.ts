import {RequestStatusType} from 'app/app.reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions";
import {todolistsAPI, TodolistType, UpdateTodolistTitleArgType} from "features/todolists-list/todolists/todolists.api";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {ResultCode} from "common/enums";
import {tryCatchThunk} from "common/utils/try-catch.thunk";


const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>
('todo/fetchTodolists',
    async (_, thunkAPI) => {
        return tryCatchThunk(thunkAPI, async () => {
            const res = await todolistsAPI.getTodolists()
            return {todolists: res.data}
        })
    })

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>
('todo/addTodolist',
    async (title, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return tryCatchThunk(thunkAPI, async () => {
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.Success) {
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        })
    })


const removeTodolist = createAppAsyncThunk<{ id: string }, string>
('todo/removeTodolist',
    async (id, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return tryCatchThunk(thunkAPI, async () => {
            dispatch(todolistsActions.changeTodolistEntityStatus({id, status: 'loading'}))
            const res = await todolistsAPI.deleteTodolist(id)
            if (res.data.resultCode === ResultCode.Success) {
                return {id}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }

        })
    })

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>
('todo/changeTodolistTitle',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return tryCatchThunk(thunkAPI, async () => {
            const res = await todolistsAPI.updateTodolist(arg)
            if (res.data.resultCode === ResultCode.Success) {
                return arg
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        })

    })

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find(tl => tl.id === action.payload.id)
                if (todo) todo.title = action.payload.title
            })

            .addCase(clearTasksAndTodolists, () => {
                return []
            })

    }


})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

