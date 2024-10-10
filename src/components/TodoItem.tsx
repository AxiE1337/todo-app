import { FC } from "react"
import { ITodo } from "../App"

interface ITodoItem {
  todo: ITodo
  onToggle: (id: number) => void
}

const TodoItem: FC<ITodoItem> = ({
  todo: { id, text, completed },
  onToggle,
}) => {
  return (
    <div className="w-full flex">
      <input
        type="checkbox"
        checked={completed}
        className="mr-2"
        onChange={() => onToggle(id)}
      />
      {completed ? (
        <h1 className="line-through opacity-75">{text}</h1>
      ) : (
        <h1>{text}</h1>
      )}
    </div>
  )
}

export default TodoItem
