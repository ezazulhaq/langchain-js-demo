import { PromptTemplate } from "@langchain/core/prompts";

const myTemplate = new PromptTemplate({
    template: "How many {item} can fit into a {container}?",
    inputVariables: ["item", "container"]
});

const prompt = await myTemplate.invoke({
    item: "Tennis Rakets",
    container: "Standard class room"
});

console.log(prompt);

const myTemplate2 = PromptTemplate.fromTemplate("How many {item} can fit into a {container}?");

const prompt2 = await myTemplate2.invoke({
    item: "Tennis Rakets",
    container: "Standard class room"
});

console.log(prompt2);
