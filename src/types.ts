export interface Diary {
  id: number;
  author: string;
  content: string;
  emotion: number;
  created_date: number;
}

export interface DiaryActions {
  onRemove: (targetId: number) => void;
  onEdit: (targetId: number, newContent: string) => void;
}
