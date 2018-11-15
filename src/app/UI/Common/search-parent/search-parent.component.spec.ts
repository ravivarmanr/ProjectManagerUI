import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../../../Services/shared.service';
import { FilterPipe } from '../../../Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

import { SearchParentComponent } from './search-parent.component';

describe('SearchParentComponent', () => {
  let component: SearchParentComponent;
  let fixture: ComponentFixture<SearchParentComponent>;
  let mockService = jasmine.createSpyObj(['getParentTasks']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [SearchParentComponent,
        FilterPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SharedService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, userValue: {} }
      ]
    });
    fixture = TestBed.createComponent(SearchParentComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
