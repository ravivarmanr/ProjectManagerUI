import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SearchUserComponent } from 'src/app/UI/Common/search-user/search-user.component';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  
  AddProjectForm: FormGroup;
  selectedMgrId: number;
  searchUserDialogRef: MatDialogRef<SearchUserComponent>;
  projectList: Project[];
  searchProps: string[] = ['ProjectName','TaskCount','StartDate', 'Completed','EndDate','ProjectPriority'];

  submitted = false;
  SubmitButton = "Add";

  searchTerm: string = undefined;
  
//sorting params
path: string[] = ['StartDate'];
order: number = 1; //1 asc and -1 desc;

  constructor(private formBuilder: FormBuilder, private addProjectService: SharedService, private dialog: MatDialog) { }

  
  ngOnInit() {
    this.selectedMgrId = null;
    this.getProjectList();
    this.buildPorjectForm();
    // console.log(this.projectList);
  }

  //for sorting
  sortList(prop: string){
    // console.log(prop);
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
  }

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  
  // convenience getter for easy access to form fields
  get formfields() { return this.AddProjectForm.controls; }

  buildPorjectForm(): void {
    this.AddProjectForm = this.formBuilder.group({
      ProjectId: [''],
      projectName: new FormControl('', {validators:[Validators.required, Validators.minLength(3)]}),
      DateReqd: new FormControl(false),
      startDate: new FormControl({value: null, disabled: true}) ,
      endDate: new FormControl({value: null, disabled: true}) ,
      ProjectPriority: new FormControl(0, Validators.min(1)),
      projectStatus: [''],
      AddDate: [''],
      UpdtDate: [''],
      manager: new FormControl('', Validators.required),
      managerId: [''],
      taskCount: [0],
      completedTasks: [0],
    });
  }

  setFormValues(project: Project): void {
    console.log('set form values');
    console.log(project);
    console.log(this.setIsDateRequired(project.DateReqd));

    this.AddProjectForm.setValue({
      ProjectId: project.ProjectId,
      projectName: project.ProjectName,
      DateReqd: this.setIsDateRequired(project.DateReqd),
      startDate: project.StartDate,
      endDate: project.EndDate,
      ProjectPriority: project.ProjectPriority,
      projectStatus: project.ProjectStatus,
      manager: project.ManagerName,
      managerId: project.ManagerId,
      AddDate: project.AddDate,
      UpdtDate: project.UpdtDate,
      taskCount: project.TaskCount,
      completedTasks: project.CompletedTasks
    })
  }

  setIsDateRequired(datReq: any): boolean {
    if (!datReq || datReq == 'N')    {
      // this.AddProjectForm.value.DateReqd = 'N'
      return false;
    }
    else{
      // this.AddProjectForm.value.DateReqd = 'Y'
      return true;
    }
  }

  toggleDate(){

    console.log('toggle 1' +   this.AddProjectForm.value.DateReqd);

    if(!this.AddProjectForm.value.DateReqd){
      console.log('this one for null check')
    }

      // let DateReqd = (!this.AddProjectForm.value.DateReqd)?true:this.AddProjectForm.value.DateReqd;
      let DateReqd = this.AddProjectForm.value.DateReqd;
      
      console.log('toggle 2' +  DateReqd);
      if (DateReqd){
        let today = new Date();
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        this.AddProjectForm.patchValue({
          startDate: today,
          endDate: nextDay
        });
        this.AddProjectForm.controls['startDate'].enable();
        this.AddProjectForm.controls['endDate'].enable();
      }
      else{
        this.AddProjectForm.patchValue({
          startDate: null,
          endDate: null
        });
        this.AddProjectForm.controls['startDate'].disable();
        this.AddProjectForm.controls['endDate'].disable();
      }
  }

  resetForm() {
    console.log('reset');
    this.SubmitButton = "Add";
    this.getProjectList();
    this.AddProjectForm.reset();
    this.toggleDate();
  }

  editProject(project: Project): void {
    console.log('edit');
    console.log(project);
    this.SubmitButton = "Update";
    this.buildPorjectForm();
    this.setFormValues(project);
  }

  suspendProject(project: Project): void{
    console.log('suspend');
    console.log(project);
    this.setFormValues(project);
    this.AddProjectForm.value.projectStatus='N';
    this.updateProject(this.AddProjectForm.value);
    this.resetForm();
  }
 
  openSearchManager(){
     this.searchUserDialogRef = this.dialog.open(SearchUserComponent, { height: '450px'});

     this.searchUserDialogRef.afterClosed().subscribe((selectedUser: User) =>{
       console.log(selectedUser);
       if (selectedUser){
         this.AddProjectForm.patchValue({
           manager: selectedUser.FirstName + ' ' + selectedUser.LastName
         });
         this.selectedMgrId = selectedUser.UserId;
       }
     })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddProjectForm.invalid) {
      return;
    }
    
    if(!this.Validate()) {
      alert('Project End Date should not be less than Start Date.');
      return;
    }
    
    this.AddProjectForm.value.ProjectStatus = 'Y';
    this.AddProjectForm.value.ManagerId = this.selectedMgrId;
    
    if (this.AddProjectForm.value.ProjectId) {

      console.log('Porject ID Not Blank');
      console.log(this.AddProjectForm.value.ProjectId);
      this.updateProject(this.AddProjectForm.value);
    }
    else {
      console.log('Project ID Blank');
      console.log(this.AddProjectForm.value.ProjectId);
      this.addProject(this.AddProjectForm.value);
      
    }
  
  }

  getProjectList(){
    this.addProjectService.getProjectList()
    .subscribe(data => {
      this.projectList = data;
      return;
    })
  }

  updateProject(projectValue: any) {
    console.log(this.AddProjectForm.value.DateReqd);

    this.AddProjectForm.value.DateReqd = this.setDateReq(this.AddProjectForm.value.DateReqd);

    console.log('dateReq' + this.AddProjectForm.value.DateReqd);

    this.addProjectService.updateProject(this.AddProjectForm.value)
      .subscribe(data => {
        console.log('updated the data');
        alert('Project has been updated successfully!');
        this.resetForm();
      });
    return;
  }

  addProject(projectValue: any) {
    console.log('dateReq' + this.AddProjectForm.value.DateReqd);

    this.AddProjectForm.value.DateReqd = this.setDateReq(this.AddProjectForm.value.DateReqd);

    console.log('dateReq' + this.AddProjectForm.value.DateReqd);
    
    this.addProjectService.addProject(this.AddProjectForm.value)
      .subscribe(data => {
        console.log('added the data');
        alert('Project has been added successfully!');
        this.resetForm();
      });
    return;
  }

  Validate(): boolean{
    let projectInput = this.AddProjectForm.value;

    if (projectInput.endDate < projectInput.startDate){
      return false;
    }
    return true;
  }

  setDateReq(datReq: any): string {
    if (datReq == false || datReq == 'N')    {
      // this.AddProjectForm.value.DateReqd = 'N'
      return ('N');
    }
    else if (datReq == true || datReq == 'Y') {
      // this.AddProjectForm.value.DateReqd = 'Y'
      return ('Y');
    }
    else {
      // this.AddProjectForm.value.DateReqd = 'N'
      return ('N');
    }
  }

}
