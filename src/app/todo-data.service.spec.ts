import {inject, TestBed} from '@angular/core/testing';

import {Todo} from './todo';

import {TodoDataService} from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoDataService = TestBed.get(TodoDataService);
    expect(service).toBeTruthy();
  });
});

describe('#getAllTodos()', () => {
  it('should return an empty array by default',
    inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

  it('should return all todos',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
});

describe('#add(todo)', () => {
  it('should automatically assign an incrementing id',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
});

describe('#deleteTodoById(id)', () => {
  it('should remove todo with the corresponding id',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

  it('should not removing anything if todo with corresponding id is not found',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
});

describe('#updateTodoById(id, values)', () => {
  it('should return todo with the the corresponding id and updated data',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      const updatedTodo = service.updateTodoById(1, {
        title: 'new title'
      });
      expect(updatedTodo.title).toEqual('new title');
    }));

  it('should return null if todo is not found',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      const updatedTodo = service.updateTodoById(2, {
        title: 'new title'
      });
      expect(updatedTodo).toEqual(null);
    }));
});

describe('#toggleTodoComplete(todo)', () => {
  it('should return updated todo with inverse complete',
    inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      const updatedTodo = service.toggleTodoComplete(todo1);
      service.toggleTodoComplete(todo1);
      expect(updatedTodo.complete).toEqual(false);
    }));
});
