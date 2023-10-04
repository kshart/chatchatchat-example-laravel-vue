import { Paginator } from './types'
import { User } from './user'

interface CreateTodo {
  stage: string
  title: string
  is_private: boolean
  description: string
}

export interface Todo {
  id: number
  /**
   * Стадия выполнения задачи
   */
  stage: 'new'|'in_work'|'deleted'
  /**
   * Название задачи
   */
  title: string
  /**
   * Описание Задачи
   */
  description: string
  /**
   * Задачу видит только владелец
   */
  is_private: boolean
  /**
   * Владелец задачи
   */
  author_id: number
  created_at: string
  updated_at: string
}

interface PaginatorTodo extends Paginator<Todo> {
  users: User[]
}
interface TodoWithUser extends Todo {
  user?: User
}

export default {
  create (fields: CreateTodo) {
    return fetch('/api/todo/create', {
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
  search (fts: string, page: number, perPage: number): Promise<Paginator<TodoWithUser>> {
    return fetch(`/api/todo/search?page=${page}&limit=${perPage}`)
      .then(response => response.json())
      .then(paginator => {
        const usersMap = new Map<number, User>()
        for (const user of paginator.users) {
          usersMap.set(user.id, user)
        }
        for (const todo of paginator.data) {
          todo.user = usersMap.get(todo.author_id)
        }
        return paginator
      })
  },
}
