import Step from "./step.model";

export default interface Task {
  name: string;
  done: boolean;
  id: String;
  date: Date;
  important: boolean;
  steps?: Step[];
  description? : string | null;
  dueDate?: Date;
}
