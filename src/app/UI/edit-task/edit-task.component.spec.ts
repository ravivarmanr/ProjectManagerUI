import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../../Services/shared.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { OrderbyPipe } from '../../Pipes/orderby.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule, routingComponents } from '../../app-routing.module';
import { MaterialModule } from 'src/app/material';
import { MockRouter, MockActivateRoute } from '../../../testing/mock-router.mock';
import { SearchProjectComponent } from 'src/app/UI/Common/search-project/search-project.component';
import { Project } from 'src/app/Models/project';

import { EditTaskComponent } from './edit-task.component';


describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let mockService = jasmine.createSpyObj(['AddUser']);
  let taskService = jasmine.createSpyObj(['AddTask']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        AppRoutingModule,
        MaterialModule
              ],
      declarations: [ 
        EditTaskComponent, 
        FilterPipe,
         OrderbyPipe,
        SearchProjectComponent ,
        Project
      ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: SharedService, useValue: mockService },
          {provide: SharedService, useValue: taskService },
          {provide: Router, useClass: MockRouter },
          {provide: ActivatedRoute, useClass: MockActivateRoute},
          {provide: APP_BASE_HREF, useValue: '/' }
        ]
    });
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
