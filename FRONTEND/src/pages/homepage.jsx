import { Search, LogOut, Code2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";
import { useState, useEffect } from "react";
import axiosClient from '../utils/axiosClient';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { user } = useSelector((state) => state.auth);
const [problems, setProblems] = useState([]);
const [solvedProblems, setSolvedProblems] = useState([]);
const [loading, setLoading] = useState(true);

const [searchTerm, setSearchTerm] = useState("");
const [difficultyFilter, setDifficultyFilter] = useState("All");
const [tagFilter, setTagFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");


useEffect(() => {

    const fetchProblems = async () => {

        try {

            const { data } = await axiosClient.get(
                "/problem/getAllProblem"
            );

            console.log("Problems:", data);

            setProblems(data);

        } catch (error) {
            console.log(error);
        }

    };

    const fetchSolvedProblems = async () => {

        try {

            const { data } = await axiosClient.get(
                "/problem/problemSolvedByUser"
            );

            console.log("Solved Problems:", data);

            setSolvedProblems(data);

        } catch (error) {
            console.log(error);
        }

    };

    const loadData = async () => {

        setLoading(true);

        await Promise.all([
            fetchProblems(),
            fetchSolvedProblems()
        ]);

        setLoading(false);

    };

    loadData();

}, [user]); 

const getDifficultyColor = (difficulty) => {

    switch(difficulty.toLowerCase()){

        case "easy":
            return "bg-green-100 text-green-700";

        case "medium":
            return "bg-yellow-100 text-yellow-700";

        case "hard":
            return "bg-red-100 text-red-700";

        default:
            return "";
    }

}

const solvedProblemIds = new Set(
  solvedProblems.map((problem) => problem.problemId)
);



const filteredProblems = problems.filter((problem) => {

  const matchesSearch = problem.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesDifficulty =
    difficultyFilter === "All" ||
    problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

  const matchesTag =
    tagFilter === "All" ||
    problem.tags?.includes(tagFilter);

  const isSolved = solvedProblemIds.has(problem._id);

  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Solved" && isSolved) ||
    (statusFilter === "Unsolved" && !isSolved);

  return (
    matchesSearch &&
    matchesDifficulty &&
    matchesTag &&
    matchesStatus
  );
});





if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Code2 className="text-violet-600" size={30} />

          <h1 className="text-2xl font-bold text-gray-800">
            Devshala
          </h1>

        </div>

  <div className="flex items-center gap-4">

    <span className="font-medium text-gray-700">
      Welcome, {user?.firstName || "User"}
    </span>

    {/* Show only for Admin */}
    {user?.role === "admin" && (
      <button
        onClick={() => navigate("/admin")}
        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
      >
        Admin Panel
      </button>
    )}

    <button
      onClick={() => dispatch(logoutUser())}
      className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white border-none"
    >
      <LogOut size={18} />
      Logout
    </button>

  </div>

      </nav>

      {/* Main Content */}

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Hero */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Ready to solve your next coding challenge?
          </p>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">

          <div className="relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12"
            />

          </div>

        </div>

        {/* Filters */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

        <select
        className="select select-bordered w-full"
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
        >
        <option value="All">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        </select>

        <select
        className="select select-bordered w-full"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        >
        <option value="All">All Tags</option>
        <option value="Array">Array</option>
        <option value="HashMap">HashMap</option>
        <option value="Stack">Stack</option>
        <option value="Sliding Window">Sliding Window</option>
        <option value="String">String</option>
        <option value="Graph">Graph</option>
        <option value="BFS">BFS</option>
        </select>

        <select
        className="select select-bordered w-full"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        >
        <option value="All">All Status</option>
        <option value="Solved">Solved</option>
        <option value="Unsolved">Unsolved</option>
        </select>

        </div>

        {/* Problem List */}

<div className="space-y-5">
  {filteredProblems.length === 0 ? (
    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
      No problems found.
    </div>
  ) : (
    filteredProblems.map((problem) => (
      <div
        key={problem._id}
        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {problem.title}
            </h3>

            <div className="flex gap-2 mt-3 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                 {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>

             {problem.tags?.map((tag) => (
            <span
                key={tag}
                className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm"
            >
                {tag}
            </span>
            ))}

            {solvedProblemIds.has(problem._id) ? (
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                Solved
            </span>
            ) : (
            <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                Unsolved
            </span>
            )}

            </div>
          </div>

          <button className="btn bg-violet-600 hover:bg-violet-700 text-white border-none">
            Solve
          </button>
        </div>
      </div>
    ))
  )}
</div>

      </div>

    </div>
  );
}

export default HomePage;