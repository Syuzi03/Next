"use client"

import { useEffect, useState } from "react"
import { IUser } from "./types"
import axios from "axios"
import Link from "next/link"

export const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        axios
            .get('/users')
            .then(res => {
                // console.log(res.data)
                setUsers(res.data.users)
            })
    }, [])
    return <>
        <div>
            <h3>User List</h3>
            {
                users.map(elm => <div key={elm.id}>
                    <p>{elm.name} {elm.surname}</p>
                    <strong>{elm.salary} AMD</strong>
                    <Link href={'/users/' + elm.id + '/details'}>account</Link>
                </div>)
            }
        </div>
    </>
}