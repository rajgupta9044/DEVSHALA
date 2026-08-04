import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

function AdminUpdate() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const { data } = await axiosClient.get("/problem/getAllProblem");
      setProblems(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6">
        Update Problems
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">

          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {problems.map((problem, index) => (
              <tr key={problem._id}>

                <td>{index + 1}</td>

                <td>{problem.title}</td>

                <td>{problem.difficulty}</td>

                <td>{problem.tags}</td>

                <td>
                  <NavLink
                    to={`/admin/update/${problem._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Update
                  </NavLink>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default AdminUpdate;