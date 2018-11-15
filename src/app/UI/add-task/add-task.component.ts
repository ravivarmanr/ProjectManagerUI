import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchProjectComponent } from '../Common/search-project/search-project.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Project } from 'src/app/Models/project';
import { SearchParentComponent } from '../Common/search-parent/search-parent.component';
import { Parent } from 'src/app/Models/parent';
import { SearchUserComponent } from '../Common/search-user/search-user.component';
import { User } from 'src/app/Models/user';
import { SharedService } from 'src/app/Services/shared.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  AddTaskForm: FormGroup;

  searchProjectDialogRef: MatDialogRef<SearchProjectComponent>;
  selectedProjectId: number;

  searchParentDialogRef: MatDialogRef<SearchParentComponent>;
  selectedParentId: number;

  searchUserDialogRef: MatDialogRef<SearchUserComponent>;
  selectedUserId: number;

  isParentTask: boolean;
  // today: Date;
  // nextDay: Date;

  submitted = false;
  // SubmitButton = "Add";

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private taskService: SharedService) { }

  ngOnInit() {
    this.selectedProjectId = null;
    this.selectedParentId = null;
    this.selectedUserId = null;
    this.isParentTask = false;
    let today = new Date();
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    this.buildTaskForm();
  }


  buildTaskForm(): void {
    this.AddTaskForm = this.formBuilder.group({

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

  ActionParent(e: any) {
    console.log('checked - ' + e.checked);
    this.ActivateControls(e.checked);
    if (e.checked) {
      // console.log('checked - ' + e.checked);

      return;
    }

  }

  ActivateControls(isParent: boolean) {
    console.log(isParent);
    this.isParentTask = isParent;
    console.log('button ' + this.isParentTask);

    if (isParent) {
      console.log('disable');
      this.AddTaskForm.patchValue({
        TaskPriority: '',
        ProjectName: '',
        startDate: '',
        endDate: '',
        ParentTask: '',
        UserName: ''
      });
      this.AddTaskForm.controls['TaskPriority'].disable();
      this.AddTaskForm.controls['ProjectName'].disable();
      this.AddTaskForm.controls['startDate'].disable();
      this.AddTaskForm.controls['endDate'].disable();
      this.AddTaskForm.controls['ParentTask'].disable();
      this.AddTaskForm.controls['UserName'].disable();
      // this.AddTaskForm.controls['SearchProject'].disable();
    }
    else {
      console.log('enable');
      this.AddTaskForm.controls['TaskPriority'].enable();
      this.AddTaskForm.controls['ProjectName'].enable();
      this.AddTaskForm.controls['startDate'].enable();
      this.AddTaskForm.controls['endDate'].enable();
      this.AddTaskForm.controls['ParentTask'].enable();
      this.AddTaskForm.controls['UserName'].enable();
      // this.AddTaskForm.controls['SearchProject'].enable();
    }
  }

  resetForm() {
    console.log('reset');
    this.AddTaskForm.reset();
    this.ActivateControls(false);
  }

  Validate(): boolean{
    let taskInput = this.AddTaskForm.value;

    if (taskInput.endDate < taskInput.startDate){
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddTaskForm.invalid) {
      return;
    }

    if(!this.Validate()) {
      alert('Task End Date should not be less than Start Date.');
      return;
    }

    this.AddTaskForm.value.AddDate = new Date();

    if (this.isParentTask) {

      this.AddTaskForm.value.ProjectId = '';
      this.AddTaskForm.value.ParentId = '';
      this.AddTaskForm.value.UserId = '';

      this.AddTaskForm.value.ParentTask = this.AddTaskForm.value.Task;
      this.AddTaskForm.value.ParentStatus = 'Y';

      console.log(this.AddTaskForm.value.TaskId);
      this.AddParentTask(this.AddTaskForm.value);

    }
    else {

      this.AddTaskForm.value.TaskStatus = 'Y';
      this.AddTaskForm.value.ProjectId = this.selectedProjectId;
      this.AddTaskForm.value.ParentId = this.selectedParentId;
      this.AddTaskForm.value.UserId = this.selectedUserId;

      if (!this.AddTaskForm.value.TaskId) {

        console.log('Porject ID Not Blank');
        console.log(this.AddTaskForm.value.TaskId);
        this.AddTask(this.AddTaskForm.value);
      }
      // else {
      //   console.log('Project ID Blank');
      //   console.log(this.AddProjectForm.value.ProjectId);
      //   this.addProject(this.AddProjectForm.value);

      // }
    }
  }

  AddParentTask(parentTaskValue: any) {
    console.log('Parent task value  -  ' + this.AddTaskForm.value);

    this.taskService.addParentTask(this.AddTaskForm.value)
      .subscribe(data => {
        console.log('added the data');
        alert('Parent task added successfully!');
        this.resetForm();
      });
    return;
  }

  AddTask(taskValue: any) {

    // this.AddTaskForm.value.DateReqd = this.setDateReq(this.AddProjectForm.value.DateReqd);

    console.log('taskvalue  -  ' + this.AddTaskForm.value);

    this.taskService.addTask(this.AddTaskForm.value)
      .subscribe(data => {
        console.log('added the data');
        alert('Task added successfully!');
        this.resetForm();
      });
    return;
  }


  // convenience getter for easy access to form fields
  get formfields() { return this.AddTaskForm.controls; }

  openSearchProject() {
    this.searchProjectDialogRef = this.dialog.open(SearchProjectComponent, { height: '450px' });

    this.searchProjectDialogRef.afterClosed().subscribe((selectedProject: Project) => {
      console.log(selectedProject);
      if (selectedProject) {
        this.AddTaskForm.patchValue({
          ProjectName: selectedProject.ProjectName
        });
        this.selectedProjectId = selectedProject.ProjectId;
      }
    })
  }

  openSearchParent() {
    this.searchParentDialogRef = this.dialog.open(SearchParentComponent, { height: '450px' });

    this.searchParentDialogRef.afterClosed().subscribe((selectedParent: Parent) => {
      console.log(selectedParent);
      if (selectedParent) {
        this.AddTaskForm.patchValue({
          ParentTask: selectedParent.ParentTask
        });
        this.selectedParentId = selectedParent.ParentId;
      }
    })
  }

  openSearchUser() {
    this.searchUserDialogRef = this.dialog.open(SearchUserComponent, { height: '450px' });

    this.searchUserDialogRef.afterClosed().subscribe((selectedUser: User) => {
      console.log(selectedUser);
      if (selectedUser) {
        this.AddTaskForm.patchValue({
          UserName: selectedUser.FirstName + ' ' + selectedUser.LastName
        });
        this.selectedUserId = selectedUser.UserId;
      }
    })
  }

}
