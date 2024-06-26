import axios from 'axios'

export const getUsers = async (params) => {
    return await axios.get('https://jsonplaceholder.typicode.com/users', {params})
}