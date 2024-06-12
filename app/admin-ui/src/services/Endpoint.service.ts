import axios from "axios"
import { EndpointType } from "../types"

export async function getEndpoints() {
    const endpoints = await axios.get('/api/endpoints')
    return endpoints.data
}

export async function createEndpoint(endpoint: EndpointType) {
    return axios.post('/api/endpoints', endpoint)
}