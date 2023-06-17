import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestions = async (board: Board) => {
    const todos=formatTodosForAI(board);
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({todos}),
        });
    
    const GPTdata = await res.json();
    console.log(GPTdata);
    const {content}=GPTdata;
    return content;
};

export default fetchSuggestions;
        