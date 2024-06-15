import axios from "axios"
import { Endpoint } from "../types"

export async function getEndpoints() {
    const endpoints = await axios.get('/api/endpoints')
    return endpoints.data
}

export async function createEndpoint(endpoint: Endpoint) {
    return axios.post('/api/endpoints', endpoint)
}