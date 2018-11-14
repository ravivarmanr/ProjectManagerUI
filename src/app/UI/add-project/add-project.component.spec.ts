import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../../Services/shared.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { OrderbyPipe } from '../../Pipes/orderby.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

import { AddProjectComponent } from './add-project.component';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let mockService = jasmine.createSpyObj(['GetAllProjects']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
              ],
      declarations: [ AddProjectComponent ,
        FilterPipe,
        OrderbyPipe ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: SharedService, useValue: mockService },
          {provide: APP_BASE_HREF, useValue: '/' },
          {provide: MatDialogRef, userValue: {}}
        ]
    });
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
