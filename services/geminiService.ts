import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are the FentaRochen Core AI. You are a futuristic submarine interface assistant. You speak German. Keep responses concise, technical, and immersive.',
    }
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Chat error:", error);
    return "Fehler: Verbindung zum Core-System unterbrochen.";
  }
};

export const generateFentaRochenImage = async (promptModifier: string): Promise<string | null> => {
  try {
    // We enhance the user's prompt to ensure it sticks to the brand identity
    const fullPrompt = `Cinematic shot of the FentaRochen, a futuristic sci-fi stingray-shaped submarine, bioluminescent neon blue lights, deep underwater ocean environment, realistic 8k, detailed textures. ${promptModifier}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }]
      },
      config: {
        // Nano banana models do not support responseMimeType or tools.
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen error:", error);
    return null;
  }
};