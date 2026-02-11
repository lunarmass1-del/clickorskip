// Visual mood board data for Click/Skip interaction
// Each round presents two contrasting travel vibes

export interface VibeImage {
  id: string;
  url: string;
  alt: string;
  vibe: string;
  scores: Record<string, number>;
}

export interface VibeRound {
  id: string;
  category: string;
  question: string;
  imageA: VibeImage;
  imageB: VibeImage;
}

// 8 rounds of contrasting vibes + 1 wildcard
export const vibeRounds: VibeRound[] = [
  {
    id: 'round1',
    category: 'Energy',
    question: 'What calls to you?',
    imageA: {
      id: 'beach-relax',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop',
      alt: 'Peaceful beach sunset with hammock',
      vibe: 'Chill & Unwind',
      scores: { relaxation: 3, beach: 2, nature: 1 },
    },
    imageB: {
      id: 'city-adventure',
      url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=800&fit=crop',
      alt: 'Vibrant city skyline at night',
      vibe: 'Urban Energy',
      scores: { adventure: 3, urban: 2, nightlife: 1 },
    },
  },
  {
    id: 'round2',
    category: 'Climate',
    question: 'Your ideal weather?',
    imageA: {
      id: 'tropical-warm',
      url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=800&fit=crop',
      alt: 'Tropical palm trees and turquoise water',
      vibe: 'Warm & Tropical',
      scores: { tropical: 3, beach: 2, warm: 2 },
    },
    imageB: {
      id: 'mountain-cool',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop',
      alt: 'Majestic snow-capped mountains',
      vibe: 'Cool & Crisp',
      scores: { mountain: 3, nature: 2, adventure: 1 },
    },
  },
  {
    id: 'round3',
    category: 'Culture',
    question: 'What excites you more?',
    imageA: {
      id: 'ancient-history',
      url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=800&fit=crop',
      alt: 'Ancient Roman Colosseum',
      vibe: 'Ancient History',
      scores: { culture: 3, history: 3, europe: 1 },
    },
    imageB: {
      id: 'modern-future',
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=800&fit=crop',
      alt: 'Futuristic Tokyo cityscape',
      vibe: 'Modern Marvels',
      scores: { urban: 3, modern: 2, asia: 1 },
    },
  },
  {
    id: 'round4',
    category: 'Food',
    question: 'Your food scene?',
    imageA: {
      id: 'street-food',
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop',
      alt: 'Vibrant street food market',
      vibe: 'Street Eats',
      scores: { foodie: 2, budget: 2, authentic: 2 },
    },
    imageB: {
      id: 'fine-dining',
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop',
      alt: 'Elegant fine dining experience',
      vibe: 'Fine Dining',
      scores: { luxury: 3, foodie: 2, romantic: 1 },
    },
  },
  {
    id: 'round5',
    category: 'Accommodation',
    question: 'Where do you sleep?',
    imageA: {
      id: 'boutique-hotel',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop',
      alt: 'Luxurious infinity pool resort',
      vibe: 'Resort Vibes',
      scores: { luxury: 3, relaxation: 2, beach: 1 },
    },
    imageB: {
      id: 'unique-stay',
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=800&fit=crop',
      alt: 'Cozy treehouse in the jungle',
      vibe: 'Unique Stays',
      scores: { adventure: 2, nature: 2, authentic: 2 },
    },
  },
  {
    id: 'round6',
    category: 'Activities',
    question: 'Your perfect day?',
    imageA: {
      id: 'water-activities',
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=800&fit=crop',
      alt: 'Crystal clear water snorkeling',
      vibe: 'Water Adventures',
      scores: { beach: 3, adventure: 2, tropical: 1 },
    },
    imageB: {
      id: 'land-explore',
      url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=800&fit=crop',
      alt: 'Hiking through lush mountains',
      vibe: 'Land Explorer',
      scores: { nature: 3, adventure: 2, mountain: 1 },
    },
  },
  {
    id: 'round7',
    category: 'Vibe',
    question: 'Your travel mood?',
    imageA: {
      id: 'romantic-sunset',
      url: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&h=800&fit=crop',
      alt: 'Romantic couple watching sunset',
      vibe: 'Romance',
      scores: { romantic: 3, relaxation: 2, luxury: 1 },
    },
    imageB: {
      id: 'party-friends',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop',
      alt: 'Friends celebrating at beach party',
      vibe: 'Party Time',
      scores: { nightlife: 3, adventure: 2, beach: 1 },
    },
  },
  {
    id: 'round8',
    category: 'Budget',
    question: 'Your travel style?',
    imageA: {
      id: 'backpacker',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=800&fit=crop',
      alt: 'Backpacker exploring local markets',
      vibe: 'Budget Explorer',
      scores: { budget: 3, authentic: 2, adventure: 1 },
    },
    imageB: {
      id: 'luxury-travel',
      url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=800&fit=crop',
      alt: 'Luxury yacht in crystal waters',
      vibe: 'Luxury Escape',
      scores: { luxury: 3, relaxation: 2, beach: 1 },
    },
  },
];

// Wildcard images - surprise timed selection
export const wildcardImages: VibeImage[] = [
  {
    id: 'wildcard-aurora',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=800&fit=crop',
    alt: 'Northern lights dancing in the sky',
    vibe: 'Aurora Magic',
    scores: { nature: 3, adventure: 2, unique: 3 },
  },
  {
    id: 'wildcard-safari',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=800&fit=crop',
    alt: 'African safari with elephants',
    vibe: 'Safari Dreams',
    scores: { nature: 3, adventure: 3, authentic: 2 },
  },
  {
    id: 'wildcard-temple',
    url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=800&fit=crop',
    alt: 'Ancient temple in misty mountains',
    vibe: 'Spiritual Journey',
    scores: { culture: 3, history: 2, asia: 2 },
  },
  {
    id: 'wildcard-desert',
    url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=800&fit=crop',
    alt: 'Desert dunes at golden hour',
    vibe: 'Desert Adventure',
    scores: { adventure: 3, unique: 2, nature: 2 },
  },
];

// AI chat reactions based on selections
export const aiReactions = {
  beach: [
    "I see you - sandy toes and ocean breeze kind of person! ",
    "Beach vibes detected! You've got great taste ",
    "Salt water heals everything, right? Love that energy!",
  ],
  adventure: [
    "Thrill seeker alert! I'm here for it ",
    "You're not here for ordinary - I respect that!",
    "Adventure is calling and you're clearly answering!",
  ],
  relaxation: [
    "Self-care queen/king energy! Rest is productive ",
    "Unwind mode activated - you deserve it!",
    "Taking it easy is an art form. You get it!",
  ],
  luxury: [
    "Treating yourself? As you should! ",
    "Champagne taste - nothing wrong with that!",
    "Living your best life, I see you!",
  ],
  culture: [
    "A curious mind loves to explore! ",
    "History buff vibes - the stories places can tell!",
    "Culture vulture spotted! Love the depth!",
  ],
  nature: [
    "Nature is the ultimate therapy, honestly ",
    "Green spaces and open places - you get it!",
    "Connecting with nature hits different!",
  ],
  urban: [
    "City lights calling your name! ",
    "The energy of a bustling city - unmatched!",
    "Concrete jungle where dreams are made!",
  ],
  foodie: [
    "Travel for the food? SAME! ",
    "Eating your way through destinations - elite!",
    "Foodie priorities are the right priorities!",
  ],
  romantic: [
    "Love is in the air! ",
    "Couple goals destination incoming!",
    "Romance mode activated - so cute!",
  ],
  nightlife: [
    "Party people in the house! ",
    "The night is young and so are you!",
    "Dance floors await your presence!",
  ],
  budget: [
    "Smart traveler alert! More trips > one expensive trip ",
    "Stretch that budget and see more - genius!",
    "Value hunter - I respect the game!",
  ],
};

// Get a random AI reaction based on selected scores
export function getAIReaction(scores: Record<string, number>): string {
  const topVibe = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (!topVibe) return "Interesting choice! Tell me more...";

  const reactions = aiReactions[topVibe[0] as keyof typeof aiReactions];
  if (!reactions) return "I like where this is going!";

  return reactions[Math.floor(Math.random() * reactions.length)];
}

// Get random wildcard image
export function getRandomWildcard(): VibeImage {
  return wildcardImages[Math.floor(Math.random() * wildcardImages.length)];
}
