import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const DashboardFront = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const userId = currentUser?.user?.id;
    async function getData() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/task/user/${userId}/tasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    }
    getData();
  }, [currentUser]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDeleteModal = (taskId) => {
    setIsDeleteModalOpen(true);
    setTaskIdToDelete(taskId);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskIdToDelete(null);
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTask(null);
  };
  const handleDeleteTask = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/task/user/${userId}/tasks/${taskIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Task deleted successfully");
        // Remove the deleted task from the data array
        setData(data.filter((item) => item.id !== taskIdToDelete));
        window.location.reload();
      } else {
        toast.error("Failed to delete task");
      }

      closeDeleteModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onSubmitEdit = async (data) => {
    try {
      const userId = currentUser?.user?.id; // Get userId here
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/task/user/${userId}/tasks/${
          editTask.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Task updated successfully");
        closeEditModal();
        window.location.reload();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userId = currentUser?.user?.id;
  // console.log(userId);
  const onSubmit = async (data) => {
    try {
      // Add userId to the data object
      data.userId = userId;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/task/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        // Task created successfully
        console.log("Task created successfully");
        toast.success("Task created successfully");
        reset();
        closeModal();
        window.location.reload();
      } else {
        // Handle error
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-meta-5 to-meta-6 group-hover:from-meta-5 group-hover:to-meta-6 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-meta-1 dark:focus:ring-meta-7"
        onClick={openModal}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Create Task
        </span>
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Create Task
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...register("title")}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  {...register("description")}
                  rows="3"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 mr-2 text-white rounded-md bg-meta-5 hover:bg-meta-6"
              >
                Create
              </button>
              <button
                type="button"
                className="text-meta-6 hover:text-meta-7"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0">
              <details className="relative">
                <summary className="p-2 text-sm text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </summary>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-full p-2 text-left cursor-pointer hover:bg-graydark dark:hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="w-full p-2 text-left cursor-pointer hover:bg-graydark dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </details>
            </div>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-meta-4 ">
                {item.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              {item.description}
            </p>
            <button
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-meta-5 hover:bg-success focus:ring-meta-1 dark:bg-primary dark:hover:bg-meta-8 dark:focus:ring-meta-9"
            >
              Mark As Complete
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete the task?
            </h2>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 text-white rounded-md bg-danger hover:bg-red-600"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200"
                onClick={() => {
                  closeDeleteModal();
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-graydark">Edit Task</h2>
            <form onSubmit={handleSubmit(onSubmitEdit)}>
              <div className="mb-4">
                <label
                  htmlFor="editTitle"
                  className="block text-sm font-medium text-graydark"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="editTitle"
                  name="title"
                  defaultValue={editTask.title}
                  {...register("title")}
                  className="w-full p-2 mt-1 border rounded-md border-graydark"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editDescription"
                  className="block text-sm font-medium text-graydark"
                >
                  Description
                </label>
                <textarea
                  id="editDescription"
                  name="description"
                  defaultValue={editTask.description}
                  {...register("description")}
                  rows="3"
                  className="w-full p-2 mt-1 border rounded-md border-graydark"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 mr-2 text-white rounded-md bg-meta-5 hover:bg-meta-6"
              >
                Edit
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md text-graydark hover:bg-gray-200"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardFront;
