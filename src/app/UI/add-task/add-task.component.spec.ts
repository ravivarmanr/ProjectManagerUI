import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../../Services/shared.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { OrderbyPipe } from '../../Pipes/orderby.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let mockService = jasmine.createSpyObj(['GetAllTasks']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [AddTaskComponent,
        FilterPipe,
        OrderbyPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SharedService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, userValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
