import { PromptTemplate } from "@langchain/core/prompts";
import { env } from "../config.js";
import { ChatGroq } from "@langchain/groq";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const groqModel = new ChatGroq({
    model: env.groq.model,
    apiKey: env.groq.apiKey
});

const templateString = "Suggest 3 nick names for a {pet_animal}";

const template = PromptTemplate.fromTemplate(templateString);

const chain = RunnableSequence.from([
    template,
    groqModel
]);

const response = await chain.invoke({
    pet_animal: "cat"
});

console.log(response.content);