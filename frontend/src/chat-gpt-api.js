// frontend/src/chat-gpt-api.js

//  ─────────────────────────
const HF_TOKEN   = "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";
const HF_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

/**
 * Turn your message array into an OpenChatML prompt.
 * @param {{ role: string, text: string }[]} messages
 * @returns {string}
 */
function buildPrompt(messages) {
  let prompt = "";
  for (const m of messages) {
    if (m.role === "system") {
      prompt += `<|system|>\n${m.text}\n`;
    } else if (m.role === "user") {
      prompt += `<|user|>\n${m.text}\n`;
    } else { // assistant
      prompt += `<|assistant|>\n${m.text}\n`;
    }
  }
  // finally, signal the model to generate the assistant’s reply
  prompt += `<|assistant|>\n`;
  return prompt;
}

/**
 * Send your chat history to HF and return the assistant's next reply.
 * @param {{ role: string, text: string }[]} messages
 * @returns {Promise<string>}
 */
export async function callGPT(messages) {
  // 1) prepend your system instructions
  const prompt = buildPrompt([
    {
      role: "system",
      text: `
You are an interactive website assistant for a dermatology diagnostic platform.
Your job is to guide users through the following pages and their functionalities:

- "Upload Image": where users can upload skin condition images for AI diagnosis
- "Disease Encyclopedia": where users can read about different skin conditions
- "Help": where they can chat with you
- "About us": company background

Answer user questions clearly and concisely, and always suggest where they should click to get what they want.
      `.trim()
    },
    ...messages
  ]);

  // 2) call the Hugging Face inference endpoint
  const res = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_TOKEN}`,
      "Content-Type":  "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { temperature: 0.7 }
    })
  });

  // 3) parse and extract the assistant's reply
  const data = await res.json();
  if (!Array.isArray(data) || !data[0]?.generated_text) {
    console.error("HF inference error:", data);
    return "Sorry, I couldn't get a response from the model.";
  }
  const full = data[0].generated_text;
  // split off everything before the latest <|assistant|> marker
  return full.split("<|assistant|>").pop().trim();
}


