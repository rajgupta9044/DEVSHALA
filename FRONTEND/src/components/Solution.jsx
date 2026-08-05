import { Copy, Check } from "lucide-react";
import { useState } from "react";

const Solutions = ({ title, solutions }) => {

    const [copied, setCopied] = useState(null);

    const copyCode = async (code, index) => {
        await navigator.clipboard.writeText(code);
        setCopied(index);

        setTimeout(() => {
            setCopied(null);
        }, 2000);
    };

    const getExtension = (language) => {
        switch (language.toLowerCase()) {
            case "c++":
                return "cpp";
            case "java":
                return "java";
            case "python":
                return "py";
            case "javascript":
                return "js";
            default:
                return "txt";
        }
    };

    if (!solutions || solutions.length === 0) {
        return (
            <div className="rounded-2xl bg-base-200 py-16 text-center">
                <h2 className="text-xl font-semibold">
                    No solutions available
                </h2>

                <p className="text-gray-500 mt-2">
                    Official solutions haven't been uploaded yet.
                </p>
            </div>
        );
    }

    return (
        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-3xl font-bold">
                        Solutions
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Official reference implementations.
                    </p>

                </div>

                <div className="badge badge-lg bg-violet-100 text-violet-700 border-none">
                    {solutions.length} Languages
                </div>

            </div>

            <div className="space-y-8">

                {solutions.map((solution, index) => (

                    <div
                        key={index}
                        className="rounded-2xl overflow-hidden border border-base-300 shadow-lg bg-white"
                    >

                        {/* Header */}

                        <div className="bg-linear-to-r from-violet-600 to-purple-600 px-6 py-4 flex justify-between items-center">

                            <div>

                                <h3 className="text-white text-xl font-semibold">
                                    {title}
                                </h3>

                                <p className="text-violet-100 text-sm">
                                    {solution.language}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    copyCode(solution.completeCode, index)
                                }
                                className="btn btn-sm bg-white text-violet-700 hover:bg-violet-50 border-none"
                            >

                                {copied === index ? (
                                    <>
                                        <Check size={16} />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copy
                                    </>
                                )}

                            </button>

                        </div>

                        {/* Fake VS Code Header */}

                        <div className="bg-[#2d2d2d] px-5 py-3 flex justify-between items-center">

                            <div className="flex gap-2">

                                <span className="w-3 h-3 rounded-full bg-red-500"></span>

                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>

                                <span className="w-3 h-3 rounded-full bg-green-500"></span>

                            </div>

                            <span className="text-gray-300 text-sm font-mono">

                                solution.{getExtension(solution.language)}

                            </span>

                        </div>

                        {/* Code */}

                        <pre className="bg-[#1e1e1e] text-gray-100 text-sm leading-7 p-6 overflow-x-auto">

                            <code>

                                {solution.completeCode}

                            </code>

                        </pre>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Solutions;