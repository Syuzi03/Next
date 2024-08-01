import { deleteUser, getUserById, updateUser } from "@/lib/api";

export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
    const result = await req.json()
    const { id } = params
    const updatedUser = {
        id,
        ...result
    }

    const updateResult = updateUser(id, updatedUser)

    if (updateResult.changes === 0) {
        return Response.json({ status: 404 })
    }

    return Response.json({ data: updatedUser }, { status: 200 })
}

export const GET = async (req: Request, { params }: { params: { id: number } }) => {
    const { id } = params

    const user = getUserById(id)

    if (!user) {
        return Response.json({ message: 'user not found', status: 404 })
    }

    return Response.json({ user })
}

export const DELETE = async (req: Request, { params }: { params: { id: number } }) => {
    const { id } = params
    const user = deleteUser(id)
    return Response.json({ user })
}