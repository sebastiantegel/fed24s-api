export class Todo {
  done: boolean;

  constructor(public id: number, public text: string) {
    this.done = false;
  }
}
