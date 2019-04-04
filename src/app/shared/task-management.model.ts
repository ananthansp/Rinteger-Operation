export class TaskModel {
    _id: string;
    userId: string;
    taskNo: string;
    dateTime: Date;
    taskTitle: string;
    taskDescription: string;
    priority: string;
    units: string;
    department: string;
    assignedTo: string;
    assignedBy: string;
    status: string;
    toCloseDate: Date;
    closedDate: Date;
}
