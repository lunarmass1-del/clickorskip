/**
 * AI Route Handler for Travel Recommendations
 *
 * Currently uses a smart mock implementation that can be easily
 * swapped for Cloudflare Workers AI when ready.
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateInput, filterOutput, getHardenedSystemPrompt } from '@/lib/aiSafety';
import {
  TRAVEL_BUDDY_SYSTEM_PROMPT,
  getSelectionReactionPrompt,
  getRecommendationPrompt,
  getTravelQuestionPrompt,
  getTravelStyleDescription,
  CATEGORY_DESCRIPTIONS,
} from '@/lib/aiPrompts';

// Types
interface AIRequestBody {
  message: string;
  context: {
    scores: Record<string, number>;
    selections: string[];
  };
  action?: 'chat' | 'react' | 'recommend';
}

interface AIResponse {
  success: boolean;
  message: string;
  error?: string;
}

interface CloudflareAIResponse {
  result: {
    response: string;
  };
  success: boolean;
  errors: string[];
}

// Environment configuration
const CLOUDFLARE_AI_ENABLED = process.env.CLOUDFLARE_AI_ENABLED === 'true';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_AI_TOKEN = process.env.CLOUDFLARE_AI_TOKEN;
const CLOUDFLARE_AI_MODEL = process.env.CLOUDFLARE_AI_MODEL || '@cf/meta/llama-2-7b-chat-int8';

/**
 * Call Cloudflare Workers AI
 * Ready to use when environment variables are configured
 */
async function callCloudflareAI(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_AI_TOKEN) {
    throw new Error('Cloudflare AI credentials not configured');
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_AI_MODEL}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_AI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudflare AI error: ${response.status} - ${errorText}`);
  }

  const data: CloudflareAIResponse = await response.json();

  if (!data.success || data.errors?.length > 0) {
    throw new Error(`Cloudflare AI failed: ${data.errors?.join(', ') || 'Unknown error'}`);
  }

  return data.result.response;
}

/**
 * Smart mock AI implementation
 * Generates contextual responses based on user preferences
 */
function generateMockResponse(
  message: string,
  context: AIRequestBody['context'],
  action: AIRequestBody['action']
): string {
  const { scores, selections } = context;
  const travelStyle = getTravelStyleDescription(scores);

  // Get top categories
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0);

  const topCategory = sortedCategories[0]?.[0];
  const secondCategory = sortedCategories[1]?.[0];

  // Destination recommendations based on preferences
  const destinationsByCategory: Record<string, string[]> = {
    beach: ['Bali, Indonesia', 'Maldives', 'Tulum, Mexico', 'Phuket, Thailand', 'Amalfi Coast, Italy'],
    mountain: ['Swiss Alps', 'Banff, Canada', 'Patagonia, Argentina', 'Queenstown, New Zealand', 'Chamonix, France'],
    city: ['Tokyo, Japan', 'Barcelona, Spain', 'New York City', 'Berlin, Germany', 'Melbourne, Australia'],
    nature: ['Costa Rica', 'Iceland', 'Norwegian Fjords', 'Galápagos Islands', 'Canadian Rockies'],
    adventure: ['Queenstown, New Zealand', 'Interlaken, Switzerland', 'Costa Rica', 'South Africa', 'Nepal'],
    culture: ['Kyoto, Japan', 'Rome, Italy', 'Marrakech, Morocco', 'Istanbul, Turkey', 'Cusco, Peru'],
    food: ['Tokyo, Japan', 'Bangkok, Thailand', 'San Sebastián, Spain', 'Mexico City', 'Bologna, Italy'],
    nightlife: ['Berlin, Germany', 'Ibiza, Spain', 'Bangkok, Thailand', 'Miami, USA', 'Amsterdam, Netherlands'],
    relaxation: ['Bali, Indonesia', 'Maldives', 'Santorini, Greece', 'Koh Samui, Thailand', 'Sedona, Arizona'],
    luxury: ['Dubai', 'Maldives', 'Monaco', 'St. Barts', 'Bora Bora'],
    budget: ['Vietnam', 'Portugal', 'Guatemala', 'Indonesia', 'Colombia'],
    photography: ['Iceland', 'Santorini, Greece', 'Cappadocia, Turkey', 'Zhangjiajie, China', 'Faroe Islands'],
  };

  // Handle different actions
  if (action === 'react' || message.toLowerCase().includes('swipe') || message.toLowerCase().includes('selection')) {
    if (selections.length === 0 && sortedCategories.length === 0) {
      return "Hey, you're just getting started! Keep swiping through those pics - I'm learning what catches your eye. Beach vibes? Mountain adventures? City escapes? Show me what you're into!";
    }

    if (topCategory) {
      const reactions: Record<string, string> = {
        beach: "Ooh, I'm sensing some serious beach vibes from you! Those coastal pics are calling your name. You've got that sun-and-sand energy going on.",
        mountain: "A fellow mountain lover! I can tell you're drawn to those dramatic peaks and alpine views. There's something about that crisp mountain air, right?",
        city: "You've got that urban explorer energy! The city lights, the architecture, the buzzing streets - I see you appreciating that metropolitan magic.",
        nature: "Nature is definitely your thing! Those wild landscapes and natural wonders are speaking to you. Love to see someone who appreciates the great outdoors.",
        adventure: "Whoa, adventure seeker alert! You're clearly into the adrenaline-pumping stuff. I respect the thrill-chasing energy!",
        culture: "A culture enthusiast! You're drawn to history, traditions, and authentic experiences. That's the way to travel deep, not just wide.",
        food: "Fellow foodie detected! You clearly know that the best way to experience a place is through its cuisine. My kind of traveler!",
        nightlife: "You've got that after-dark energy! Clearly someone who knows the best adventures often start when the sun goes down.",
        relaxation: "I'm picking up major chill vibes from you. Sometimes the best trips are the ones where you actually unwind. Self-care travel is valid!",
        luxury: "You've got refined taste! Nothing wrong with wanting the finer things when you travel. Treat yourself energy activated.",
        budget: "Smart traveler alert! You know that amazing experiences don't need to break the bank. Stretch that travel fund!",
        photography: "An eye for the aesthetic! You're clearly drawn to those picture-perfect moments. Your camera roll must be incredible.",
      };

      return reactions[topCategory] || `You're showing strong ${topCategory} preferences! That's a great travel style.`;
    }
  }

  if (action === 'recommend' || message.toLowerCase().includes('recommend') || message.toLowerCase().includes('where should')) {
    if (!topCategory) {
      return "I'd love to recommend some places, but I need to learn more about your vibe first! Keep swiping so I can figure out what kind of destinations would be perfect for you.";
    }

    const destinations = destinationsByCategory[topCategory] || destinationsByCategory.city;
    const secondaryDests = secondCategory ? destinationsByCategory[secondCategory] || [] : [];

    const mainDest = destinations[Math.floor(Math.random() * 3)];
    const altDest = destinations[Math.floor(Math.random() * 2) + 2];
    const mixDest = secondaryDests[0] || destinations[1];

    return `Based on your ${travelStyle} energy, here are my picks for you:

**${mainDest}** - This is peak ${topCategory} vibes and would be perfect for what you're looking for. The ${CATEGORY_DESCRIPTIONS[topCategory]?.split(',')[0]?.toLowerCase() || 'experiences'} there are unmatched.

**${altDest}** - Another solid choice! A bit different flavor but still hits that ${topCategory} sweet spot you're clearly into.

${secondCategory ? `**${mixDest}** - This one mixes your ${topCategory} love with some ${secondCategory} elements. Best of both worlds!` : ''}

Want me to dive deeper into any of these?`;
  }

  // Default conversational responses
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    const vibeHint = topCategory
      ? "I can already tell you're into " + topCategory + " vibes!"
      : "Start swiping on some travel pics and I'll learn what you're into!";
    return "Hey there! I'm your travel buddy here to help you find your perfect destination. " + vibeHint + " What's on your mind?";
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('how does')) {
    return "Here's the deal: swipe right on travel pics that catch your eye, left on ones that don't vibe with you. I'll learn your preferences and recommend destinations that match your travel style perfectly. Easy! Got questions about anywhere specific?";
  }

  if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
    return "Budget travel is totally doable! Southeast Asia (Vietnam, Thailand, Indonesia) gives you incredible bang for your buck. Portugal and Eastern Europe are great for Europe on a budget. Want specific tips for stretching your travel fund?";
  }

  if (lowerMessage.includes('safe') || lowerMessage.includes('solo')) {
    return "Solo travel is amazing! For first-timers, I'd suggest Japan (super safe, easy to navigate), Portugal (friendly, affordable), or New Zealand (adventure + safety). The key is doing your research and trusting your gut. Any specific concerns?";
  }

  if (lowerMessage.includes('when') || lowerMessage.includes('season') || lowerMessage.includes('time')) {
    return "Timing can make or break a trip! Generally: shoulder seasons (spring/fall) give you better prices and fewer crowds. Southeast Asia is best Nov-Feb, Europe peaks in summer. Where are you thinking of going? I can give you the scoop on timing.";
  }

  // Generic travel-positive response
  if (topCategory) {
    return `Since you're clearly into ${topCategory} experiences, I've got some ideas! The destinations I'd suggest for your vibe include ${destinationsByCategory[topCategory]?.slice(0, 3).join(', ')}. Any of those catching your interest? Or tell me more about what you're looking for!`;
  }

  return "I'm here to help you find amazing travel destinations! Keep swiping through pics to help me understand your style, or just ask me anything about travel. Beach getaway? Mountain adventure? City exploration? What sounds good to you?";
}

/**
 * Main POST handler
 */
export async function POST(request: NextRequest): Promise<NextResponse<AIResponse>> {
  try {
    // Parse request body
    const body: AIRequestBody = await request.json();
    const { message, context, action = 'chat' } = body;

    // Validate required fields
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: '', error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!context || typeof context !== 'object') {
      return NextResponse.json(
        { success: false, message: '', error: 'Context is required' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validation = validateInput(message);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Let's keep our chat focused on travel! What destinations are you curious about?",
          error: validation.reason
        },
        { status: 200 } // Return 200 to not expose validation details
      );
    }

    let aiResponse: string;

    // Use Cloudflare AI if enabled and configured
    if (CLOUDFLARE_AI_ENABLED && CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_AI_TOKEN) {
      try {
        // Build the appropriate prompt based on action
        let userPrompt: string;

        switch (action) {
          case 'react':
            userPrompt = getSelectionReactionPrompt(context.selections, context.scores);
            break;
          case 'recommend':
            userPrompt = getRecommendationPrompt(context.selections, context.scores);
            break;
          default:
            userPrompt = getTravelQuestionPrompt(validation.sanitizedInput, context.scores);
        }

        const systemPrompt = getHardenedSystemPrompt(TRAVEL_BUDDY_SYSTEM_PROMPT);
        aiResponse = await callCloudflareAI(systemPrompt, userPrompt);
      } catch (cloudflareError) {
        console.error('Cloudflare AI error, falling back to mock:', cloudflareError);
        // Fall back to mock implementation
        aiResponse = generateMockResponse(validation.sanitizedInput, context, action);
      }
    } else {
      // Use mock implementation
      aiResponse = generateMockResponse(validation.sanitizedInput, context, action);
    }

    // Filter output for safety
    const filtered = filterOutput(aiResponse);

    return NextResponse.json({
      success: true,
      message: filtered.filteredOutput,
    });

  } catch (error) {
    console.error('AI route error:', error);

    // Don't expose internal error details
    return NextResponse.json(
      {
        success: false,
        message: "Oops! Something went wrong on my end. Try asking again?",
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    aiEnabled: CLOUDFLARE_AI_ENABLED,
    model: CLOUDFLARE_AI_MODEL,
    timestamp: new Date().toISOString(),
  });
}
