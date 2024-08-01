"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { InputUser } from "@/lib/types"

interface Props {
    params: { id: number }
}

export default function Page({ params }: Props) {
    const [user, setUser] = useState<InputUser | null>(null)
    const router = useRouter()

    const handleDelete = (id: number) => {
        axios
            .delete('/users/' + params.id)
            .then(res => router.push('/'))
    }

    useEffect(() => {
        axios.get(`/users/${params.id}`)
            .then(res => {
                setUser(res.data.user)
            })
    }, [params.id])



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        axios
            .put('/users/' + params.id, user)
            .then(res => {
                router.push('/')
            })
    }

    return <>
        <h1>Edit User Details No. {params.id}</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={user?.name}
                    onChange={e => setUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="surname"
                    placeholder="surname"
                    value={user?.surname}
                    onChange={e => setUser(prev => prev ? { ...prev, surname: e.target.value } : null)}
                />
            </div>
            <div>
                <input
                    type="number"
                    name="salary"
                    step={15000}
                    placeholder="salary"
                    value={user?.salary}
                    onChange={e => setUser(prev => prev ? {
                        ...prev, salary: +e.target.value
                    } : null)}
                />
            </div>
            <button type="submit">update</button>
        </form>
        <button onClick={() => handleDelete(params.id)}>delete</button>
    </>
}


