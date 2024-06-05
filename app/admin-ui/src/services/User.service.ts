import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export async function getUsers() {

    const navigate = useNavigate();

    try {
        const users = await axios.get('/api/users')
        return users
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status == 401) {
                return navigate('/login')
            }
        }
    }

    return null

    // return [{
    //     "createAt": "2024-06-05T07:42:12.272+00:00",
    //     "createdBy": "SYSTEM",
    //     "changedAt": null,
    //     "changedBy": null,
    //     "username": "admin",
    //     "password": "$2a$10$9EcY.kpUQBGwOWoK3P.jp.jL6wtsw5ZlzIYxUcn01vH6Jy6LZ9r.6",
    //     "lastLoggedIn": null,
    //     "active": true
    // }]
}
