import React from "react";
import PropTypes from "prop-types";

const TodoList = ({ todos, onDeleteClick, onSelect }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Item Description</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {todos.map((todo) => {
        return (
          <tr
            key={todo.Id}
            className={!todo.status ? "table-default" : "table-success"}
          >
            <td>
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => {
                  todo.status = !todo.status;
                  onSelect(todo);
                }}
              />
            </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => {
                todo.status = !todo.status;
                onSelect(todo);
              }}
            >
              {todo.Title}
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(todo)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TodoList;
