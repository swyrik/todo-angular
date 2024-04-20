import Task from "./task.model";

export default interface TaskList {
  name : string;
  Tasks: Task[];
  id: string;
}
