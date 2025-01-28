import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { readFile } from "fs/promises";
import { env } from '../config.js';

const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: env.apiKey
});

const myImage = await readFile("./data/picture.jpeg");

// Convert the Buffer to base64 string
const base64Image = myImage.toString('base64');

//console.log(`Image Base64 - ${base64Image}`);

const messages = [
    ["system", "Describe an Image"],
    ["user", [
        {
            type: "text",
            text: "Here's an image, please describe it."
        },
        {
            type: "image",
            image_url: "data:image/jpeg;base64,{image}"
        }
    ]]
];

const multiModal = ChatPromptTemplate.fromMessages(messages);

// console.log(await multiModal.invoke({
//     image: base64Image
// }));

const multiModalChain = multiModal.pipe(model);

const response = await multiModalChain.invoke({
    image: base64Image
});

console.log(response.content);