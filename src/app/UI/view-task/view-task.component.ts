import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

Tasks: Task[];

  constructor(private TaskDetailService: SharedService) { }

  ngOnInit() {
    this.LoadTaskDetails();
    console.log(this.Tasks);
  }

  LoadTaskDetails(): void{
    this.TaskDetailService.getTaskList()
    .subscribe( data => {
      this.Tasks = data;
    });
  }

}
