import { Injectable } from '@angular/core';
import { Todo } from '../components/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  // POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    this.todos = [
      ...this.todos,
      todo
    ];

    return this;
  }

  // DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);

    return this;
  }

  // PATCH /todos/:id
  updateTodoById(id: number, values: object = {}): Todo {
    const todo = this.getTodoById(id);

    if (!todo) {
      return null;
    }

    Object.assign(todo, values);

    return todo;
  }

  // GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo): Todo {
    const updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });

    return updateTodo;
  }
}
