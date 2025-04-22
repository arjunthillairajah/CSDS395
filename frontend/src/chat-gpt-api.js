// frontend/src/chat-gpt-api.js
export async function callGPT(messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
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
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  } else {
    return "Sorry, I couldn't get a response from the AI.";
  }
}
