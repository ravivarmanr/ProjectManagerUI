import { Task } from "src/app/Models/task";

export const MockTask: Task[] = [
    {
        TaskId: 1,
        Task: 'Create Test Case',
        ParentId: 0,
        TaskPriority: 1,
        StartDate: new Date,
        EndDate: new Date,
        TaskStatus: 'Y',
        UserId: 1,
        AddDate: new Date,
        UpdtDate: new Date,
        ProjectId: 1,
        ParentTask: 'Test',
        UserName: 'Ravi Ramm',
        ProjectName: 'ProjectManager'
    },
    {

        TaskId: 2,
        Task: 'Create Test plan',
        ParentId: 1,
        TaskPriority: 2,
        StartDate: new Date,
        EndDate: new Date,
        TaskStatus: 'Y',
        UserId: 2,
        AddDate: new Date,
        UpdtDate: new Date,
        ProjectId: 1,
        ParentTask: 'Test',
        UserName: 'Ravi Ramm',
        ProjectName: 'ProjectManager'
    },
    {

        TaskId: 3,
        Task: 'Create Test execution',
        TaskPriority: 2,
        StartDate: new Date,
        EndDate: new Date,
        TaskStatus: 'N',
        ParentId: 2,
        UserId: 1,
        AddDate: new Date,
        UpdtDate: new Date,
        ProjectId: 2,
        ParentTask: 'Test',
        UserName: 'Ravi Ramm',
        ProjectName: 'ProjectManager'
    }

]