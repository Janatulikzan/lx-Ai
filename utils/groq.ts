import Groq from "groq-sdk";


declare global {
  interface ImportMeta { 
  }
}


const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ,
  dangerouslyAllowBrowser: true,
});

export const requestToGroq = async (inputRef: string): Promise<any> => {
  try {

    const reply = await groq.chat.completions.create({
      messages: [{
        role: "user",
        content: inputRef,
      }],
      model: "llama3-70b-8192",
    });

    return reply.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error requesting Groq:", error.message);
    } else {
      console.error("Error requesting Groq:", error);
    }
    return { error: "Failed to get response from Groq" };
  }
};