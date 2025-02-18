import { PromptTemplate } from "@langchain/core/prompts";
import { env } from "../config.js";
import { ChatGroq } from "@langchain/groq";
import { Runnable, RunnableSequence } from "@langchain/core/runnables";

const groqModel = new ChatGroq({
    model: env.groq.model,
    apiKey: env.groq.apiKey
});

const templateString = "Suggest 3 nick names for a {pet_animal}";

const template = PromptTemplate.fromTemplate(templateString);

const templateString2 = "Which of these {pet_names} is also a good name for a dog?";

const template2 = PromptTemplate.fromTemplate(templateString2);

const chain = template.pipe(groqModel);
const chain2 = template2.pipe(groqModel);

const compositChain = RunnableSequence.from([
    chain,
    input => ({
        pet_names: input.content
    }),
    chain2
]);

const response = await compositChain.invoke({
    pet_animal: "cat"
});

console.log(response.content);