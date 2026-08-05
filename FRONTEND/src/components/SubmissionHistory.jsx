import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import {CheckCircle,XCircle,Clock3,AlertTriangle} from "lucide-react";

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        console.log(response.data);
        setSubmissions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'badge-success';
      case 'wrong': return 'badge-error';
      case 'error': return 'badge-warning';
      case 'pending': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

return (
  <div className="max-w-5xl mx-auto p-6">

    {/* Header */}
<div className="bg-white rounded-2xl shadow-md p-6 mb-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>
      <h2 className="text-3xl font-bold text-gray-800">
        Submission History
      </h2>

      <p className="text-gray-500 mt-2">
        Review all of your submissions for this problem.
      </p>
    </div>

<div className="flex items-center gap-3">

  <div className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium whitespace-nowrap">
    {submissions.length} Submission{submissions.length !== 1 ? "s" : ""}
  </div>

  {submissions.length > 0 && (
    <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium whitespace-nowrap">
      Latest:{" "}
      {submissions[submissions.length - 1].status.charAt(0).toUpperCase() +
        submissions[submissions.length - 1].status.slice(1)}
    </div>
  )}

</div>

  </div>
</div>

    {/* Loading */}

    {loading && (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-violet-600"></span>
      </div>
    )}

    {/* Error */}

    {!loading && error && (
      <div className="alert alert-error">
        {error}
      </div>
    )}

    {/* Empty */}

    {!loading && !error && submissions.length === 0 && (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <h2 className="text-xl font-semibold">
          No submissions yet
        </h2>

        <p className="text-gray-500 mt-2">
          Solve this problem to see your submissions.
        </p>
      </div>
    )}

    {/* Cards */}

    {!loading && !error && submissions.length > 0 && (

      <div className="space-y-5">

        {[...submissions].reverse().map((sub, index) => (

          <div
            key={sub._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="font-bold text-xl">
                  Submission #{submissions.length - index}
                </h2>

                <p className="text-gray-500 mt-1">
                  {formatDate(sub.createdAt)}
                </p>

              </div>

              <span
                className={`badge badge-lg ${getStatusColor(sub.status)}`}
              >
                {sub.status.charAt(0).toUpperCase() +
                  sub.status.slice(1)}
              </span>

            </div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mt-6">

              <div>

                <p className="text-gray-400 text-sm">
                  Language
                </p>

                <h3 className="font-semibold">
                  {sub.language.toUpperCase()}
                </h3>

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Runtime
                </p>

                <h3 className="font-semibold">
                  {sub.runtime} sec
                </h3>

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Memory
                </p>

                <h3 className="font-semibold">
                  {formatMemory(sub.memory)}
                </h3>

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Test Cases
                </p>

                <h3 className="font-semibold">
                  {sub.testCasesPassed}/{sub.testCasesTotal}
                </h3>

              </div>

            </div>

            {sub.errorMessage && (

              <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">

                {sub.errorMessage}

              </div>

            )}

            <div className="flex justify-end mt-6">

              <button
                onClick={() => setSelectedSubmission(sub)}
                className="btn bg-violet-600 hover:bg-violet-700 border-none text-white rounded-xl px-6"
              >
                View Code
              </button>

            </div>

          </div>

        ))}

      </div>

    )}

    {/* Modal */}

    {selectedSubmission && (

      <div className="modal modal-open">

        <div className="modal-box w-11/12 max-w-6xl">

          <div className="flex justify-between items-center mb-5">

            <h2 className="font-bold text-2xl">
              {selectedSubmission.language.toUpperCase()} Submission
            </h2>

            <span
              className={`badge badge-lg ${getStatusColor(
                selectedSubmission.status
              )}`}
            >
              {selectedSubmission.status}
            </span>

          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">

            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-gray-500 text-sm">
                Runtime
              </p>

              <h3 className="font-semibold">
                {selectedSubmission.runtime} sec
              </h3>
            </div>

            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-gray-500 text-sm">
                Memory
              </p>

              <h3 className="font-semibold">
                {formatMemory(selectedSubmission.memory)}
              </h3>
            </div>

            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-gray-500 text-sm">
                Passed
              </p>

              <h3 className="font-semibold">
                {selectedSubmission.testCasesPassed}/
                {selectedSubmission.testCasesTotal}
              </h3>
            </div>

          </div>

          <div className="rounded-xl overflow-hidden border">

            <div className="bg-[#2d2d2d] text-white px-4 py-3">

              {selectedSubmission.language.toUpperCase()}

            </div>

            <pre className="bg-[#1e1e1e] text-gray-100 p-5 overflow-auto max-h-125">

              <code>{selectedSubmission.code}</code>

            </pre>

          </div>

          <div className="modal-action">

            <button
              className="btn"
              onClick={() => setSelectedSubmission(null)}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    )}

  </div>
);
};

export default SubmissionHistory;