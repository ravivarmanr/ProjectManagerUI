import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/Services/shared.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Project } from 'src/app/Models/project';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {

  projectList: Project[];

  constructor(private dialogRef: MatDialogRef<SearchProjectComponent>, private projectService: SharedService) { }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    this.projectService.getProjectList()
      .subscribe(data => {
        this.projectList = data;
        console.log(this.projectList)
      });
  }

  selectProject(project: Project) {
    this.dialogRef.close(project);
  }

}
