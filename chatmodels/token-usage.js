import { ChatGroq } from '@langchain/groq'
import { env } from '../config.js';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const groqModel = new ChatGroq({
    apiKey: env.groq.apiKey,
    model: env.groq.model
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["user", "Write a poem about tallest mountains"]
]);

const formattedPrompt = await promptTemplate.format({});

const response = await groqModel.invoke(formattedPrompt);

console.log(response.usage_metadata.input_tokens);
console.log(response.usage_metadata.output_tokens);
console.log(response.usage_metadata.total_tokens);