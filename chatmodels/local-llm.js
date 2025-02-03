import { ChatOllama } from '@langchain/ollama'

const localModel = new ChatOllama({
    model: "deepseek-r1:1.5b"
});

const prompt = "what is 'Thank you very much. See you next time in India'";

const response = await localModel.invoke(prompt);

console.log(response.content);