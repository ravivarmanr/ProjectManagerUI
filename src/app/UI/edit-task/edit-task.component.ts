import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchProjectComponent } from 'src/app/UI/Common/search-project/search-project.component';
import { SearchParentComponent } from 'src/app/UI/Common/search-parent/search-parent.component';
import { SearchUserComponent } from 'src/app/UI/Common/search-user/search-user.component';
import { SharedService } from 'src/app/Services/shared.service';
import { Project } from 'src/app/Models/project';
import { Parent } from 'src/app/Models/parent';
import { User } from 'src/app/Models/user';
import { Task } from 'src/app/Models/task';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  EditTaskForm: FormGroup;

  searchProjectDialogRef: MatDialogRef<SearchProjectComponent>;
  selectedProjectId: number;

  searchParentDialogRef: MatDialogRef<SearchParentComponent>;
  selectedParentId: number;

  searchUserDialogRef: MatDialogRef<SearchUserComponent>;
  selectedUserId: number;

  isParentTask: boolean;
  // today: Date;
  // nextDay: Date;

  taskId: number;
  private sub: any;

  currentTask: Task;
  modifiedTask: Task;

  submitted = false;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private taskService: SharedService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.selectedProjectId = null;
    this.selectedParentId = null;
    this.selectedUserId = null;
    this.isParentTask = false;
    let today = new Date();
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    this.buildTaskForm();

    this.sub = this.route.params.subscribe(params => {
      this.taskId = + params['taskId'];
      this.loadTask();
    })

  }

  loadTask() {
    this.taskService.getTaskById(this.taskId)
      .subscribe(task => {
        this.currentTask = task;
        this.loadForm();
      });
  }

  loadForm() {
    this.EditTaskForm.patchValue({
      ProjectName: this.currentTask.ProjectName,
      Task: this.currentTask.Task,
      TaskPriority: this.currentTask.TaskPriority,
      ParentTask: this.currentTask.ParentTask,
      startDate: new Date(this.currentTask.StartDate),
      endDate: new Date(this.currentTask.EndDate),
      UserName: this.currentTask.UserName
    })
    this.selectedParentId = this.currentTask.ParentId
  }


  buildTaskForm(): void {
    this.EditTaskForm = this.formBuilder.group({

      TaskId: [''],
      Task: ['', Validators.required],
      TaskPriority: new FormControl(0, Validators.min(1)),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      TaskStatus: [''],
      chkParentTask: new FormControl(''),
      ParentId: [''],
      ParentTask: new FormControl(''),
      UserId: [''],
      UserName: new FormControl(''),
      AddDate: [''],
      UpdtDate: [''],
      ProjectId: [''],
      ProjectName: ['', Validators.required],
      ParentStatus: ['']
    });
  }

  resetForm() {
    console.log('reset');
    this.loadTask();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.EditTaskForm.invalid) {
      return;
    }

    this.EditTaskForm.value.ParentId = this.selectedParentId;
    this.EditTaskForm.value.UpdtDate = new Date();
    this.EditTaskForm.value.TaskId = this.currentTask.TaskId;

    if (this.EditTaskForm.value.TaskId) {

      console.log('task ID Not Blank');
      this.UpdateTask(this.EditTaskForm.value);
    }

  }

  UpdateTask(taskValue: any) {

    console.log('taskvalue  -  ' + this.EditTaskForm.value);

    this.taskService.updateTaskDetail(this.EditTaskForm.value)
      .subscribe(data => {
        console.log('updated the data');
        alert('Sucessfully updated the task.');
        this.router.navigateByUrl('/view-task');
      });
    return;
  }

  // convenience getter for easy access to form fields
  get formfields() { return this.EditTaskForm.controls; }


  openSearchParent() {
    this.searchParentDialogRef = this.dialog.open(SearchParentComponent, { height: '450px' });

    this.searchParentDialogRef.afterClosed().subscribe((selectedParent: Parent) => {
      console.log(selectedParent);
      if (selectedParent) {
        this.EditTaskForm.patchValue({
          ParentTask: selectedParent.ParentTask
        });
        this.selectedParentId = selectedParent.ParentId;
      }
    })
  }

  cancelForm() {
    this.EditTaskForm.reset();
    this.router.navigateByUrl('/view-task');
  }

}
