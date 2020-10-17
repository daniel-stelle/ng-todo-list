import { Component } from '@angular/core';
import { Todo } from './components/todo';
import { TodoDataService } from './services/todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService],
})
export class AppComponent {
  private todoDataService: TodoDataService;

  title = 'ng-todo-list';
  newTodo: Todo = new Todo();

  constructor(todoDataService: TodoDataService) {
    this.todoDataService = todoDataService;
  }

  addTodo(): void {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  removeTodo(todo: Todo): void {
    this.todoDataService.deleteTodoById(todo.id);
  }

  toggleTodoComplete(todo: Todo): void {
    this.todoDataService.toggleTodoComplete(todo);
  }

  get todos(): Todo[] {
    return this.todoDataService.getAllTodos();
  }
}
