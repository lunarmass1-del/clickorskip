# ClickOrSkip.online - Find Your Perfect Destination

## Project Overview
An AI-powered travel destination finder. Users chat with an AI agent that asks about their travel preferences, then matches them with their perfect destination. Monetized via TripAdvisor (CPA) and NordVPN (upsell).

## Brand Identity
- **Name:** ClickOrSkip
- **Domain:** clickorskip.online
- **Tagline:** "Find Your Perfect Escape in 60 Seconds"
- **Vibe:** Modern, fun, trustworthy, wanderlust-inspiring
- **Target:** People dreaming about their next vacation (25-45 year olds)

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter + Playfair Display)
- **Hosting:** Cloudflare Pages (FREE)
- **AI Chat:** Hardcoded conversation flow (no external API needed)

## Project Structureclickorskip/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page (hero + CTA)
│   │   ├── layout.tsx               # Root layout with fonts/metadata
│   │   ├── globals.css              # Global styles + custom animations
│   │   ├── chat/
│   │   │   └── page.tsx             # Main chat interface
│   │   └── result/
│   │       └── page.tsx             # Result page with CPA links
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Logo + minimal nav
│   │   │   ├── Footer.tsx           # Simple footer with links
│   │   │   └── MobileNav.tsx        # Mobile menu if needed
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.tsx             # Main hero section
│   │   │   ├── HowItWorks.tsx       # 3-step explainer
│   │   │   ├── Destinations.tsx     # Preview of destinations
│   │   │   ├── Testimonials.tsx     # Social proof
│   │   │   └── FinalCTA.tsx         # Bottom call-to-action
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx    # Main chat wrapper
│   │   │   ├── ChatBubble.tsx       # Individual message bubble
│   │   │   ├── OptionButton.tsx     # Clickable response options
│   │   │   ├── TypingIndicator.tsx  # "AI is typing..." animation
│   │   │   └── ProgressBar.tsx      # Shows chat progress (1/6, 2/6...)
│   │   │
│   │   ├── result/
│   │   │   ├── DestinationCard.tsx  # The matched destination display
│   │   │   ├── MatchScore.tsx       # Animated percentage circle
│   │   │   ├── CTAButtons.tsx       # TripAdvisor affiliate buttons
│   │   │   ├── VPNUpsell.tsx        # NordVPN offer banner
│   │   │   └── ShareButtons.tsx     # Social sharing
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx           # Reusable button component
│   │       ├── Card.tsx             # Reusable card component
│   │       └── Container.tsx        # Max-width wrapper
│   │
│   ├── data/
│   │   ├── destinations.ts          # All 20 destinations with scores
│   │   ├── chatFlow.ts              # Complete conversation tree
│   │   └── affiliateLinks.ts        # CPA link configuration
│   │
│   ├── lib/
│   │   ├── matching.ts              # Destination matching algorithm
│   │   ├── chatEngine.ts            # Manages conversation state
│   │   └── utils.ts                 # Helper functions (cn, etc.)
│   │
│   ├── hooks/
│   │   ├── useChat.ts               # Chat state management hook
│   │   └── useTypewriter.ts         # Typewriter effect for AI messages
│   │
│   └── types/
│       └── index.ts                 # TypeScript interfaces
│
├── public/
│   ├── images/
│   │   ├── destinations/            # Destination photos (use Unsplash URLs)
│   │   ├── hero-bg.jpg              # Hero background
│   │   └── og-image.jpg             # Social sharing image
│   ├── favicon.ico
│   └── logo.svg
│
├── CLAUDE.md                        # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js

## Design System

### Colors
```css:root {
/* Backgrounds /
--bg-primary: #0a0a0f;           / Near black - main bg /
--bg-secondary: #12121a;          / Slightly lighter - cards /
--bg-tertiary: #1a1a24;           / Chat bubbles, inputs *//* Accent Colors /
--accent-primary: #6366f1;        / Indigo - main accent /
--accent-secondary: #8b5cf6;      / Purple - secondary */
--accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);/* Travel Vibes /
--travel-tropical: #06b6d4;       / Cyan - beaches /
--travel-sunset: #f97316;         / Orange - adventure /
--travel-nature: #22c55e;         / Green - nature *//* Text */
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--text-muted: #71717a;/* UI States */
--success: #22c55e;
--error: #ef4444;
}

### Typography
```css/* Headings - Playfair Display */
font-family: 'Playfair Display', serif;/* Body - Inter */
font-family: 'Inter', sans-serif;/* Scale /
--text-xs: 0.75rem;    / 12px /
--text-sm: 0.875rem;   / 14px /
--text-base: 1rem;     / 16px /
--text-lg: 1.125rem;   / 18px /
--text-xl: 1.25rem;    / 20px /
--text-2xl: 1.5rem;    / 24px /
--text-3xl: 1.875rem;  / 30px /
--text-4xl: 2.25rem;   / 36px /
--text-5xl: 3rem;      / 48px /
--text-6xl: 3.75rem;   / 60px */

### Spacing & Layout
```css/* Mobile first breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px/* Container max-width /
max-width: 1200px;
padding-inline: 1rem; / mobile /
padding-inline: 2rem; / desktop *//* Sections /
padding-block: 4rem;  / mobile /
padding-block: 6rem;  / desktop */

### Component Styles

#### Buttons
```css/* Primary Button /
.btn-primary {
background: var(--accent-gradient);
color: white;
padding: 0.875rem 2rem;
border-radius: 9999px;      / Fully rounded */
font-weight: 600;
transition: all 0.2s;
box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}
.btn-primary:hover {
transform: translateY(-2px);
box-shadow: 0 6px 30px rgba(99, 102, 241, 0.5);
}/* Secondary Button */
.btn-secondary {
background: transparent;
border: 1px solid rgba(255,255,255,0.2);
color: white;
padding: 0.875rem 2rem;
border-radius: 9999px;
}/* Chat Option Button */
.btn-option {
background: var(--bg-tertiary);
border: 1px solid rgba(255,255,255,0.1);
color: white;
padding: 1rem 1.5rem;
border-radius: 1rem;
text-align: left;
transition: all 0.2s;
}
.btn-option:hover {
border-color: var(--accent-primary);
background: rgba(99, 102, 241, 0.1);
}

#### Cards
```css.card {
background: var(--bg-secondary);
border: 1px solid rgba(255,255,255,0.05);
border-radius: 1.5rem;
padding: 2rem;
}

#### Chat Bubbles
```css/* AI Message */
.chat-ai {
background: var(--bg-tertiary);
border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
padding: 1rem 1.25rem;
max-width: 85%;
}/* User Message */
.chat-user {
background: var(--accent-gradient);
border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
padding: 1rem 1.25rem;
max-width: 85%;
margin-left: auto;
}

## Page Layouts

### Landing Page (/)┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo (left) | "Start Chat" button (right)          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                         HERO SECTION                        │
│                                                             │
│     "Find Your Perfect                                      │
│      Escape in 60 Seconds"                                  │
│                                                             │
│     Our AI travel buddy asks a few quick questions          │
│     and matches you with your dream destination.            │
│                                                             │
│              [ ✨ Start Chatting → ]                        │
│                                                             │
│     🌍 50,000+ trips matched  ⭐ 4.9/5 rating               │
│                                                             │
│  [Background: Subtle animated gradient or travel imagery]   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     HOW IT WORKS                            │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │ 💬       │    │ 🎯       │    │ ✈️        │            │
│   │ Chat     │ →  │ Match    │ →  │ Book     │            │
│   │          │    │          │    │          │            │
│   │ Answer   │    │ We find  │    │ Get the  │            │
│   │ 6 quick  │    │ your     │    │ best     │            │
│   │ questions│    │ perfect  │    │ deals    │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                  POPULAR DESTINATIONS                       │
│                                                             │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐            │
│   │Bali │  │Paris│  │Tokyo│  │Dubai│  │Rome │            │
│   │ 🌴  │  │ 🗼  │  │ 🏯  │  │ 🏙️  │  │ 🏛️  │            │
│   └─────┘  └─────┘  └─────┘  └─────┘  └─────┘            │
│                                                             │
│   "Not sure where to go? Let us help you discover!"        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    TESTIMONIALS                             │
│                                                             │
│   "ClickOrSkip found me the perfect honeymoon spot..."     │
│                                           - Sarah, 28       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     FINAL CTA                               │
│                                                             │
│        Ready to Find Your Perfect Destination?              │
│                                                             │
│              [ 🚀 Start Now - It's Free ]                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER: © 2026 ClickOrSkip | Privacy | Terms               │
└─────────────────────────────────────────────────────────────┘

### Chat Page (/chat)┌─────────────────────────────────────────────────────────────┐
│ HEADER: ← Back | ClickOrSkip | Progress (2/6)              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      CHAT AREA                              │
│                   (scrollable)                              │
│                                                             │
│  ┌─────────────────────────────────────┐                   │
│  │ 🤖 Hey! I'm your travel buddy! 👋   │                   │
│  │                                      │                   │
│  │ I'll help you find your perfect     │                   │
│  │ destination in under 60 seconds.    │                   │
│  │                                      │                   │
│  │ Ready to start?                     │                   │
│  └─────────────────────────────────────┘                   │
│                                                             │
│                    ┌─────────────────────────────┐         │
│                    │ Yes, let's go! 🚀           │         │
│                    └─────────────────────────────┘         │
│                                                             │
│  ┌─────────────────────────────────────┐                   │
│  │ 🤖 Awesome! First question...       │                   │
│  │                                      │                   │
│  │ What's your travel vibe?            │                   │
│  └─────────────────────────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ 🏖️  Beach & Relaxation                      │           │
│  └─────────────────────────────────────────────┘           │
│  ┌─────────────────────────────────────────────┐           │
│  │ 🏛️  Culture & History                       │           │
│  └─────────────────────────────────────────────┘           │
│  ┌─────────────────────────────────────────────┐           │
│  │ 🎉  Party & Nightlife                       │           │
│  └─────────────────────────────────────────────┘           │
│  ┌─────────────────────────────────────────────┐           │
│  │ 🏔️  Adventure & Nature                      │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘MOBILE: Full screen chat, options stacked vertically
DESKTOP: Centered container (max 600px), more padding

### Result Page (/result)┌─────────────────────────────────────────────────────────────┐
│ HEADER: ClickOrSkip | [Start Over]                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   🎉 We Found Your Perfect Match!                          │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │              [DESTINATION IMAGE]                     │  │
│   │                  (large, beautiful)                  │  │
│   │                                                      │  │
│   │   ┌───────────┐                                     │  │
│   │   │   94%     │   BALI, INDONESIA                   │  │
│   │   │  MATCH    │   "Island paradise with             │  │
│   │   └───────────┘    ancient temples"                 │  │
│   │                                                      │  │
│   │   ✓ Perfect for: Beach lovers                       │  │
│   │   ✓ Budget: $$$                                     │  │
│   │   ✓ Best time: Apr - Oct                            │  │
│   │                                                      │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │  🔍 Search Flights on TripAdvisor           │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                      │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │  🏨 Find Hotels on TripAdvisor              │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ 🔒 TRAVELING? PROTECT YOUR DATA                     │  │
│   │                                                      │  │
│   │ 83% of hotel WiFi networks are vulnerable.          │  │
│   │ Keep your bookings & banking safe abroad.           │  │
│   │                                                      │  │
│   │ NordVPN: 67% OFF + 3 Months FREE                    │  │
│   │                                                      │  │
│   │         [ 🛡️ Secure My Trip → ]                     │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ───────────────────────────────────────────────────────  │
│                                                             │
│   Other great matches for you:                             │
│                                                             │
│   ┌─────────┐  ┌─────────┐                                │
│   │Thailand │  │ Greece  │                                │
│   │  87%    │  │  82%    │                                │
│   └─────────┘  └─────────┘                                │
│                                                             │
│   ───────────────────────────────────────────────────────  │
│                                                             │
│   Share your result:  [Twitter] [Facebook] [Copy Link]     │
│                                                             │
│                   [ 🔄 Try Again ]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

## Chat Flow (Complete Conversation)

### Question 1: Travel Vibe
```typescript{
id: 'q1_vibe',
aiMessage: "Hey! I'm your travel buddy! 👋\n\nI'll find your perfect destination in under 60 seconds.\n\nFirst up: What's your ideal travel vibe?",
options: [
{ id: 'beach', text: '🏖️ Beach & Relaxation', scores: { beach: 10, adventure: 2, culture: 3, nightlife: 4 } },
{ id: 'culture', text: '🏛️ Culture & History', scores: { beach: 3, adventure: 4, culture: 10, nightlife: 3 } },
{ id: 'party', text: '🎉 Party & Nightlife', scores: { beach: 5, adventure: 3, culture: 4, nightlife: 10 } },
{ id: 'adventure', text: '🏔️ Adventure & Nature', scores: { beach: 4, adventure: 10, culture: 5, nightlife: 2 } },
],
nextQuestion: 'q2_budget'
}

### Question 2: Budget
```typescript{
id: 'q2_budget',
aiMessage: "Great choice! 🌟\n\nNow, let's talk money. What's your budget looking like?",
options: [
{ id: 'budget', text: '💰 Budget-friendly (under $1,500)', scores: { budget: 10 } },
{ id: 'mid', text: '💵 Mid-range ($1,500 - $3,000)', scores: { budget: 6 } },
{ id: 'luxury', text: '💎 Luxury (no limits!)', scores: { budget: 2, luxury: 10 } },
],
nextQuestion: 'q3_duration'
}

### Question 3: Duration
```typescript{
id: 'q3_duration',
aiMessage: "Got it! ✨\n\nHow long are you looking to escape?",
options: [
{ id: 'short', text: '⚡ Quick getaway (3-5 days)', scores: { short: 10, long: 0 } },
{ id: 'week', text: '📅 About a week (6-9 days)', scores: { short: 5, long: 5 } },
{ id: 'long', text: '🌍 Extended trip (10+ days)', scores: { short: 0, long: 10 } },
],
nextQuestion: 'q4_weather'
}

### Question 4: Weather
```typescript{
id: 'q4_weather',
aiMessage: "Nice! 🗓️\n\nWhat weather are you dreaming of?",
options: [
{ id: 'hot', text: '☀️ Hot & Sunny', scores: { tropical: 10, cold: 0 } },
{ id: 'mild', text: '🌤️ Mild & Pleasant', scores: { tropical: 5, cold: 5 } },
{ id: 'cold', text: '❄️ Cool or Cold', scores: { tropical: 0, cold: 10 } },
{ id: 'any', text: '🌈 Don't mind!', scores: { tropical: 5, cold: 5 } },
],
nextQuestion: 'q5_food'
}

### Question 5: Food
```typescript{
id: 'q5_food',
aiMessage: "Almost there! 🍽️\n\nHow important is food on your trip?",
options: [
{ id: 'foodie', text: '🍜 I travel FOR the food!', scores: { food: 10 } },
{ id: 'important', text: '🍕 Good food is a nice bonus', scores: { food: 6 } },
{ id: 'whatever', text: '🍔 I'll eat anything', scores: { food: 3 } },
],
nextQuestion: 'q6_solo'
}

### Question 6: Travel Companions
```typescript{
id: 'q6_solo',
aiMessage: "Last question! 🎯\n\nWho are you traveling with?",
options: [
{ id: 'solo', text: '🎒 Solo adventure', scores: { solo: 10, family: 0 } },
{ id: 'couple', text: '💑 With my partner', scores: { romantic: 10 } },
{ id: 'friends', text: '👯 Friends trip', scores: { nightlife: 5, adventure: 5 } },
{ id: 'family', text: '👨‍👩‍👧‍👦 Family vacation', scores: { family: 10, nightlife: 0 } },
],
nextQuestion: null // End - show results
}

### AI Transition Messages
```typescriptconst transitionMessages = [
"Great choice! 🌟",
"Love it! ✨",
"Ooh, nice! 👌",
"Perfect! 🎯",
"Awesome! 🙌"
];

### Final Message Before Results
```typescript{
aiMessage: "Amazing! 🎉\n\nI've got your perfect match!\n\nLet me find the best destination for you...",
showLoader: true,
redirectTo: '/result'
}

## Destination Database
```typescriptinterface Destination {
id: string;
name: string;
country: string;
emoji: string;
tagline: string;
image: string; // Unsplash URL
scores: {
beach: number;      // 0-10
culture: number;    // 0-10
adventure: number;  // 0-10
nightlife: number;  // 0-10
food: number;       // 0-10
budget: number;     // 0-10 (10 = cheap)
luxury: number;     // 0-10
tropical: number;   // 0-10
cold: number;       // 0-10
short: number;      // 0-10 (good for short trips)
long: number;       // 0-10 (good for long trips)
solo: number;       // 0-10
romantic: number;   // 0-10
family: number;     // 0-10
};
highlights: string[];      // 3-4 bullet points
bestTime: string;          // "Apr - Oct"
avgFlightPrice: string;    // "From $599"
tripAdvisorSlug: string;   // For building affiliate URL
}const destinations: Destination[] = [
{
id: 'bali',
name: 'Bali',
country: 'Indonesia',
emoji: '🌴',
tagline: 'Island paradise with ancient temples',
image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
scores: {
beach: 10, culture: 9, adventure: 7, nightlife: 6,
food: 8, budget: 8, luxury: 9, tropical: 10,
cold: 0, short: 4, long: 9, solo: 9, romantic: 10, family: 7
},
highlights: ['World-class beaches', 'Ancient temples', 'Amazing surfing', 'Affordable luxury'],
bestTime: 'Apr - Oct',
avgFlightPrice: 'From $599',
tripAdvisorSlug: 'Bali'
},
{
id: 'paris',
name: 'Paris',
country: 'France',
emoji: '🗼',
tagline: 'The city of love and lights',
image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
scores: {
beach: 0, culture: 10, adventure: 4, nightlife: 8,
food: 10, budget: 3, luxury: 10, tropical: 0,
cold: 6, short: 8, long: 7, solo: 7, romantic: 10, family: 7
},
highlights: ['World-famous cuisine', 'Iconic landmarks', 'Art & museums', 'Romantic atmosphere'],
bestTime: 'Apr - Jun, Sep - Nov',
avgFlightPrice: 'From $449',
tripAdvisorSlug: 'Paris'
},
{
id: 'tokyo',
name: 'Tokyo',
country: 'Japan',
emoji: '🏯',
tagline: 'Where tradition meets future',
image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
scores: {
beach: 2, culture: 10, adventure: 6, nightlife: 9,
food: 10, budget: 4, luxury: 9, tropical: 3,
cold: 5, short: 6, long: 10, solo: 10, romantic: 7, family: 8
},
highlights: ['Incredible food scene', 'Unique culture', 'Safe for solo travelers', 'Tech wonderland'],
bestTime: 'Mar - May, Sep - Nov',
avgFlightPrice: 'From $699',
tripAdvisorSlug: 'Tokyo'
},
{
id: 'barcelona',
name: 'Barcelona',
country: 'Spain',
emoji: '🏖️',
tagline: 'Beach city with Gothic charm',
image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
scores: {
beach: 8, culture: 9, adventure: 5, nightlife: 10,
food: 9, budget: 5, luxury: 7, tropical: 6,
cold: 2, short: 8, long: 7, solo: 8, romantic: 8, family: 7
},
highlights: ['Beautiful beaches', 'Gaudí architecture', 'Legendary nightlife', 'Tapas heaven'],
bestTime: 'May - Jun, Sep - Oct',
avgFlightPrice: 'From $399',
tripAdvisorSlug: 'Barcelona'
},
{
id: 'cancun',
name: 'Cancún',
country: 'Mexico',
emoji: '🌊',
tagline: 'Caribbean paradise with Mayan history',
image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800',
scores: {
beach: 10, culture: 6, adventure: 7, nightlife: 10,
food: 8, budget: 6, luxury: 9, tropical: 10,
cold: 0, short: 8, long: 6, solo: 6, romantic: 9, family: 8
},
highlights: ['Crystal clear water', 'Mayan ruins nearby', 'All-inclusive resorts', 'Great nightlife'],
bestTime: 'Dec - Apr',
avgFlightPrice: 'From $299',
tripAdvisorSlug: 'Cancun'
},
{
id: 'dubai',
name: 'Dubai',
country: 'UAE',
emoji: '🏙️',
tagline: 'Futuristic luxury in the desert',
image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
scores: {
beach: 7, culture: 5, adventure: 6, nightlife: 8,
food: 8, budget: 2, luxury: 10, tropical: 8,
cold: 0, short: 7, long: 5, solo: 6, romantic: 8, family: 9
},
highlights: ['Incredible architecture', 'Luxury shopping', 'Desert adventures', 'World-class dining'],
bestTime: 'Nov - Mar',
avgFlightPrice: 'From $549',
tripAdvisorSlug: 'Dubai'
},
{
id: 'rome',
name: 'Rome',
country: 'Italy',
emoji: '🏛️',
tagline: 'The Eternal City',
image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
scores: {
beach: 2, culture: 10, adventure: 4, nightlife: 7,
food: 10, budget: 5, luxury: 8, tropical: 4,
cold: 4, short: 8, long: 8, solo: 8, romantic: 10, family: 8
},
highlights: ['Ancient history', 'World-best pasta & pizza', 'Art everywhere', 'Romantic streets'],
bestTime: 'Apr - Jun, Sep - Oct',
avgFlightPrice: 'From $449',
tripAdvisorSlug: 'Rome'
},
{
id: 'thailand',
name: 'Phuket',
country: 'Thailand',
emoji: '🌺',
tagline: 'Tropical beaches and vibrant culture',
image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
scores: {
beach: 10, culture: 7, adventure: 8, nightlife: 9,
food: 9, budget: 9, luxury: 8, tropical: 10,
cold: 0, short: 6, long: 9, solo: 9, romantic: 8, family: 7
},
highlights: ['Stunning beaches', 'Incredible street food', 'Budget-friendly', 'Island hopping'],
bestTime: 'Nov - Mar',
avgFlightPrice: 'From $649',
tripAdvisorSlug: 'Phuket'
},
{
id: 'santorini',
name: 'Santorini',
country: 'Greece',
emoji: '🇬🇷',
tagline: 'Iconic sunsets and white-washed villages',
image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
scores: {
beach: 7, culture: 7, adventure: 4, nightlife: 5,
food: 8, budget: 3, luxury: 10, tropical: 6,
cold: 2, short: 8, long: 5, solo: 6, romantic: 10, family: 5
},
highlights: ['Instagram-perfect views', 'Legendary sunsets', 'Wine tasting', 'Honeymoon favorite'],
bestTime: 'Apr - Oct',
avgFlightPrice: 'From $599',
tripAdvisorSlug: 'Santorini'
},
{
id: 'london',
name: 'London',
country: 'United Kingdom',
emoji: '🇬🇧',
tagline: 'Royal history meets modern edge',
image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
scores: {
beach: 0, culture: 10, adventure: 4, nightlife: 9,
food: 7, budget: 2, luxury: 9, tropical: 0,
cold: 8, short: 8, long: 9, solo: 9, romantic: 7, family: 8
},
highlights: ['World-class museums (free!)', 'Historic landmarks', 'Theater & shows', 'Diverse food scene'],
bestTime: 'May - Sep',
avgFlightPrice: 'From $399',
tripAdvisorSlug: 'London'
},
{
id: 'costarica',
name: 'Costa Rica',
country: 'Costa Rica',
emoji: '🦜',
tagline: 'Pure life and wild adventures',
image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=800',
scores: {
beach: 8, culture: 5, adventure: 10, nightlife: 4,
food: 6, budget: 5, luxury: 7, tropical: 10,
cold: 0, short: 5, long: 9, solo: 8, romantic: 8, family: 9
},
highlights: ['Incredible wildlife', 'Zip-lining & rafting', 'Rainforest adventures', 'Eco-friendly'],
bestTime: 'Dec - Apr',
avgFlightPrice: 'From $349',
tripAdvisorSlug: 'Costa_Rica'
},
{
id: 'amsterdam',
name: 'Amsterdam',
country: 'Netherlands',
emoji: '🚲',
tagline: 'Canals, culture, and coffee shops',
image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
scores: {
beach: 0, culture: 9, adventure: 4, nightlife: 9,
food: 7, budget: 4, luxury: 7, tropical: 0,
cold: 7, short: 9, long: 6, solo: 9, romantic: 8, family: 6
},
highlights: ['Beautiful canals', 'World-class museums', 'Bike-friendly', 'Vibrant nightlife'],
bestTime: 'Apr - May, Sep - Nov',
avgFlightPrice: 'From $449',
tripAdvisorSlug: 'Amsterdam'
},
{
id: 'maldives',
name: 'Maldives',
country: 'Maldives',
emoji: '🏝️',
tagline: 'Overwater paradise',
image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
scores: {
beach: 10, culture: 2, adventure: 5, nightlife: 2,
food: 7, budget: 1, luxury: 10, tropical: 10,
cold: 0, short: 6, long: 7, solo: 3, romantic: 10, family: 5
},
highlights: ['Overwater bungalows', 'Crystal clear water', 'World-class diving', 'Ultimate relaxation'],
bestTime: 'Nov - Apr',
avgFlightPrice: 'From $899',
tripAdvisorSlug: 'Maldives'
},
{
id: 'newyork',
name: 'New York City',
country: 'USA',
emoji: '🗽',
tagline: 'The city that never sleeps',
image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
scores: {
beach: 2, culture: 10, adventure: 5, nightlife: 10,
food: 10, budget: 2, luxury: 10, tropical: 0,
cold: 6, short: 8, long: 8, solo: 9, romantic: 7, family: 7
},
highlights: ['Iconic landmarks', 'Broadway shows', 'Amazing food diversity', 'World-class shopping'],
bestTime: 'Apr - Jun, Sep - Nov',
avgFlightPrice: 'From $199',
tripAdvisorSlug: 'New_York_City'
},
{
id: 'lisbon',
name: 'Lisbon',
country: 'Portugal',
emoji: '🇵🇹',
tagline: 'Europe's sunniest capital',
image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
scores: {
beach: 6, culture: 8, adventure: 5, nightlife: 8,
food: 9, budget: 7, luxury: 6, tropical: 5,
cold: 3, short: 8, long: 7, solo: 9, romantic: 8, family: 7
},
highlights: ['Affordable Europe', 'Amazing pastries', 'Great weather', 'Historic trams'],
bestTime: 'Mar - Oct',
avgFlightPrice: 'From $399',
tripAdvisorSlug: 'Lisbon'
},
{
id: 'vietnam',
name: 'Vietnam',
country: 'Vietnam',
emoji: '🇻🇳',
tagline: 'From bustling cities to serene bays',
image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
scores: {
beach: 7, culture: 9, adventure: 9, nightlife: 6,
food: 10, budget: 10, luxury: 5, tropical: 8,
cold: 2, short: 4, long: 10, solo: 10, romantic: 7, family: 6
},
highlights: ['Incredible street food', 'Super affordable', 'Halong Bay', 'Rich history'],
bestTime: 'Feb - Apr, Aug - Oct',
avgFlightPrice: 'From $699',
tripAdvisorSlug: 'Vietnam'
},
{
id: 'iceland',
name: 'Iceland',
country: 'Iceland',
emoji: '🧊',
tagline: 'Land of fire and ice',
image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
scores: {
beach: 2, culture: 6, adventure: 10, nightlife: 4,
food: 5, budget: 1, luxury: 7, tropical: 0,
cold: 10, short: 6, long: 7, solo: 8, romantic: 9, family: 6
},
highlights: ['Northern Lights', 'Dramatic landscapes', 'Hot springs', 'Whale watching'],
bestTime: 'Jun - Aug (summer), Sep - Mar (northern lights)',
avgFlightPrice: 'From $399',
tripAdvisorSlug: 'Iceland'
},
{
id: 'morocco',
name: 'Morocco',
country: 'Morocco',
emoji: '🇲🇦',
tagline: 'Magical souks and Sahara sunsets',
image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800',
scores: {
beach: 5, culture: 10, adventure: 8, nightlife: 4,
food: 9, budget: 8, luxury: 7, tropical: 6,
cold: 3, short: 5, long: 8, solo: 6, romantic: 8, family: 6
},
highlights: ['Vibrant markets', 'Sahara desert trips', 'Affordable luxury riads', 'Unique culture'],
bestTime: 'Mar - May, Sep - Nov',
avgFlightPrice: 'From $499',
tripAdvisorSlug: 'Morocco'
},
{
id: 'sydney',
name: 'Sydney',
country: 'Australia',
emoji: '🇦🇺',
tagline: 'Harbour views and beach vibes',
image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
scores: {
beach: 9, culture: 7, adventure: 7, nightlife: 8,
food: 8, budget: 3, luxury: 8, tropical: 7,
cold: 2, short: 5, long: 9, solo: 8, romantic: 7, family: 8
},
highlights: ['Iconic Opera House', 'Beautiful beaches', 'Great weather', 'Friendly locals'],
bestTime: 'Sep - Nov, Mar - May',
avgFlightPrice: 'From $899',
tripAdvisorSlug: 'Sydney'
},
{
id: 'swiss',
name: 'Switzerland',
country: 'Switzerland',
emoji: '🇨🇭',
tagline: 'Alpine perfection',
image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
scores: {
beach: 0, culture: 7, adventure: 9, nightlife: 4,
food: 7, budget: 1, luxury: 10, tropical: 0,
cold: 9, short: 6, long: 8, solo: 7, romantic: 10, family: 8
},
highlights: ['Stunning Alps', 'Scenic trains', 'Chocolate & cheese', 'Pristine nature'],
bestTime: 'Jun - Sep (hiking), Dec - Mar (skiing)',
avgFlightPrice: 'From $499',
tripAdvisorSlug: 'Switzerland'
}
];

## Affiliate Links Configuration
```typescript// src/data/affiliateLinks.tsexport const affiliateLinks = {
// TripAdvisor - Main CPA partner
// REPLACE THESE WITH YOUR ACTUAL CJ AFFILIATE LINKS
tripAdvisor: {
// Base URL - append destination slug
flights: 'https://www.tripadvisor.com/CheapFlightsHome?geo=', // + destination ID
hotels: 'https://www.tripadvisor.com/Hotels-g', // + destination ID// For now, use these placeholder tracking URLs
// You'll replace with your actual CJ deep links
getFlightLink: (destination: string) => 
  `https://clickorskip.online/go/flights/${destination}`,
getHotelLink: (destination: string) => 
  `https://clickorskip.online/go/hotels/${destination}`,
},// NordVPN - Upsell partner
// REPLACE WITH YOUR ACTUAL CJ AFFILIATE LINK
nordvpn: {
main: 'https://clickorskip.online/go/nordvpn',
promoText: '67% OFF + 3 Months FREE',
}
};// Destination to TripAdvisor geo IDs (for deep linking)
export const tripAdvisorGeoIds: Record<string, string> = {
'bali': '294226',
'paris': '187147',
'tokyo': '298184',
'barcelona': '187497',
'cancun': '150807',
'dubai': '295424',
'rome': '187791',
'thailand': '293919', // Phuket
'santorini': '189433',
'london': '186338',
'costarica': '291982',
'amsterdam': '188590',
'maldives': '293953',
'newyork': '60763',
'lisbon': '189158',
'vietnam': '293921',
'iceland': '189970',
'morocco': '293730',
'sydney': '255060',
'swiss': '188045',
};

## Matching Algorithm
```typescript// src/lib/matching.tsinterface UserScores {
[key: string]: number;
}interface DestinationMatch {
destination: Destination;
matchPercent: number;
matchedTraits: string[];
}export function calculateMatches(
userScores: UserScores,
destinations: Destination[]
): DestinationMatch[] {return destinations.map(dest => {
let totalScore = 0;
let maxPossible = 0;
const matchedTraits: string[] = [];// Calculate match for each score category
Object.entries(userScores).forEach(([key, userValue]) => {
  const destValue = dest.scores[key as keyof typeof dest.scores];
  if (destValue !== undefined && userValue > 0) {
    // Weight by user's preference strength
    const weight = userValue / 10;
    const matchScore = (destValue / 10) * weight;
    totalScore += matchScore;
    maxPossible += weight;    // Track what matched well
    if (destValue >= 7 && userValue >= 7) {
      matchedTraits.push(key);
    }
  }
});const matchPercent = maxPossible > 0 
  ? Math.round((totalScore / maxPossible) * 100) 
  : 50;return {
  destination: dest,
  matchPercent: Math.min(99, Math.max(60, matchPercent)), // Keep between 60-99%
  matchedTraits
};
})
.sort((a, b) => b.matchPercent - a.matchPercent);
}

## Animations
```typescript// Framer Motion variants// Page transitions
export const pageVariants = {
initial: { opacity: 0, y: 20 },
animate: { opacity: 1, y: 0 },
exit: { opacity: 0, y: -20 }
};// Chat bubble entrance
export const bubbleVariants = {
initial: { opacity: 0, y: 10, scale: 0.95 },
animate: {
opacity: 1,
y: 0,
scale: 1,
transition: { duration: 0.3, ease: 'easeOut' }
}
};// Option buttons stagger
export const optionsContainerVariants = {
animate: {
transition: { staggerChildren: 0.1 }
}
};export const optionVariants = {
initial: { opacity: 0, x: -20 },
animate: { opacity: 1, x: 0 }
};// Typing indicator dots
export const typingDotVariants = {
animate: {
y: [0, -5, 0],
transition: {
duration: 0.6,
repeat: Infinity,
ease: 'easeInOut'
}
}
};// Result card entrance
export const resultCardVariants = {
initial: { opacity: 0, scale: 0.9, y: 30 },
animate: {
opacity: 1,
scale: 1,
y: 0,
transition: {
duration: 0.5,
ease: [0.16, 1, 0.3, 1]
}
}
};// Match percentage counter
export const counterVariants = {
initial: { scale: 0 },
animate: {
scale: 1,
transition: {
type: 'spring',
stiffness: 200,
damping: 15,
delay: 0.3
}
}
};

## SEO & Meta Tags
```typescript// src/app/layout.tsxexport const metadata: Metadata = {
title: 'ClickOrSkip - Find Your Perfect Travel Destination in 60 Seconds',
description: 'Our AI travel buddy asks a few quick questions and matches you with your dream destination. Free, fun, and takes less than a minute!',
keywords: 'travel quiz, destination finder, where should I travel, vacation planner, trip ideas, travel recommendations',
authors: [{ name: 'ClickOrSkip' }],
openGraph: {
title: 'ClickOrSkip - Find Your Perfect Escape',
description: 'Discover your dream destination in 60 seconds with our AI travel buddy!',
url: 'https://clickorskip.online',
siteName: 'ClickOrSkip',
images: [
{
url: 'https://clickorskip.online/og-image.jpg',
width: 1200,
height: 630,
alt: 'ClickOrSkip - Find Your Perfect Destination',
},
],
locale: 'en_US',
type: 'website',
},
twitter: {
card: 'summary_large_image',
title: 'ClickOrSkip - Find Your Perfect Escape',
description: 'Discover your dream destination in 60 seconds!',
images: ['https://clickorskip.online/og-image.jpg'],
},
robots: {
index: true,
follow: true,
},
};

## Mobile Responsiveness Requirements
```css/* All components must be mobile-first *//* Chat container /
.chat-container {
/ Mobile /
height: 100dvh;          / Full viewport including mobile browsers */
padding: 1rem;/* Desktop */
@media (min-width: 768px) {
max-width: 600px;
margin: 0 auto;
padding: 2rem;
}
}/* Option buttons /
.option-btn {
/ Mobile - full width, stacked */
width: 100%;
padding: 1rem 1.25rem;
font-size: 1rem;/* Desktop - can be slightly smaller */
@media (min-width: 768px) {
padding: 1rem 1.5rem;
}
}/* Touch targets /
/ All clickable elements must be at least 44x44px on mobile *//* Result card /
.result-card {
/ Mobile */
margin: 1rem;
padding: 1.5rem;/* Desktop */
@media (min-width: 768px) {
max-width: 500px;
margin: 2rem auto;
padding: 2rem;
}
}

## Commands
```bashnpm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

## Deployment to Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Create new project → Connect to GitHub
4. Select repository
5. Build settings:
   - Framework preset: Next.js
   - Build command: npx @cloudflare/next-on-pages@1
   - Build output: .vercel/output/static
6. Add custom domain: clickorskip.online
7. Deploy!

## Critical Requirements Checklist

- [ ] Landing page loads fast (<2s)
- [ ] Chat works smoothly on mobile (touch scrolling)
- [ ] All 6 questions flow correctly
- [ ] Matching algorithm returns sensible results
- [ ] Result page shows destination with image
- [ ] TripAdvisor CTA buttons are prominent
- [ ] VPN upsell appears below main result
- [ ] Share buttons work
- [ ] "Try Again" resets and restarts chat
- [ ] No console errors
- [ ] Looks good on iPhone SE (smallest)
- [ ] Looks good on desktop (1920px)