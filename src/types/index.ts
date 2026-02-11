export interface Destination {
  id: string;
  name: string;
  country: string;
  emoji: string;
  tagline: string;
  image: string;
  scores: {
    beach: number;
    culture: number;
    adventure: number;
    nightlife: number;
    food: number;
    budget: number;
    luxury: number;
    tropical: number;
    cold: number;
    short: number;
    long: number;
    solo: number;
    romantic: number;
    family: number;
  };
  highlights: string[];
  bestTime: string;
  avgFlightPrice: string;
  tripAdvisorSlug: string;
}

export interface ChatOption {
  id: string;
  text: string;
  scores: Record<string, number>;
}

export interface ChatQuestion {
  id: string;
  aiMessage: string;
  options: ChatOption[];
  nextQuestion: string | null;
}

export interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface DestinationMatch {
  destination: Destination;
  matchPercent: number;
  matchedTraits: string[];
}

export interface ChatState {
  messages: Message[];
  currentQuestion: string;
  scores: Record<string, number>;
  isTyping: boolean;
  progress: number;
}
