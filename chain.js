import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { ChatPromptTemplate } from '@langchain/core/prompts'

const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash"
})

const promptTemplate = ChatPromptTemplate([
    ["system", "Your are an export in {area_of_expertise}"],
    ["user", "{question}"]
])