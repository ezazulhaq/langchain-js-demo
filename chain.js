import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { env } from './config.js';

const model = new ChatGoogleGenerativeAI({
    model: env.google.model,
    apiKey: env.google.apiKey,
    maxOutputTokens: 512
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "Your are an export in {area_of_expertise}"],
    ["user", "{question}"]
]);

const stringParser = new StringOutputParser();

const chatChain = promptTemplate.pipe(model).pipe(stringParser);

const response = await chatChain.invoke({
    area_of_expertise: "Computer Engineering",
    question: "How do CPUs work?"
});

console.log(response);