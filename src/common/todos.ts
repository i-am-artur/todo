export interface ITodoContent {
  title: string;
  note: string;
}

export interface ITodo extends ITodoContent {
  id: number;
}
