import { useState } from 'react';
import { nanoid } from 'nanoid';

export interface Task {
  id: string;
  title: string;
}

export const useTaskManager = (): {
  title: string,
  setTitle: (title: string) => void,
  searchKeyword: string,
  setSearchKeyword: (keyword: string) => void,
  tasks: Task[],
  completeTask: (id: string) => void,
  updateTask: (id: string, taskUpdate: Task) => void,
  addTask: () => void,
  handleSearch: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  filteredTasks: Task[]
} => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Task): void => {
    const newTasks = tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    newTasks[index] = taskUpdate;
    setTasks(newTasks);
  };

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }
    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    setTitle,
    searchKeyword,
    setSearchKeyword,
    tasks,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
  };
};