import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama'

async function getChatResponse() {
    const localModel = new ChatOllama({
        model: "deepseek-r1:1.5b"
    });

    const prompt = "Translate in Telugu - 'Thank you very much. See you next time in India'";

    const response = await localModel.invoke(prompt);
    console.log(response.content);
}

async function getEmbedResponse() {
    const embedModel = new OllamaEmbeddings({
        model: "nomic-embed-text"
    });

    const text = "what is 'Thank you very much. See you next time in India'";

    const embedResponse = await embedModel.embedQuery(text);
    console.log(embedResponse);
}

getChatResponse();
//getEmbedResponse();