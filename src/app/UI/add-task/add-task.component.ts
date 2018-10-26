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

  submitted = false;
  // SubmitButton = "Add";

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private taskService: SharedService) { }

  ngOnInit() {
    this.selectedProjectId = null;
    this.selectedParentId = null;
    this.selectedUserId = null;
    this.buildTaskForm();
  }


  buildTaskForm(): void {
    this.AddTaskForm = this.formBuilder.group({

      TaskId:  [''],
      Task: ['', Validators.required],
      TaskPriority: new FormControl(0, Validators.min(1)),
      startDate: new FormControl('', Validators.required) ,
      endDate: new FormControl('', Validators.required) ,
      TaskStatus: [''],
      chkParentTask: new FormControl(''),
      ParentId:[''],
      ParentTask: new FormControl(''),
      UserId:[''],
      UserName: new FormControl(''),
      AddDate: [''],
      UpdtDate: [''],
      ProjectId: [''],
      ProjectName: ['', Validators.required]
    });
  }



  resetForm() {
    console.log('reset');
    this.AddTaskForm.reset();
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddTaskForm.invalid) {
      return;
    }
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

  AddTask(taskValue: any) {

    // this.AddTaskForm.value.DateReqd = this.setDateReq(this.AddProjectForm.value.DateReqd);

    console.log('taskvalue  -  ' + this.AddTaskForm.value);
    
    this.taskService.addTask(this.AddTaskForm.value)
      .subscribe(data => {
        console.log('added the data');
        this.resetForm();
      });
    return;
  }


// convenience getter for easy access to form fields
get formfields() { return this.AddTaskForm.controls; }

  openSearchProject(){
    this.searchProjectDialogRef = this.dialog.open(SearchProjectComponent, { height: '450px'});

    this.searchProjectDialogRef.afterClosed().subscribe((selectedProject: Project) =>{
      console.log(selectedProject);
      if (selectedProject){
        this.AddTaskForm.patchValue({
          ProjectName: selectedProject.ProjectName
        });
        this.selectedProjectId = selectedProject.ProjectId;
      }
    })
 }

 openSearchParent(){
  this.searchParentDialogRef = this.dialog.open(SearchParentComponent, { height: '450px'});

  this.searchParentDialogRef.afterClosed().subscribe((selectedParent: Parent) =>{
    console.log(selectedParent);
    if (selectedParent){
      this.AddTaskForm.patchValue({
        ParentTask: selectedParent.ParentTask
      });
      this.selectedParentId = selectedParent.ParentId;
    }
  })
 }

 openSearchUser(){
  this.searchUserDialogRef = this.dialog.open(SearchUserComponent, { height: '450px'});

  this.searchUserDialogRef.afterClosed().subscribe((selectedUser: User) =>{
    console.log(selectedUser);
    if (selectedUser){
      this.AddTaskForm.patchValue({
        UserName: selectedUser.FirstName + ' ' + selectedUser.LastName
      });
      this.selectedUserId = selectedUser.UserId;
    }
  })
 }

}
