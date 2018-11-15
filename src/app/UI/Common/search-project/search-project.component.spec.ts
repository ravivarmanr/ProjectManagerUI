import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../../../Services/shared.service';
import { FilterPipe } from '../../../Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';


import { SearchProjectComponent } from './search-project.component';

describe('SearchProjectComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;
  let mockService = jasmine.createSpyObj(['GetAllProjects']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [SearchProjectComponent,
        FilterPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SharedService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, userValue: {} }
      ]
    });
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
