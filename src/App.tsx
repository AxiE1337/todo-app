import { useMemo, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoItem from "./components/TodoItem"

export interface ITodo {
  id: number
  text: string
  completed: boolean
}
export type FilterValue = "all" | "active" | "completed"

function App() {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,
      text: "Todo 1",
      completed: false,
    },
    {
      id: 2,
      text: "Todo 2",
      completed: true,
    },
  ])
  const [filter, setFilter] = useState<FilterValue>("all")

  const handleAddTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random(),
        text,
        completed: false,
      },
    ])
  }

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active": {
        return todos.filter((todo) => !todo.completed)
      }
      case "completed": {
        return todos.filter((todo) => todo.completed)
      }
      default: {
        return todos
      }
    }
  }, [filter, todos])

  const filterButtons: { name: string; filterValue: FilterValue }[] = [
    { name: "All", filterValue: "all" },
    { name: "Active", filterValue: "active" },
    { name: "Completed", filterValue: "completed" },
  ]

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-slate-200 w-1/3">
        <h1 className="text-6xl font-thin text-rose-300">todos</h1>
        <div className="p-2 w-1/3">
          <TodoInput addTodo={handleAddTodo} />
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggleTodo(todo.id)}
            />
          ))}
        </div>
        <section className="w-full flex justify-evenly">
          <p>
            {filteredTodos.length === 0
              ? "No todos"
              : `${
                  filteredTodos.filter((todo) => !todo.completed).length
                } items left`}
          </p>
          <span className="flex gap-2">
            {filterButtons.map(({ name, filterValue }) => (
              <button
                key={name}
                className={`p-1 rounded ${
                  filter === filterValue ? "border border-rose-300" : ""
                }`}
                onClick={() => setFilter(filterValue)}
              >
                {name}
              </button>
            ))}
          </span>
          <button onClick={handleClearCompleted}>Clear Completed</button>
        </section>
      </div>
    </main>
  )
}

export default App
