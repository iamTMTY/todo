import {ReactElement, ReactPortal} from "react"

export type Action = {
  type: "default" | "view" | "add" | "edit",
  data?: Todo
}

export type Todo = {
  userId: number,
  id: number,
  title: string,
  date?: Date
  startTime?: string
  endTime?: string
  completed: boolean
}

export type TodoState = {
  data: Array<Todo>
  isLoading: boolean
  error: string
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;