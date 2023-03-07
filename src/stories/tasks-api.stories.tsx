import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI, UpdateTaskType} from "../api/todolist-api";

export default {
    title: 'API-Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks=()=>{
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'TodoLIstId'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get Tasks</button>
    </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const addTask = ()=>{
        todolistAPI.createTask(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'TodoLIstId'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Task title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={addTask}>Add Task</button>
    </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const onTaskDelete = () => {
        todolistAPI.deleteTasks(todolistId, taskId)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'TodoLIstId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'TaskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={onTaskDelete}>Delete</button>
        </div>

    </div>
}
export const UpdateTask= () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title,setTitle]=useState<string>('')
    const [description,setDescription]=useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority]=useState<number>(0)
    const [startDate, setStartDate]=useState<string>('')
    const [deadline, setDeadline]=useState<string>('')


    const onTaskDelete = () => {
        const model={
            title,
            description,
            status,
            completed:false,
            priority:0,
            startDate:'',
            deadline:'',
        }

        todolistAPI.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'TodoLIstId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'TaskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'Task title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={'Description'} value={description}
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={'Status'} value={status}
                   onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'Status'} value={status}
                   onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <button onClick={onTaskDelete}>Update Task Title</button>
        </div>

    </div>
}
