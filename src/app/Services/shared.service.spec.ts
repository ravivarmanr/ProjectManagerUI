import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { SharedService } from './shared.service';
import { Task } from 'src/app/Models/task';
import { MockTask } from '../Models/Mock/mock-task';

describe('SharedService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let projManagerService: SharedService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    projManagerService = TestBed.get(SharedService);
  });

  afterEach(() => {
httpTestingController.verify()
  });

  describe(('#getTaskList'), () => {
    let expectedTasks: Task[];

    beforeEach(() => {
      projManagerService = TestBed.get(SharedService);
      expectedTasks = MockTask;
    });

    it('Should be geting the list of all tasks', () =>{
      projManagerService.getTaskList().subscribe(
        taskList => expect(taskList).toEqual(expectedTasks,'should return the expected list of tasks'), fail
      );

      const req = httpTestingController.expectOne(projManagerService.baseUrl + '/GetAllTasks');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTasks);
    });
  });


});
