import { FormEvent, useState } from "react";
import styles from "./Content.module.css";
import { PlusCircle } from "phosphor-react";
import { TodoCard } from "../TodoCard/TodoCard";
import { AnimatePresence } from "framer-motion";

export interface TodoItem {
  id: number;
  isChecked: boolean;
  content: string;
}

export const Content = () => {
  const [todoList, setTodoList] = useState<TodoItem[] | []>([]);
  const [newTodo, setNewTodo] = useState("");
  const totalCheckedTasks = todoList.filter(
    ({ isChecked }) => isChecked
  ).length;
  const totalTasks = todoList.length;

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();

    if (newTodo === "") return;

    const newTodoObject = {
      id: Math.random(),
      isChecked: false,
      content: newTodo,
    };
    setTodoList([...todoList, newTodoObject]);
    setNewTodo("");
  }

  function changeTaskStatus(id: number) {
    const newTodoArray = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      }

      return todo;
    });

    setTodoList(newTodoArray);
  }

  function deleteTask(id: number) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);

    setTodoList(newTodoList);
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button type="submit">
          Criar <PlusCircle size={18} />
        </button>
      </form>

      <div className={styles.infosWrapper}>
        <span className={styles.info}>
          Tarefas criadas <span>{totalTasks}</span>
        </span>
        <span className={styles.info}>
          Concluídas
          <span>
            {totalCheckedTasks} de {totalTasks}
          </span>
        </span>
      </div>

      <div className={styles.todoWrapper}>
        <AnimatePresence>
          {todoList.map((todo) => (
            <TodoCard
              key={todo.id}
              data={todo}
              handleChangeTaskStatus={changeTaskStatus}
              handleDeleteTask={deleteTask}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
