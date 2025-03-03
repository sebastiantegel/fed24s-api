export class TodoDTO {
  done: boolean;

  constructor(public id: number, public text: string) {
    this.done = false;
  }
}
