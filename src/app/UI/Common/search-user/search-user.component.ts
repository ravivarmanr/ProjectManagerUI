import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { SharedService } from 'src/app/Services/shared.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  userList:  User[];
  searchTerm: string = undefined;


  constructor(private dialogRef: MatDialogRef<SearchUserComponent>, private userService: SharedService ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList()
      .subscribe(data => {
        this.userList = data;
        console.log(this.userList)
      });
  }

  selectUser(user: User)  {
    this.dialogRef.close(user);
  }

}
