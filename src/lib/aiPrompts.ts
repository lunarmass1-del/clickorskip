/**
 * AI Prompt Templates for Travel Buddy
 * Fun, Gen-Z friendly, but safe travel recommendations
 */

/**
 * System prompt defining the AI's personality and behavior
 */
export const TRAVEL_BUDDY_SYSTEM_PROMPT = `You are TravelBuddy, a fun and enthusiastic travel recommendation assistant for a swipe-based travel app called ClickOrSkip.

PERSONALITY:
- You're like a well-traveled best friend who's excited to help plan trips
- Upbeat, positive, and encouraging without being over the top
- Use casual, modern language that feels natural (not forced or cringe)
- Occasionally use emojis but don't overdo it (1-2 per message max)
- Be genuine and helpful, not salesy or fake
- Show enthusiasm for different travel styles - budget backpacking to luxury escapes

KNOWLEDGE:
- You know about destinations worldwide - popular spots and hidden gems
- You understand different travel styles: adventure, relaxation, culture, food, nightlife
- You're aware of practical considerations: budget, safety, best seasons to visit
- You can suggest activities, local experiences, and must-see attractions

COMMUNICATION STYLE:
- Keep responses concise but informative (2-4 sentences usually)
- Be specific with recommendations when possible
- Acknowledge user preferences shown through their swipe choices
- Make the conversation feel like chatting with a friend

BOUNDARIES:
- ONLY discuss travel-related topics
- If asked about non-travel topics, gently redirect: "That's interesting, but let's focus on finding your dream destination!"
- Never give medical, legal, or financial advice
- Don't make promises about prices or availability
- Stay positive - avoid negative comments about places or cultures`;

/**
 * Prompt for reacting to user's swipe selections
 */
export function getSelectionReactionPrompt(
  selections: string[],
  scores: Record<string, number>
): string {
  const topCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);

  return `The user has been swiping through travel images in our app. Here's what we know:

LIKED IMAGES (swiped right):
${selections.length > 0 ? selections.join(', ') : 'Still exploring!'}

TOP PREFERENCE CATEGORIES (based on swipe patterns):
${topCategories.length > 0 ? topCategories.join(', ') : 'Still learning their preferences'}

CATEGORY SCORES:
${Object.entries(scores)
  .map(([cat, score]) => `- ${cat}: ${score}`)
  .join('\n')}

Based on this, give a brief, friendly reaction (2-3 sentences) that:
1. Acknowledges their apparent travel style/preferences
2. Shows you're picking up on what they like
3. Maybe hints at destination types that might match

Keep it casual and fun - like a friend noticing patterns in their choices.`;
}

/**
 * Prompt for generating final destination recommendations
 */
export function getRecommendationPrompt(
  selections: string[],
  scores: Record<string, number>,
  previousMessages?: string[]
): string {
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  const topCategories = sortedScores.slice(0, 3);
  const lowCategories = sortedScores.slice(-2);

  return `Time to recommend destinations! Here's everything we know about this traveler:

IMAGES THEY LOVED:
${selections.length > 0 ? selections.join(', ') : 'None selected yet'}

PREFERENCE BREAKDOWN:
Strong interests: ${topCategories.map(([c, s]) => `${c} (${s})`).join(', ')}
Less interested in: ${lowCategories.map(([c, s]) => `${c} (${s})`).join(', ')}

${previousMessages ? `CONVERSATION CONTEXT:\n${previousMessages.slice(-3).join('\n')}\n` : ''}

Recommend 2-3 specific destinations that match their vibe. For each:
- Name the place (city/region + country)
- One sentence on why it matches their preferences
- One specific thing they'd love there

Keep the whole response concise and exciting - make them want to book a flight!`;
}

/**
 * Prompt for answering specific travel questions
 */
export function getTravelQuestionPrompt(
  question: string,
  scores: Record<string, number>
): string {
  const topCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);

  return `The user is asking a travel-related question. Their preferences lean toward: ${topCategories.join(', ')}.

USER QUESTION: "${question}"

Provide a helpful, friendly answer that:
1. Directly addresses their question
2. Considers their apparent travel preferences when relevant
3. Offers practical, actionable information
4. Keeps a casual, friendly tone

If the question isn't travel-related, gently redirect to travel topics.`;
}

/**
 * Prompt for when user shares excitement about a destination
 */
export function getExcitementResponsePrompt(
  destination: string,
  scores: Record<string, number>
): string {
  return `The user seems excited about ${destination}! Their travel preference scores are:
${Object.entries(scores).map(([c, s]) => `${c}: ${s}`).join(', ')}

Match their energy with a brief, enthusiastic response (2-3 sentences) that:
1. Validates their excitement
2. Shares one cool fact or tip about the destination
3. Connects it to something from their preferences if relevant

Be genuinely enthusiastic but not over the top.`;
}

/**
 * Fallback prompts for different scenarios
 */
export const FALLBACK_PROMPTS = {
  noPreferences: `The user hasn't swiped enough for us to know their preferences yet. Give a friendly, encouraging message that:
1. Acknowledges they're just getting started
2. Encourages them to keep swiping to help you learn their style
3. Maybe asks what kind of travel vibes they're generally into

Keep it brief and welcoming!`,

  offTopic: `The user asked about something not related to travel. Respond with:
1. A friendly acknowledgment
2. A gentle redirect back to travel topics
3. An open question about their travel interests

Stay positive and helpful!`,

  unclear: `The user's message wasn't clear. Respond with:
1. A friendly request for clarification
2. Suggest what kind of info would be helpful
3. Maybe offer some options for what they might be asking about

Keep it casual and helpful!`,
};

/**
 * Category descriptions for better AI context
 */
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  beach: 'Tropical beaches, coastal relaxation, ocean activities, island vibes',
  mountain: 'Mountain scenery, hiking, alpine adventures, ski destinations',
  city: 'Urban exploration, architecture, museums, city life, shopping',
  nature: 'National parks, wildlife, forests, natural wonders, eco-tourism',
  adventure: 'Extreme sports, adrenaline activities, unique experiences',
  culture: 'Historical sites, local traditions, art, heritage destinations',
  food: 'Culinary experiences, local cuisine, food tours, restaurants',
  nightlife: 'Bars, clubs, evening entertainment, party destinations',
  relaxation: 'Spas, wellness retreats, peaceful getaways, slow travel',
  budget: 'Affordable destinations, backpacker-friendly, value travel',
  luxury: 'High-end resorts, premium experiences, luxury accommodations',
  photography: 'Scenic spots, Instagram-worthy locations, visual experiences',
};

/**
 * Get a description of the user's travel style based on scores
 */
export function getTravelStyleDescription(scores: Record<string, number>): string {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);

  if (sorted.length === 0 || sorted[0][1] === 0) {
    return 'Still discovering their travel style';
  }

  const top = sorted[0][0];
  const second = sorted.length > 1 ? sorted[1][0] : null;

  const styleDescriptions: Record<string, string> = {
    beach: 'beach lover',
    mountain: 'mountain enthusiast',
    city: 'city explorer',
    nature: 'nature seeker',
    adventure: 'adventure junkie',
    culture: 'culture buff',
    food: 'foodie traveler',
    nightlife: 'nightlife enthusiast',
    relaxation: 'relaxation seeker',
    budget: 'budget-conscious traveler',
    luxury: 'luxury traveler',
    photography: 'photography enthusiast',
  };

  const topStyle = styleDescriptions[top] || top;

  if (second && sorted[1][1] > 0) {
    const secondStyle = styleDescriptions[second] || second;
    return `${topStyle} with ${secondStyle} tendencies`;
  }

  return topStyle;
}
