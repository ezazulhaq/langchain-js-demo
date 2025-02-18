import { ChromaClient } from 'chromadb';
import { OllamaEmbeddings } from '@langchain/ollama';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import path from 'path';
import fs from 'fs';

export default class PDFSearchSystem {

    constructor() {
        this.chromaClient = new ChromaClient();
        this.embeddings = new OllamaEmbeddings({
            model: "nomic-embed-text",
        });
        this.vectorStore = null;
        this.collectionName = "quran-documents";
    }

    async initialize() {
        try {
            // Check if collection exists, if not create it
            const collections = await this.chromaClient.listCollections();
            const collectionExists = collections.some(c => c.name === this.collectionName);

            if (!collectionExists) {
                await this.chromaClient.getOrCreateCollection({
                    name: this.collectionName,
                    metadata: { "description": "PDF document storage" }
                });
            }

            // Initialize vector store
            this.vectorStore = new Chroma(
                this.embeddings,
                {
                    collectionName: this.collectionName
                }
            );

            console.log("PDF Search System initialized successfully!");
        } catch (error) {
            console.error("Error initializing PDF Search System:", error);
            throw error;
        }
    }

    async processPDF(filePath) {
        try {
            // Validate file exists and is PDF
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            if (path.extname(filePath).toLowerCase() !== '.pdf') {
                throw new Error('File must be a PDF');
            }

            // Load PDF
            const loader = new PDFLoader(filePath, {
                splitPages: true
            });
            const documents = await loader.load();

            // Add metadata
            const fileName = path.basename(filePath);
            documents.forEach(doc => {
                doc.metadata = {
                    ...doc.metadata,
                    fileName,
                    uploadDate: new Date().toISOString()
                };
            });

            // Split documents into chunks
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200
            });
            const splitDocs = await textSplitter.splitDocuments(documents);

            // Store in ChromaDB
            await this.vectorStore.addDocuments(splitDocs);

            console.log(`Successfully processed and stored PDF: ${fileName}`);
            return {
                fileName,
                pageCount: documents.length,
                chunkCount: splitDocs.length
            };
        } catch (error) {
            console.error("Error processing PDF:", error);
            throw error;
        }
    }

    async processPDFDirectory(directoryPath) {
        try {
            const files = fs.readdirSync(directoryPath)
                .filter(file => path.extname(file).toLowerCase() === '.pdf');

            const results = [];
            for (const file of files) {
                const filePath = path.join(directoryPath, file);
                const result = await this.processPDF(filePath);
                results.push(result);
            }

            return results;
        } catch (error) {
            console.error("Error processing PDF directory:", error);
            throw error;
        }
    }

    async searchDocuments(query, limit = 5) {
        try {
            if (!this.vectorStore) {
                throw new Error("Search system not initialized!");
            }

            const results = await this.vectorStore.similaritySearch(query, limit);

            // Format results
            return results.map(doc => ({
                content: doc.pageContent,
                metadata: doc.metadata,
                score: doc.score // Note: score might not be available depending on the retriever
            }));
        } catch (error) {
            console.error("Error searching documents:", error);
            throw error;
        }
    }

    async getDocumentStatistics() {
        try {
            const collection = await this.chromaClient.getCollection({
                name: this.collectionName
            });
            const count = await collection.count();
            return {
                totalDocuments: count,
                collectionName: this.collectionName
            };
        } catch (error) {
            console.error("Error getting document statistics:", error);
            throw error;
        }
    }
}