import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { SharedService } from '../../Services/shared.service';
import { Task } from 'src/app/Models/task';

import { SearchProjectComponent } from 'src/app/UI/Common/search-project/search-project.component';
import { Project } from 'src/app/Models/project';
import { Response } from 'selenium-webdriver/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  ViewTaskForm: FormGroup;

  searchProjectDialogRef: MatDialogRef<SearchProjectComponent>;
  selectedProjectId: number;

  TaskList: Task[];

  //sorting params
  path: string[] = ['StartDate'];
  order: number = 1; //1 asc and -1 desc;

  constructor(private TaskDetailService: SharedService, private dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    // console.log(this.TaskList);
    this.buildTaskForm();
  }

  //for sorting
  sortList(prop: string) {
    // console.log(prop);
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
  }


  buildTaskForm(): void {
    this.ViewTaskForm = this.formBuilder.group({

      ProjectName: ['', Validators.required]

    })
  }

  LoadTaskDetails(projectId: number): void {
    this.TaskDetailService.getTaskListByProjId(projectId)
      .subscribe(data => {
        this.TaskList = data;
      });
  }


  // convenience getter for easy access to form fields
  get formfields() { return this.ViewTaskForm.controls; }

  openSearchProject() {
    this.searchProjectDialogRef = this.dialog.open(SearchProjectComponent, { height: '450px' });

    this.searchProjectDialogRef.afterClosed().subscribe((selectedProject: Project) => {
      console.log(selectedProject);
      if (selectedProject) {
        this.ViewTaskForm.patchValue({
          ProjectName: selectedProject.ProjectName

        });
        this.selectedProjectId = selectedProject.ProjectId;
        this.LoadTaskDetails(this.selectedProjectId);
      }
    })
  }

  endTask(taskId) {
    this.TaskDetailService.endTask(taskId)
      .subscribe(response => {
        alert('Task has been completed');
        this.LoadTaskDetails(this.selectedProjectId);
      });

  }

}
