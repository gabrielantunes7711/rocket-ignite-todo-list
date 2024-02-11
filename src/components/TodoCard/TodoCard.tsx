import { Check, Trash } from "phosphor-react";
import styles from "./TodoCard.module.css";
import { TodoItem } from "../Content/Content";
import { AnimatePresence, motion } from "framer-motion";

interface TodoCardProps {
  data: TodoItem;
  handleChangeTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

export const TodoCard = ({
  data,
  handleChangeTaskStatus,
  handleDeleteTask,
}: TodoCardProps) => {
  const { isChecked, id, content } = data;
  return (
    <motion.div
      key={id}
      animate={{ opacity: [0, 1], x: [-100, 10, 0] }}
      exit={{ opacity: 0, x: 100 }}
      className={styles.todoCard}
    >
      <button
        className={isChecked ? styles.btnChecked : styles.check}
        title="Finalizar tarefa"
        onClick={() => handleChangeTaskStatus(id)}
      >
        {isChecked && <Check weight="bold" />}
      </button>
      <p className={isChecked ? styles.textChecked : styles.text}>{content}</p>
      <button
        className={styles.exclude}
        title="Excluir tarega"
        onClick={() => handleDeleteTask(id)}
      >
        <Trash size={18} />
      </button>
    </motion.div>
  );
};
