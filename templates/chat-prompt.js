import { ChatPromptTemplate } from "@langchain/core/prompts";

const messages = [
    ["system", "You are a Javascript Expert"],
    ["user", "{question}"]
];

const myChatPrompt = ChatPromptTemplate.fromMessages(messages);

const prompt = await myChatPrompt.invoke({
    question: "What is the difference between var, const and let?"
});

console.log(prompt);