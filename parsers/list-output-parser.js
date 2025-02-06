import { PromptTemplate } from "@langchain/core/prompts";
import { env } from "../config.js";
import { ChatGroq } from "@langchain/groq";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";

const groqModel = new ChatGroq({
    model: env.groq.model,
    apiKey: env.groq.apiKey
});

const templateString = `
    List 10 countries in a {continent}
    {format_instructions}
`;

const template = PromptTemplate.fromTemplate(templateString);

const listParser = new CommaSeparatedListOutputParser();

const format_instructions = listParser.getFormatInstructions();

//console.log(format_instructions);

const chain = template.pipe(groqModel).pipe(listParser);

const response = await chain.invoke({
    continent: "Europe",
    format_instructions: format_instructions
});

console.log(response);