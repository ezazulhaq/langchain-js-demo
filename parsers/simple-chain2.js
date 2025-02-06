import { PromptTemplate } from "@langchain/core/prompts";
import { env } from "../config.js";
import { ChatGroq } from "@langchain/groq";

const groqModel = new ChatGroq({
    model: env.groq.model,
    apiKey: env.groq.apiKey
});

const templateString = "Suggest 3 nick names for a {pet_animal}";

const template = PromptTemplate.fromTemplate(templateString);

const chain = template.pipe(groqModel);

const response = await chain.invoke({
    pet_animal: "cat"
});

console.log(response.content);