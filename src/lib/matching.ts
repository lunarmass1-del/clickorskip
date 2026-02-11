import { Destination, DestinationMatch } from '@/types';

interface UserScores {
  [key: string]: number;
}

export function calculateMatches(
  userScores: UserScores,
  destinations: Destination[]
): DestinationMatch[] {
  return destinations
    .map((dest) => {
      let totalScore = 0;
      let maxPossible = 0;
      const matchedTraits: string[] = [];

      // Calculate match for each score category
      Object.entries(userScores).forEach(([key, userValue]) => {
        const destValue = dest.scores[key as keyof typeof dest.scores];
        if (destValue !== undefined && userValue > 0) {
          // Weight by user's preference strength
          const weight = userValue / 10;
          const matchScore = (destValue / 10) * weight;
          totalScore += matchScore;
          maxPossible += weight;

          // Track what matched well
          if (destValue >= 7 && userValue >= 7) {
            matchedTraits.push(key);
          }
        }
      });

      const matchPercent =
        maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 50;

      return {
        destination: dest,
        matchPercent: Math.min(99, Math.max(60, matchPercent)), // Keep between 60-99%
        matchedTraits,
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
}

// Helper to get the top N matches
export function getTopMatches(
  userScores: UserScores,
  destinations: Destination[],
  count: number = 3
): DestinationMatch[] {
  return calculateMatches(userScores, destinations).slice(0, count);
}

// Helper to format matched traits for display
export function formatMatchedTraits(traits: string[]): string[] {
  const traitLabels: Record<string, string> = {
    beach: 'Beach lover',
    culture: 'Culture enthusiast',
    adventure: 'Adventure seeker',
    nightlife: 'Nightlife fan',
    food: 'Foodie',
    budget: 'Budget-friendly',
    luxury: 'Luxury traveler',
    tropical: 'Tropical paradise',
    cold: 'Winter wonderland',
    short: 'Quick getaway',
    long: 'Extended exploration',
    solo: 'Solo traveler',
    romantic: 'Romantic escape',
    family: 'Family-friendly',
  };

  return traits.map((trait) => traitLabels[trait] || trait);
}
