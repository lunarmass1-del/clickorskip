import { ChatQuestion } from '@/types';

export const chatQuestions: Record<string, ChatQuestion> = {
  q1_vibe: {
    id: 'q1_vibe',
    aiMessage: "Hey! I'm your travel buddy! 👋\n\nI'll find your perfect destination in under 60 seconds.\n\nFirst up: What's your ideal travel vibe?",
    options: [
      {
        id: 'beach',
        text: '🏖️ Beach & Relaxation',
        scores: { beach: 10, adventure: 2, culture: 3, nightlife: 4 },
      },
      {
        id: 'culture',
        text: '🏛️ Culture & History',
        scores: { beach: 3, adventure: 4, culture: 10, nightlife: 3 },
      },
      {
        id: 'party',
        text: '🎉 Party & Nightlife',
        scores: { beach: 5, adventure: 3, culture: 4, nightlife: 10 },
      },
      {
        id: 'adventure',
        text: '🏔️ Adventure & Nature',
        scores: { beach: 4, adventure: 10, culture: 5, nightlife: 2 },
      },
    ],
    nextQuestion: 'q2_budget',
  },
  q2_budget: {
    id: 'q2_budget',
    aiMessage: "Great choice! 🌟\n\nNow, let's talk money. What's your budget looking like?",
    options: [
      {
        id: 'budget',
        text: '💰 Budget-friendly (under $1,500)',
        scores: { budget: 10 },
      },
      {
        id: 'mid',
        text: '💵 Mid-range ($1,500 - $3,000)',
        scores: { budget: 6 },
      },
      {
        id: 'luxury',
        text: '💎 Luxury (no limits!)',
        scores: { budget: 2, luxury: 10 },
      },
    ],
    nextQuestion: 'q3_duration',
  },
  q3_duration: {
    id: 'q3_duration',
    aiMessage: "Got it! ✨\n\nHow long are you looking to escape?",
    options: [
      {
        id: 'short',
        text: '⚡ Quick getaway (3-5 days)',
        scores: { short: 10, long: 0 },
      },
      {
        id: 'week',
        text: '📅 About a week (6-9 days)',
        scores: { short: 5, long: 5 },
      },
      {
        id: 'long',
        text: '🌍 Extended trip (10+ days)',
        scores: { short: 0, long: 10 },
      },
    ],
    nextQuestion: 'q4_weather',
  },
  q4_weather: {
    id: 'q4_weather',
    aiMessage: "Nice! 🗓️\n\nWhat weather are you dreaming of?",
    options: [
      {
        id: 'hot',
        text: '☀️ Hot & Sunny',
        scores: { tropical: 10, cold: 0 },
      },
      {
        id: 'mild',
        text: '🌤️ Mild & Pleasant',
        scores: { tropical: 5, cold: 5 },
      },
      {
        id: 'cold',
        text: '❄️ Cool or Cold',
        scores: { tropical: 0, cold: 10 },
      },
      {
        id: 'any',
        text: "🌈 Don't mind!",
        scores: { tropical: 5, cold: 5 },
      },
    ],
    nextQuestion: 'q5_food',
  },
  q5_food: {
    id: 'q5_food',
    aiMessage: "Almost there! 🍽️\n\nHow important is food on your trip?",
    options: [
      {
        id: 'foodie',
        text: '🍜 I travel FOR the food!',
        scores: { food: 10 },
      },
      {
        id: 'important',
        text: '🍕 Good food is a nice bonus',
        scores: { food: 6 },
      },
      {
        id: 'whatever',
        text: "🍔 I'll eat anything",
        scores: { food: 3 },
      },
    ],
    nextQuestion: 'q6_solo',
  },
  q6_solo: {
    id: 'q6_solo',
    aiMessage: "Last question! 🎯\n\nWho are you traveling with?",
    options: [
      {
        id: 'solo',
        text: '🎒 Solo adventure',
        scores: { solo: 10, family: 0 },
      },
      {
        id: 'couple',
        text: '💑 With my partner',
        scores: { romantic: 10 },
      },
      {
        id: 'friends',
        text: '👯 Friends trip',
        scores: { nightlife: 5, adventure: 5 },
      },
      {
        id: 'family',
        text: '👨‍👩‍👧‍👦 Family vacation',
        scores: { family: 10, nightlife: 0 },
      },
    ],
    nextQuestion: null,
  },
};

export const transitionMessages = [
  'Great choice! 🌟',
  'Love it! ✨',
  'Ooh, nice! 👌',
  'Perfect! 🎯',
  'Awesome! 🙌',
];

export const finalMessage = {
  aiMessage: "Amazing! 🎉\n\nI've got your perfect match!\n\nLet me find the best destination for you...",
  showLoader: true,
  redirectTo: '/result',
};

export const getRandomTransition = (): string => {
  return transitionMessages[Math.floor(Math.random() * transitionMessages.length)];
}
