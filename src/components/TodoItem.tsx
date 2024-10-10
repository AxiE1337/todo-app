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
    <div
      className="w-full flex gap-4 py-5 px-3 items-center border-b"
      onDoubleClick={() => onToggle(id)}
    >
      <input
        type="checkbox"
        checked={completed}
        className="appearance-none w-8 h-8 rounded-full border border-gray-300 bg-white checked:border-green-400 checked:before:content-['✓'] checked:before:text-green-400 checked:before:text-xl checked:before:absolute checked:before:left-2 checked:before:top-0 focus:outline-none transition duration-200 ease-in-out relative cursor-pointer"
        onChange={() => onToggle(id)}
      />
      {completed ? (
        <h1 className="line-through opacity-50">{text}</h1>
      ) : (
        <h1>{text}</h1>
      )}
    </div>
  )
}

export default TodoItem
