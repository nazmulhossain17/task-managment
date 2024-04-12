import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const DashboardFront = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

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

      <div className="grid grid-cols-4 gap-4 mt-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
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
    </>
  );
};

export default DashboardFront;
