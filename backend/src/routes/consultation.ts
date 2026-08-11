import { Router, Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { AiConsultationRequest, AiConsultationResponse } from '@shared/types';
import Logger from '../utils/logger';

const router = Router();

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aura-studio-backend',
      },
    },
  });
}

function getFallbackResponse(category: string, vibeDescription?: string, eyeShapeOrPlacement?: string): AiConsultationResponse {
  return {
    recommendationTitle: category === 'lashes' ? 'The Tailored Wispy Hybrid Mapping' : 'The Fine-Line Botanical Micro Piece',
    styleDescription: `Based on your request for "${vibeDescription || 'minimalist elegance'}", we recommend a bespoke balance of texture and subtle precision tailored for ${eyeShapeOrPlacement || 'your unique features'}.`,
    suggestedSpecs: {
      curlOrStyle: category === 'lashes' ? 'CC-Curl / Soft Volume' : 'Single Needle 1RL / Fine Grey Wash',
      lengthOrSize: category === 'lashes' ? '9mm - 13mm Gradient' : '2.5" x 2.5" Delicate Scale',
      densityOrInk: category === 'lashes' ? 'Textured Hybrid 3D' : 'Charcoal Black High-Precision Ink',
      mappingOrPlacement: category === 'lashes' ? 'Open Eye / Soft Cat-Eye' : eyeShapeOrPlacement || 'Collarbone / Wrist',
    },
    recommendedArtistId: category === 'lashes' ? 'artist-elena' : 'artist-kai',
    recommendedServiceId: category === 'lashes' ? 'lash-hybrid-wispy' : 'tattoo-fineline-micro',
    prepAdvice: [
      'Avoid caffeine 2 hours prior to reduce flutter/skin twitching',
      'Keep area clean, dry, and unmoisturized on day of appointment at our Kiyovu atelier',
      'Stay thoroughly hydrated for optimum skin & lash retention in Kigali climate',
    ],
    aftercareHighlight: category === 'lashes'
      ? 'Brushing daily and keeping dry for first 24h ensures 4-week flutter retention.'
      : 'Keep SecondSkin protective wrap on for 3 days and apply unscented balm twice daily.',
  };
}

router.post('/', async (req: Request, res: Response) => {
  const { category, vibeDescription, eyeShapeOrPlacement, skinOrLashSensitivity, preferredTone }: AiConsultationRequest = req.body;

  Logger.info('AI consultation request received', {
    category,
    vibeDescription,
    eyeShapeOrPlacement,
    skinOrLashSensitivity,
    preferredTone,
  });

  const fallbackResponse = getFallbackResponse(category, vibeDescription, eyeShapeOrPlacement);

  const ai = getGenAI();
  if (!ai) {
    Logger.warn('Gemini API key not configured, using fallback response', { category });
    return res.json(fallbackResponse);
  }

  try {
    const prompt = `
You are the Head Style Director at AURA Studio, a high-fashion minimalist atelier in Kiyovu, Kigali, Rwanda specializing in Eyelash Extensions/Lifts and Fine-Line Tattoos.

A client is requesting a style consultation.
Details provided:
- Category: ${category}
- Desired Vibe/Vision: ${vibeDescription || 'Unspecified minimalist luxury'}
- Eye Shape or Body Placement: ${eyeShapeOrPlacement || 'Standard'}
- Skin/Lash Sensitivity Notes: ${skinOrLashSensitivity || 'None'}
- Preferred Tone/Density: ${preferredTone || 'Balanced'}

Analyze these requirements and return a JSON object with tailored recommendations.
Available Artists:
- "artist-elena": Ines Keza - Master Lash Architect (Wispy Hybrids, Featherweight Volume, Lifts)
- "artist-kai": Gael Mugisha - Fine-Line Tattoo Specialist (Single Needle 1RL, Botanical, Micro-Realism, Kinyarwanda/French script)
- "artist-mila": Sonia Uwase - Dual Specialist (Lashes & Micro Ink)

Available Services:
- "lash-hybrid-wispy": Signature Wispy Hybrid
- "lash-classic-natural": Barely-There Classic
- "lash-mega-volume": Velvet Mega Volume
- "lash-lift-keratin": Keratin Lash Infusion
- "tattoo-fineline-micro": Micro Fine-Line Tattoo
- "tattoo-botanical-ornamental": Botanical & Ornamental Art
- "tattoo-custom-flash": Curated Atelier Flash Piece
`;

    Logger.info('AI model invocation starting', {
      model: 'gemini-3.6-flash',
      category,
      vibeDescription,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite high-fashion beauty & ink consultant. Speak with refined, warm, professional authority. Always output strictly structured valid JSON matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendationTitle: { type: Type.STRING },
            styleDescription: { type: Type.STRING },
            suggestedSpecs: {
              type: Type.OBJECT,
              properties: {
                curlOrStyle: { type: Type.STRING },
                lengthOrSize: { type: Type.STRING },
                densityOrInk: { type: Type.STRING },
                mappingOrPlacement: { type: Type.STRING },
              },
              required: ['curlOrStyle', 'lengthOrSize', 'densityOrInk', 'mappingOrPlacement'],
            },
            recommendedArtistId: { type: Type.STRING },
            recommendedServiceId: { type: Type.STRING },
            prepAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            aftercareHighlight: { type: Type.STRING },
          },
          required: ['recommendationTitle', 'styleDescription', 'suggestedSpecs', 'recommendedArtistId', 'recommendedServiceId', 'prepAdvice', 'aftercareHighlight'],
        },
      },
    });

    if (response.text) {
      const parsed: AiConsultationResponse = JSON.parse(response.text.trim());
      Logger.info('AI model response received', {
        model: 'gemini-3.6-flash',
        recommendationTitle: parsed.recommendationTitle,
        recommendedArtistId: parsed.recommendedArtistId,
        recommendedServiceId: parsed.recommendedServiceId,
      });
      return res.json(parsed);
    } else {
      Logger.warn('AI model returned empty response, using fallback');
      return res.json(fallbackResponse);
    }
  } catch (err: any) {
    Logger.error('Gemini API error during consultation', {
      category,
      error: err.message || String(err),
      stack: err.stack,
    });
    return res.json(fallbackResponse);
  }
});

export default router;
