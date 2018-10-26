import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/Services/shared.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Parent } from 'src/app/Models/parent';


@Component({
  selector: 'app-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.css']
})
export class SearchParentComponent implements OnInit {

  parentList: Parent[];

  constructor(private dialogRef:MatDialogRef<SearchParentComponent>, private parentService: SharedService) { }

  ngOnInit() {
    this.getParentList();
  }

  getParentList(){
    this.parentService.getParentList()
      .subscribe(data => {
        this.parentList = data;
        console.log(this.parentList)
      });
  }

  selectParent(parent: Parent){
    this.dialogRef.close(parent);
  }

}
