
// main.go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "strconv"
    "io/ioutil"
    "net/http"
    "math/rand"
    "github.com/gorilla/mux"
    "github.com/gorilla/handlers"
)

type Todo struct {
    Id      int      `json:"Id"`
    Title   string   `json:"Title"`
    Status  bool     `json:"status"`
}

var Todos []Todo

func main() {
    Todos = []Todo{}
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/todos", returnAllTodos)
    myRouter.HandleFunc("/todo", createNewTodo).Methods("POST")
    myRouter.HandleFunc("/todo/{id}", updateTodo).Methods("PUT")
    myRouter.HandleFunc("/todo/{id}", deleteTodo).Methods("DELETE")
    myRouter.HandleFunc("/todo/{id}", returnSingleTodo)
    fmt.Println("Server started, listen port (8778)")
    cors := handlers.CORS(
      handlers.AllowedOrigins([]string{"http://my-todo-app-harunisik2021-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com"}),
      handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}))

    log.Fatal(http.ListenAndServe(":8778", cors(myRouter)))
}

func returnAllTodos(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hit get all todos")
    json.NewEncoder(w).Encode(Todos)
}

func returnSingleTodo(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hit get todo")
    vars := mux.Vars(r)

    for _, todo := range Todos {
        if key, err := strconv.Atoi(vars["id"]); err == nil {
          if todo.Id == key {
              json.NewEncoder(w).Encode(todo)
          }
        }
    }
}


func createNewTodo(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hit put todo")
    reqBody, _ := ioutil.ReadAll(r.Body)
    var todo Todo
    json.Unmarshal(reqBody, &todo)
    todo.Id = rand.Intn(1000)
    Todos = append(Todos, todo)

    json.NewEncoder(w).Encode(todo)
}

func updateTodo(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hit post todo")
    vars := mux.Vars(r)

    for index, todo := range Todos {
      if key, err := strconv.Atoi(vars["id"]); err == nil {
        if todo.Id == key {
            reqBody, _ := ioutil.ReadAll(r.Body)
            json.Unmarshal(reqBody, &Todos[index])
            json.NewEncoder(w).Encode(Todos[index])
            return
        }
      }
    }
    w.WriteHeader(404)
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hit delete todo")
    vars := mux.Vars(r)

    for index, todo := range Todos {
      if key, err := strconv.Atoi(vars["id"]); err == nil {
        if todo.Id == key {
            Todos = append(Todos[:index], Todos[index+1:]...)
            json.NewEncoder(w).Encode(todo)
            return
        }
      }
    }
    w.WriteHeader(404)
}

// hook test 1
// hook test 2