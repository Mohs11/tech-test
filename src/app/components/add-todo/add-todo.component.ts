import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @ViewChild('taskForm', {static: false}) from: Task;

  task: Task = {
    id: 0,
    label: '',
    description: '',
    category: '',
    done: 'Not Yet',
  }

  constructor(
    private flashMessage: NgFlashMessageService,
    private api: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Task, valid: boolean}) {
    if (!valid) {
      this.flashMessage.showFlashMessage({
        messages: ["Please fill out the form correctly"], 
        dismissible: true, 
        timeout: 4000,
        type: 'danger'
      });
    } else {
      this.api.addTask(this.task).subscribe(res => {
        if (res) {
          this.flashMessage.showFlashMessage({
            messages: [`The task: "${this.task.label}" has been added`], 
            dismissible: true, 
            timeout: 4000,
            type: 'success'
          });
          this.router.navigate(['/'])
        }
      }),
      err => console.log(err)
    }
  }
}
