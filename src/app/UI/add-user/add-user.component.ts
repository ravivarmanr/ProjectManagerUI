import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { User } from 'src/app/Models/user';

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
  }

  //for sorting
  sortList(prop: string) {
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
    this.AddUserForm.controls['EmpId'].enable();
  }

  buildAddForm(): void {
    this.AddUserForm = this.formBuilder.group({
      UserId: [''],
      FirstName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
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

  validate(employeeId: number) {
    var isExistingId = this.userList.some(function (emplst) { return emplst.EmpId == employeeId });
    return !isExistingId;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddUserForm.invalid) {
      return;
    }

    if (!this.validate(this.AddUserForm.value.EmpId)) {
      alert('The entered Employee Id ' + this.AddUserForm.value.EmpId + ' already exists');
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

  addUser(userValue: any) {
    this.addUserService.addUser(this.AddUserForm.value)
      .subscribe(data => {
        console.log('added the data');
        alert('The user have been added successfuly.');
        this.resetForm();
      });
    return;
  }

  editUser(user: User): void {
    console.log(user);
    this.SubmitButton = "Update";
    this.buildAddForm();
    this.setFormValues(user);
    this.AddUserForm.controls['EmpId'].disable();
  }

  updateUser(userValue: any) {
    this.addUserService.updateUser(userValue)
      .subscribe(data => {
        console.log('updated the data');
        alert('The user have been updated successfuly.');
        this.resetForm();
      });
    return;
  }

  deleteUser(user: User): void {
    console.log(user);
    this.setFormValues(user);
    this.AddUserForm.value.UserStatus = 'N';

    this.addUserService.updateUser(user)
      .subscribe(data => {
        console.log('deleted the data');
        alert('The user have been deleted successfuly.');
        this.resetForm();
      });
    return;
  }

}