import { FC } from "react"
import arrowDown from "../assets/down-arrow.svg"

interface ITodoInput {
  addTodo: (text: string) => void
}

const TodoInput: FC<ITodoInput> = ({ addTodo }) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputElement = e.currentTarget[0] as HTMLInputElement
    addTodo(inputElement.value)
    inputElement.value = ""
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center items-center w-full border-b p-3"
    >
      <img src={arrowDown} alt="arrow down" className="w-5 mx-2 opacity-30" />
      <input
        className="w-full p-3 border-none outline-none opacity-50"
        type="text"
        placeholder="What needs to be done?"
      />
    </form>
  )
}

export default TodoInput
