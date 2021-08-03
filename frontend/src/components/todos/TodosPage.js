import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TodoList from "./TodoList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import TextInput from "../common/TextInput";

function TodosPage(props) {
  const { todos, actions } = props;
  const [todo, setTodo] = useState({ Id: null, status: false, Title: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (todos.length === 0) {
      actions.loadTodos().catch((error) => {
        alert("Loading todos failed" + error);
      });
    }
  }, []);

  function handleChange(event) {
    setTodo({ status: false, Title: event.target.value });
  }

  function formIsValid() {
    const { Title } = todo;
    const errors = {};

    if (!Title) errors.Title = "Title is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave() {
    if (!formIsValid()) return;
    setSaving(true);
    props.actions
      .saveTodo(todo)
      .then(() => {
        toast.success("Todo saved.");
        setTodo({ Id: null, status: false, Title: "" });
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleSelect(_todo) {
    props.actions
      .saveTodo(_todo)
      .then(() => {
        _todo.status
          ? toast.success("Todo marked as done.")
          : toast.warn("Todo marked as undone.");
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      });
  }

  const handleDeleteTodo = async (_todo) => {
    toast.success("Todo deleted");
    try {
      await props.actions.deleteTodo(_todo);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2>To Do List</h2>
      <br></br>
      {
        <>
          <TextInput
            name="Title"
            label="Description:"
            placeholder="Please enter a todo description"
            value={todo.Title}
            onChange={handleChange}
            error={errors.Title}
          />
          <div>
            <div style={{ float: "left" }}>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Adding..." : "Add Item"}
              </button>
            </div>
            {props.loading && <Spinner />}
          </div>

          <TodoList
            onSelect={handleSelect}
            onDeleteClick={handleDeleteTodo}
            todos={props.todos}
          />
        </>
      }
    </>
  );
}

TodosPage.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todos.map((_todo) => {
      return {
        ..._todo,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTodos: bindActionCreators(todoActions.loadTodos, dispatch),
      saveTodo: bindActionCreators(todoActions.saveTodo, dispatch),
      deleteTodo: bindActionCreators(todoActions.deleteTodo, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);
