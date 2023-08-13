import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const {OPENAI_KEY} = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_KEY!
});

export const gpt = new OpenAIApi(configuration);