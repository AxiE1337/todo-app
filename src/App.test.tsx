import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import App from "./App"

describe("App component", () => {
  beforeEach(() => {
    render(<App />)
  })

  it("should add a new todo", () => {
    const input = screen.getByPlaceholderText(/What needs to be done?/i)

    fireEvent.change(input, { target: { value: "New Todo" } })
    const form = input.closest("form")
    if (form) {
      fireEvent.submit(form)
    }

    expect(screen.getByText("New Todo")).toBeInTheDocument()
  })

  it("should clear completed todos", () => {
    const input = screen.getByPlaceholderText(/What needs to be done?/i)

    fireEvent.change(input, { target: { value: "New Todo" } })
    const form = input.closest("form")
    if (form) {
      fireEvent.submit(form)
    }

    fireEvent.change(input, { target: { value: "New Todo2" } })
    const form2 = input.closest("form")
    if (form2) {
      fireEvent.submit(form2)
    }

    const todoItem1 = screen.getByText("New Todo")
    const todoItem2 = screen.getByText("New Todo2")

    fireEvent.dblClick(todoItem1)

    const clearButton = screen.getByText(/clear completed/i)
    fireEvent.click(clearButton)

    expect(todoItem1).not.toBeInTheDocument()
    expect(todoItem2).toBeInTheDocument()
  })

  it("should toggle todo completion", () => {
    const input = screen.getByPlaceholderText(/What needs to be done?/i)

    fireEvent.change(input, { target: { value: "New Todo" } })
    const form = input.closest("form")
    if (form) {
      fireEvent.submit(form)
    }

    const todoItem = screen.getByText("New Todo")
    fireEvent.dblClick(todoItem)

    expect(todoItem).toHaveClass("line-through opacity-50")
  })

  it("should filter todos by active and completed", () => {
    const input = screen.getByPlaceholderText(/What needs to be done?/i)

    fireEvent.change(input, { target: { value: "Active Todo" } })
    const form = input.closest("form")
    if (form) {
      fireEvent.submit(form)
    }

    fireEvent.change(input, { target: { value: "Completed Todo" } })
    const form2 = input.closest("form")
    if (form2) {
      fireEvent.submit(form2)
    }

    const completedTodo = screen.getByText("Completed Todo")
    fireEvent.dblClick(completedTodo)

    // Переключаем фильтр на "Active"
    const activeFilterButton = screen.getByRole("button", { name: "Active" })
    fireEvent.click(activeFilterButton)

    expect(screen.getByText("Active Todo")).toBeInTheDocument()
    expect(screen.queryByText("Completed Todo")).not.toBeInTheDocument()

    // Переключаем фильтр на "Completed"
    const completedFilterButton = screen.getByRole("button", {
      name: "Completed",
    })
    fireEvent.click(completedFilterButton)

    expect(screen.getByText("Completed Todo")).toBeInTheDocument()
    expect(screen.queryByText("Active Todo")).not.toBeInTheDocument()
  })
})
