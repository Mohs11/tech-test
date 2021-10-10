import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Task } from 'src/app/models/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content(content: any) {
    throw new Error('Method not implemented.');
  }

  tasks: any = [];
  loading = true;
  search: String = '';
  noTasks = true;

  constructor(
    private api: ApiService,
    private flashMessage: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.api.getTasks().subscribe((res: any) => {
      this.tasks = res;
      if (this.tasks.length) {
        this.noTasks = false;
      }
      this.loading = false;
    });
  }

  confirmComplete(task: Task) {
    if (confirm(`Are you sure you want to complete "${task.label}"?`)) {
      this.taskComplete(task);
    }
  };

  taskComplete(task: Task) {
    this.api.taskComplete(task).subscribe(res => {
      if (res) {
        this.flashMessage.showFlashMessage({
          messages: [`The task: "${task.label}" has been completed`],
          dismissible: true,
          timeout: 4000,
          type: 'success'
        });
      } else {
        this.flashMessage.showFlashMessage({
          messages: [`Oops, something went wrong... try again?`],
          dismissible: true,
          timeout: 4000,
          type: 'warning'
        }),
          err => console.log(err);
      }
    })
  }

  editTask(id: number) {
    this.router.navigate([`/edit-todo/${id}`]);
  }

  confirmDelete(id: number, label: string) {
    if (confirm(`Are you sure you want to delete "${label}"?`)) {
      this.deleteTask(id, label);
    }
  }

  deleteTask(id: number, label: string) {
    return this.api.deleteTask(id).subscribe(async res => {
      if (res) {
        this.flashMessage.showFlashMessage({
          messages: [`The task: "${label}" has been deleted`],
          dismissible: true,
          timeout: 4000,
          type: 'danger'
        });
        this.tasks = this.tasks.filter((t) => t.id !== id);
      }
    }),
      this.flashMessage.showFlashMessage({
        messages: [`Oops, something went wrong... try again?`],
        dismissible: true,
        timeout: 4000,
        type: 'warning'
      }),
      err => console.log(err);
  }
}
