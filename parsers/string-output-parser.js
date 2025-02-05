import { ChatGroq } from "@langchain/groq";
import { env } from "../config.js";
import { StringOutputParser } from "@langchain/core/output_parsers";

const groqModel = new ChatGroq({
    model: env.groq.model,
    apiKey: env.groq.apiKey
});

const response = await groqModel.invoke("What do you think about humming bird?");

const stringParser = new StringOutputParser();

const birdFact = await stringParser.parse(response.content);

console.log(birdFact);
console.log(typeof response.content);

