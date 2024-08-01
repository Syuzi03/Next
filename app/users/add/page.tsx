"use client"

import { InputUser } from "@/lib/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const [user, setUser] = useState<InputUser>({
        name: '', surname: "", salary: 65000
    })

    const router = useRouter()
    // console.log(router)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // console.log(user)
        axios
            .post('/users', user)
            .then(res => {
                // console.log(res.data)
                router.push('/')
            })
    }

    return <>
        <h1>add user</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="name"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="surname"
                    value={user.surname}
                    onChange={e => setUser({ ...user, surname: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="number"
                    step={15000}
                    placeholder="salary"
                    value={user.salary}
                    onChange={e => setUser({
                        ...user, salary: +e.target.value
                    })}
                />
            </div>
            <button>save</button>
        </form>
    </>
}