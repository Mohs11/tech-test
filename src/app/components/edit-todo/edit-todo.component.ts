import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  @ViewChild('taskForm', {static: false}) from: Task;

  id: number
  task: any;
  loading = true;
  checked = true;

  constructor(
    private activeRouter: ActivatedRoute,
    private api: ApiService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.params.id
    this.getTask(this.id);

  }

  getTask(id: number) {
    this.api.getTask(id).subscribe(res => {
      this.task = res;
      this.checked = this.task.done !== 'Not Yet';
      this.loading = false;
    });
  }

  updateDone() {
    this.checked = !this.checked;
  }

  onSubmit({valid}: {value: Task, valid: boolean}) {
    if (!valid) {
      this.flashMessage.showFlashMessage({
        messages: ["Please fill out the form correctly"], 
        dismissible: true, 
        timeout: 4000,
        type: 'danger'
      });
    } else {
      if (!this.checked) {
        this.task.done = 'Not Yet';
      }
      this.api.updateTask(this.task).subscribe(res => {
        if (res) {
          this.flashMessage.showFlashMessage({
            messages: [`The task: "${this.task.label}" has been updated`], 
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
