import { Configuration,OpenAIApi } from "openai";

const configuration= new Configuration({
    organization:"org-bRI5t4B1LogUDA3A7aFF4WBf",
    apiKey:"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",
});

const openai = new OpenAIApi(configuration);

export default openai;