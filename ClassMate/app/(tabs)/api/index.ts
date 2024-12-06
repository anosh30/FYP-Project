// const API_BASE_URL = 'http://localhost:3000'
export const API_BASE_URL = 'http://192.168.137.201:3000'

export const registerUser = async (userData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || 'Registration failed')
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const loginUser = async (credentials: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })

        console.log(response, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Login failed')
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}
