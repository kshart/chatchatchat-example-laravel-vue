import { Paginator } from './types'
import { User } from './user'

export type TodoStage = 'new'|'in_work'|'done'|'deleted'

interface CreateTodo {
  stage: TodoStage
  title: string
  is_private: boolean
  description: string
}

interface UpdateTodo {
  stage?: TodoStage
  title?: string
  description?: string
}

export interface Todo {
  id: number
  /**
   * Стадия выполнения задачи
   */
  stage: TodoStage
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

  can_edit: boolean
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
  search (fts: string, page: number, perPage: number): Promise<Paginator<TodoWithUser>> {
    return fetch(`/api/todo/search?fts=${encodeURIComponent(fts)}&page=${page}&limit=${perPage}`)
      .then(response => response.json())
      .then((paginator: PaginatorTodo) => {
        const usersMap = new Map<number, User>()
        for (const user of paginator.users) {
          usersMap.set(user.id, user)
        }
        for (const todo of paginator.data) {
          (todo as TodoWithUser).user = usersMap.get(todo.author_id)
        }
        return paginator
      })
  },
  update (id: number, fields: UpdateTodo) {
    return fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    })
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
}
