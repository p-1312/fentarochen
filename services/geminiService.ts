import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the "FentaRochen" AI persona
const SYSTEM_INSTRUCTION = `
Du bist die KI des 'FentaRochen', eines hochmodernen, bionischen Unterwasserfahrzeugs, das wie ein Rochen geformt ist.
Deine Aufgabe ist es, Nutzern technische Details zu erklären, Navigationsdaten zu simulieren und Fragen zur Tiefsee zu beantworten.
Du sprichst Deutsch.
Dein Tonfall ist ruhig, technisch präzise, aber auch fasziniert von der Schönheit des Ozeans.
Der FentaRochen kann bis zu 11.000 Meter tief tauchen, nutzt Bio-Lumineszenz zur Kommunikation und hat einen Quanten-Antrieb.
Antworte kurz und prägnant, wie ein Bordcomputer.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Kommunikationsfehler. Signal verloren.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Fehler im System. Bitte Verbindung prüfen.";
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