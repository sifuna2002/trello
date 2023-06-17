import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();
    console.log(todos);
    //communicate with OpenAI API
    const response = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        temperature:0.8,
        n:1,
        stream:false,
        messages:[
            {
                role:"system",
                content:`When responding, Welcome the user always as Mr. Sifuna and say welcome to the Todo App! limit the response to 200 characters`
            },
            {
                role:"user",
                content:`Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done and say to have a Productive day! Here is the data: ${JSON.stringify(
                    todos
                    )}`,
            },
            
        ]
    });

    const {data} = response;

    return NextResponse.json(data.choices[0].message);
}