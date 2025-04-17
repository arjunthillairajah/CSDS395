// frontend/src/chat-gpt-api.js
export async function callGPT(messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "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"  
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful AI assistant for dermatology." },
        ...messages
      ]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  } else {
    return "Sorry, I couldn't get a response from the AI.";
  }
}
