import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { User } from 'src/app/Models/user';
// import {MaterialModule} from '../../material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  AddUserForm: FormGroup;
  submitted = false;
  userList: User[];
  SubmitButton = "Add";

  //sorting params
  path: string[] = ['EmpId'];
  order: number = 1; //1 asc and -1 desc;

  constructor(private formBuilder: FormBuilder, private addUserService: SharedService) { }

  ngOnInit() {
    this.getUserList();
    this.buildAddForm();
    // this.AddUserForm = this.formBuilder.group({
    //   UserId: [''],
    //   FirstName: ['', Validators.required],
    //   LastName: ['', Validators.required],
    //   EmpId: ['', Validators.required],
    // });
  }

  sortList(prop: string){
    // console.log(prop);
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
  }

  // convenience getter for easy access to form fields
  get formfields() { return this.AddUserForm.controls; }

  getUserList(): void {
    this.addUserService.getUserList()
      .subscribe(data => {
        this.userList = data;
      })
  }

  resetForm() {
    console.log('reset');
    this.SubmitButton = "Add";
    this.getUserList();
    this.AddUserForm.reset();
  }

  editUser(user: User): void {
    console.log(user);
    this.SubmitButton = "Update";
    this.buildAddForm();
    this.setFormValues(user);
  }

  deleteUser(user: User): void {
    console.log(user);
    this.setFormValues(user);
    this.AddUserForm.value.UserStatus = 'N';
    this.updateUser(this.AddUserForm.value);
    this.resetForm();
  }

  buildAddForm(): void {
    this.AddUserForm = this.formBuilder.group({
      UserId: [''],
      FirstName: ['', Validators.required],
      LastName: new FormControl('', Validators.required),
      EmpId: new FormControl('', {
        validators: [Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6),
        Validators.maxLength(6)]
      }),
      UserStatus: [''],
      AddDate: [''],
      UpdtDate: ['']
    });
  }

  setFormValues(user: User): void {
    this.AddUserForm.setValue({
      UserId: user.UserId,
      FirstName: user.FirstName,
      LastName: user.LastName,
      EmpId: user.EmpId,
      UserStatus: user.UserStatus,
      AddDate: user.AddDate,
      UpdtDate: user.UpdtDate
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddUserForm.invalid) {
      return;
    }
    this.AddUserForm.value.UserStatus = 'Y';
    if (this.AddUserForm.value.UserId) {

      console.log('Usr ID Not Blank');
      console.log(this.AddUserForm.value.UserId);
      this.updateUser(this.AddUserForm.value);
    }
    else {
      console.log('Usr ID Blank');
      console.log(this.AddUserForm.value.UserId);
      this.addUser(this.AddUserForm.value);
      
    }
  
  }

  updateUser(userValue: any) {
    this.addUserService.updateUser(userValue)
      .subscribe(data => {
        this.resetForm();
        console.log('updated the data');
      });
    return;
  }

  addUser(userValue: any){
    this.addUserService.addUser(this.AddUserForm.value)
    .subscribe(data => {
      // this.router.navigate(['view-task']);
      console.log('added the data');
      this.resetForm();
      
    });
    return;
  }

}