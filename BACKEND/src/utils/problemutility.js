const axios = require('axios');

const getLanguageById = (lang) => {

    const language = {
        "c": 50,
        "c++": 54,
        "java": 62,
        "javascript": 102,
        "python": 71,
    };

    return language[lang.toLowerCase()];
};


const submitBatch = async (submissions) => {
    // Note: 'base64_encoded' is false because you said you are NOT encoding data
    const options = {
        method: 'POST',
        url: `${process.env.JUDGE0_URL}/submissions/batch`,
        params: { base64_encoded: 'false' }, 
        headers: { 'Content-Type': 'application/json' }, // NO RapidAPI keys needed
        data: { submissions }
    };

    try {
        const response = await axios.request(options);
        // Returns an array of tokens: [{token: "..."}, {token: "..."}]
        return response.data; 
    }catch (error) {
    console.error("Submission Error:", error.response?.data || error.message);
    throw error;
}
};

// 2. FIXED: Real waiting function using a Promise
const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const submitToken = async (resultTokens) => {

    const tokenString = resultTokens.join(",");

    const options = {
        method: "GET",
        url: `${process.env.JUDGE0_URL}/submissions/batch`,
        params: {
            tokens: tokenString,
            base64_encoded: "false",
           fields: "source_code,language_id,stdin,expected_output,stdout,stderr,compile_output,time,memory,status,status_id,created_at,finished_at"
        }
    };

    let attempts = 0;
    const MAX_ATTEMPTS = 15;

    while (attempts < MAX_ATTEMPTS) {

        try {

            const response = await axios.request(options);

            const results = response.data.submissions;

            // console.log(
            //     results.map(r => ({
            //         statusId: r.status_id,
            //         status: r.status.description
            //     }))
            // );

            const isFinished = results.every(r => r.status_id > 2);

            if (isFinished) {
                return results;
            }

            attempts++;

            await waiting(1000);

        } catch (error) {

            console.error("Polling Error:", error.response?.data || error.message);
            throw error;
        }
    }

    throw new Error("Judge0 timed out after 15 seconds.");
}

module.exports = { getLanguageById, submitBatch, submitToken };