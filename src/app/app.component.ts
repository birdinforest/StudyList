import {Component} from '@angular/core';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]          // Provide a singleton instance of
                                        // TodoDataService when we ask for it.
                                        // ref: https://angular.io/guide/dependency-injection
})
export class AppComponent {
  title = 'todo';

  // This property will be two-way bind ty [(ngModel)] in the view, app.component.html.
  newTodo: Todo = new Todo();

  /**
   * Ask Angular DI system to inject the dependency associated with the
   * dependency injection token `TodoDataService` and assign it to property called
   * `todoDataService`.
   * Keyword `private` before `todoDataService` is a shorthand to create a private property then
   * assign it in constructor:
   * ```ts
   *      private todoDataService: TodoDataService;
   *      constructor(private todoDataservice: TodoDataService) {
   *        this.todoDataService = todoDataService;
   *      }
   * ```
   */
  constructor(private todoDataservice: TodoDataService) {}

  /**
   * Service is now available as this.todoDataService
   */
  toggleTodoCompelete(todo) {
    this.todoDataservice.toggleTodoComplete(todo);
  }

  addTodo() {
    this.todoDataservice.addTodo(this.newTodo);

    // Reset newTodo property after addition. Since it is two-way bind, the input filed of
    // in view will be emptied.
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataservice.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataservice.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataservice.getAllTodos();
  }
}
