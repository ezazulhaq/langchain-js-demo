import { ChatGroq } from '@langchain/groq'
import { env } from '../config.js';

const groqModel = new ChatGroq({
    apiKey: env.groq.apiKey,
    model: env.groq.model,
    maxTokens: 512
});

const response = await groqModel.invoke('What is the capital of India');

console.log(response);