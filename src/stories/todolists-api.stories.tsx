import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API-Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const addTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'Title TodoList'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addTodolist}>Create TodoList</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'tofolist ID'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodo = () => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'tofolist ID'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Title TodoList'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodo}>Update</button>
        </div>
    </div>
}

