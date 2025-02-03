import { PipelinePromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { env } from '../config.js';

const model = new ChatGoogleGenerativeAI({
    model: env.google.model,
    apiKey: env.google.apiKey,
    maxOutputTokens: 512
});

const systemPrompt = PromptTemplate.fromTemplate("You are a useful AI assistant who is also a movie buff");

const aiExampleRespPrompt = PromptTemplate.fromTemplate(
    `
    Your response should always be in this format
    Question: Can you recommend a {example_genre} movie?
    Answer: Sure {example_answer} is a great choice
    `
);

const newConversationPrompt = PromptTemplate.fromTemplate("Question: Can you recommend a {question_genre} movie?");

const finalHumanPrompt = PromptTemplate.fromTemplate(
    `
    {systemRole}
    {aiExampleResponse}
    {newConversation}
    `
);

const compositPrompt = new PipelinePromptTemplate({
    pipelinePrompts: [
        {
            name: "systemRole",
            prompt: systemPrompt
        },
        {
            name: "aiExampleResponse",
            prompt: aiExampleRespPrompt
        },
        {
            name: "newConversation",
            prompt: newConversationPrompt
        }
    ],
    finalPrompt: finalHumanPrompt
});

/*
const formattedPrompt = await compositPrompt.format({
    example_genre: "sic-fi",
    example_answer: "Blade Runner",
    question_genre: "Comedy"
});

console.log(formattedPrompt);
*/

const chain = compositPrompt.pipe(model);

const response = await chain.invoke({
    example_genre: "sic-fi",
    example_answer: "Blade Runner",
    question_genre: "Comedy"
});

console.log(response.content);