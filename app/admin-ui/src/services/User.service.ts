import axios from "axios"

export async function getUsers() {
    const users = await axios.get('/api/users')
    return users.data
}
