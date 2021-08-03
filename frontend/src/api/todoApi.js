import { handleResponse, handleError } from "./apiUtils";

export function getTodos() {
  return fetch(process.env.API_URL + "/todos/")
    .then(handleResponse)
    .catch(handleError);
}

export function saveTodo(todo) {
  return fetch(process.env.API_URL + "/todo" + (todo.Id ? "/" + todo.Id : ""), {
    method: todo.Id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    body: JSON.stringify(todo),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTodo(todo) {
  return fetch(process.env.API_URL + "/todo/" + todo.Id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
