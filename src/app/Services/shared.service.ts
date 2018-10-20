import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../Models/task';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;


  addUser(user: User) {
    console.log(user);
    return this.http.post(this.baseUrl + '/AddUser', user);
  }

  getUser(userId: number): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/GetUser/' + userId);
  }

  updateUser(user: User){
    console.log("update");
    console.log(user);
    return this.http.put(this.baseUrl+'/UpdateUser', user);
  }

  getUserList(){
    return this.http.get<User[]>(this.baseUrl + '/GetAllUsers');
  }
  
  getTaskList(){
    console.log(this.baseUrl);
    return this.http.get<Task[]>(this.baseUrl + '/GetAllTasks');
  }

  // createTask(task: Task) {
  //   console.log(task);
  //   return this.http.post(this.baseUrl + '/Add', task);
  // }

  
  // getTaskById(id): Observable<Task> {
  //   return this.http.get<Task>(this.baseUrl+'/Get/'+id);
  // }

  // updateTaskDetail(task: Task) {
  //   console.log(task);
  //   return this.http.put(this.baseUrl+'/Update', task);
  // }

  // endTask(id): Observable<Task> {
  //   console.log(id);
  //   return this.http.get<Task>(this.baseUrl+'/End/'+id);
  // }


}
