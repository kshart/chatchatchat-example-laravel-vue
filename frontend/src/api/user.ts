interface CreateUser {
  name: string
  phone: string
  password: string
  email?: string
}

export interface Me {
  id: number
  name: string
  phone: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

export default {
  create (fields: CreateUser) {
    return fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    })
      .then(({ ok, body }) => {
        if (!ok) {
          return null
        }
        return body
      })
      .catch(error => {
        console.error(error)
        return null
      })
  },
  me (): Promise<Me> {
    return fetch('/api/user/me')
      .then(response => {
        if (!response.ok) {
          return null
        }
        return response.json()
      })
      .catch(error => {
        console.error(error)
        return null
      })
  },
  login (phone: string, password: string) {
    return fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        password,
      })
    })
      .then(({ ok, body }) => {
        if (!ok) {
          return null
        }
        return body
      })
      .catch(error => {
        console.error(error)
        return null
      })
  }
}
