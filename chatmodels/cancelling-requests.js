import { ChatGroq } from '@langchain/groq'
import { env } from '../config.js';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const groqModel = new ChatGroq({
    apiKey: env.groq.apiKey,
    model: env.groq.model
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "Reply every prompt in Hindi"],
    ["user", "{input}"]
]);

const chainToCancel = promptTemplate.pipe(groqModel);

const controller = new AbortController();

console.time("CancellationTimer");
setTimeout(() => {
    controller.abort();
}, 100);

try {
    await chainToCancel.invoke(
        {
            input: "A dig is pet animal"
        },
        {
            signal: controller.signal
        })
} catch (error) {
    console.log(error);
}

console.timeEnd("CancellationTimer");