import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
  completedTask,
} from "../features/Todos";
import { useDispatch } from "react-redux";

const Todo = () => {
  const [inputValue, SetInputValue] = useState("");
  const [updatedInputValue, SetUpdatedInputValue] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const todosList = useSelector((state) => state.todos.value);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(
      addTask({
        id: todosList.length + 1,
        title: inputValue,
        isCompleted: false,
      })
    );
    SetInputValue("");
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      dispatch(
        addTask({
          id: todosList.length + 1,
          title: inputValue,
          isCompleted: false,
        })
      );
      SetInputValue("");
    }
  };

  return (
    <div>
      <div className="min-w-[800px] px-2 p-4 rounded-lg bg-slate-400 flex items-center flex-col gap-4 relative">
        <h1 className="font-bold text-slate-700 text-3xl pb-4">To Do List</h1>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter Task"
            className="py-3 w-[450px] rounded-l-md font-semibold text-center bg-slate-300"
            onChange={(e) => SetInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={handleEnter}
            id="addInput"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-[14px] bg-slate-700 text-white  rounded-r-md  font-bold text-xl hover:bg-green-600 duration-300"
          >
            <MdOutlineAddCircleOutline />
          </button>
        </div>
        {todosList.map((todo) => {
          return (
            <div
              key={todo.id + 1}
              className={
                todo.isCompleted
                  ? "min-w-[800px] mt-2 px-4 bg-green-300 rounded-md font-semibold flex items-center justify-between"
                  : "min-w-[800px] mt-2 px-4 rounded-md bg-white font-semibold flex items-center justify-between"
              }
            >
              <div key={todo.id + 2} className="w-full px-2 py-4">
                {todo.title}
              </div>
              <div key={todo.id + 3} className="flex px-2 py-2">
                {todo.isCompleted ? null : (
                  <input
                    key={todo.id + 4}
                    type="text"
                    placeholder="Edit Task"
                    className="bg-slate-300 px-2 text-center"
                    onChange={(e) => SetUpdatedInputValue(e.target.value)}
                    id="updateInput"
                  />
                )}
                {todo.isCompleted ? null : (
                  <button
                    onClick={() => {
                      dispatch(
                        updateTask({ id: todo.id, title: updatedInputValue })
                      );
                      SetUpdatedInputValue("");
                    }}
                    className="p-3 bg-yellow-500 rounded-r-md font-semibold mr-8"
                  >
                    <AiOutlineEdit />
                  </button>
                )}
                {todo.isCompleted ? (
                  <p className="py-2 mr-3 text-slate-700">Done!</p>
                ) : null}
                {todo.isCompleted ? null : (
                  <button
                    onClick={() => {
                      dispatch(
                        completedTask({ id: todo.id, isCompleted: false })
                      );
                      setCompletedTasks(
                        todosList.map((task) => {
                          task.isCompleted === true;
                        })
                      );
                    }}
                    className="p-3 mr-1 bg-green-500 rounded-md font-semibold"
                  >
                    <MdDone />
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch(deleteTask({ id: todo.id }));
                  }}
                  className="p-3 bg-red-500 rounded-md font-semibold"
                >
                  <MdRemoveCircleOutline />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
