import { FC } from "react"

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="What needs to be done?" />
      </form>
    </div>
  )
}

export default TodoInput
