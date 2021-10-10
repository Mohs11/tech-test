import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url: String = 'http://localhost:3000';
  task: Task;
  
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task> {
    return this.http.get<Task>(this.url + '/tasks');
  }

  deleteTask(id: number): Observable<Task> {
    const url = this.url + '/tasks/' + id;
    return this.http.delete<Task>(url);
  }

  addTask(task: Task) {
    return this.http.post(this.url + '/tasks', task);
  }

  taskComplete(task: Task) {
    const url = this.url + '/tasks/' + task.id;
    task.done = new Date().toDateString();
    return this.http.patch(url, task);
  }

  getTask(id:number) {
    return this.http.get(this.url + `/tasks/${id}`);
  }

  updateTask(task: Task) {
    return this.http.patch(this.url + `/tasks/${task.id}`, task);
  }
  
}

