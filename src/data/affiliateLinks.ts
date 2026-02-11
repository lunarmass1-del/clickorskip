// ============================================
// TRAVELPAYOUTS AFFILIATE CONFIGURATION
// ============================================
// Update YOUR_MARKER_ID with your Travelpayouts partner ID
// Find it in your Travelpayouts dashboard
// ============================================

const TRAVELPAYOUTS_MARKER = '497369'; // Your Travelpayouts partner marker

// IATA codes for flight searches
export const destinationIATACodes: Record<string, string> = {
  bali: 'DPS',      // Ngurah Rai International
  paris: 'CDG',     // Charles de Gaulle
  tokyo: 'NRT',     // Narita
  barcelona: 'BCN', // El Prat
  cancun: 'CUN',    // Cancun International
  dubai: 'DXB',     // Dubai International
  rome: 'FCO',      // Fiumicino
  phuket: 'HKT',    // Phuket International
  santorini: 'JTR', // Santorini
  london: 'LHR',    // Heathrow
  costarica: 'SJO', // Juan Santamaria
  amsterdam: 'AMS', // Schiphol
  maldives: 'MLE',  // Velana International
  newyork: 'JFK',   // JFK
  lisbon: 'LIS',    // Lisbon
  vietnam: 'HAN',   // Hanoi
  iceland: 'KEF',   // Keflavik
  morocco: 'RAK',   // Marrakech
  sydney: 'SYD',    // Sydney
  switzerland: 'ZRH', // Zurich
};

// City names for hotel searches
export const destinationCityNames: Record<string, string> = {
  bali: 'Bali',
  paris: 'Paris',
  tokyo: 'Tokyo',
  barcelona: 'Barcelona',
  cancun: 'Cancun',
  dubai: 'Dubai',
  rome: 'Rome',
  phuket: 'Phuket',
  santorini: 'Santorini',
  london: 'London',
  costarica: 'San Jose, Costa Rica',
  amsterdam: 'Amsterdam',
  maldives: 'Maldives',
  newyork: 'New York',
  lisbon: 'Lisbon',
  vietnam: 'Hanoi',
  iceland: 'Reykjavik',
  morocco: 'Marrakech',
  sydney: 'Sydney',
  switzerland: 'Zurich',
};

// Booking.com city IDs for deep links
export const bookingCityIds: Record<string, string> = {
  bali: '-2701757',
  paris: '-1456928',
  tokyo: '-246227',
  barcelona: '-372490',
  cancun: '-1658079',
  dubai: '-782831',
  rome: '-126693',
  phuket: '-3233975',
  santorini: '-830523',
  london: '-2601889',
  costarica: '-1131657',
  amsterdam: '-2140479',
  maldives: '-6122316',
  newyork: '20088325',
  lisbon: '-2167973',
  vietnam: '-3714993',
  iceland: '-2638996',
  morocco: '-38833',
  sydney: '-1603135',
  switzerland: '-2553279',
};

// ============================================
// AFFILIATE LINK GENERATORS
// ============================================

// Format future dates for searches
const getSearchDates = () => {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 30); // 30 days from now
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 7); // 7 night stay

  return {
    checkIn: checkIn.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
  };
};

export const affiliateLinks = {
  // ============================================
  // FLIGHTS - Using WayAway (highest commission)
  // Commission: Up to 50% revenue share
  // ============================================
  flights: {
    getLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      // WayAway deep link
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=4114&u=https%3A%2F%2Fwayaway.io%2Fflights%2FNYC${iata}${dates.checkIn.replace(/-/g, '')}1`;
    },
    // Alternative: Aviasales (great for international)
    getAviasalesLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=4098&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FNYC${dates.checkIn.replace(/-/g, '')}${iata}1`;
    },
    // Kiwi.com (good for budget travelers)
    getKiwiLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=7484&u=https%3A%2F%2Fwww.kiwi.com%2Fdeep%3Ffrom%3DNYC%26to%3D${iata}%26departure%3D${dates.checkIn}`;
    },
  },

  // ============================================
  // HOTELS - Using Booking.com (most trusted)
  // Commission: Up to 4-6% per booking
  // ============================================
  hotels: {
    getLink: (destinationId: string, subId?: string) => {
      const cityId = bookingCityIds[destinationId] || '-2601889';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_hotels&trs=267028&p=4101&u=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Fdest_id%3D${cityId}%26dest_type%3Dcity%26checkin%3D${dates.checkIn}%26checkout%3D${dates.checkOut}`;
    },
    // Agoda (great for Asia)
    getAgodaLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_agoda&trs=267028&p=5765&u=https%3A%2F%2Fwww.agoda.com%2Fsearch%3Fcity%3D${encodeURIComponent(city)}`;
    },
    // Hostelworld (for budget/backpackers)
    getHostelworldLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_hostel&trs=267028&p=5842&u=https%3A%2F%2Fwww.hostelworld.com%2Ffindabed.php%2FChosenCity.${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // TOURS & ACTIVITIES - GetYourGuide
  // Commission: Up to 8% per booking
  // ============================================
  tours: {
    getLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_tours&trs=267028&p=5772&u=https%3A%2F%2Fwww.getyourguide.com%2Fs%2F%3Fq%3D${encodeURIComponent(city)}`;
    },
    // Viator alternative
    getViatorLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_viator&trs=267028&p=9283&u=https%3A%2F%2Fwww.viator.com%2Fsearch%2F${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // CAR RENTALS - Rentalcars
  // Commission: Up to 6% per booking
  // ============================================
  cars: {
    getLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'LHR';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_cars&trs=267028&p=4104&u=https%3A%2F%2Fwww.rentalcars.com%2FSearchResults.do%3FpuDay%3D15%26puMonth%3D1%26puYear%3D2025%26doDay%3D22%26doMonth%3D1%26doYear%3D2025%26searchString%3D${iata}`;
    },
    // DiscoverCars alternative
    getDiscoverCarsLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_discover&trs=267028&p=8598&u=https%3A%2F%2Fwww.discovercars.com%2F%3Flocation%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // TRAVEL INSURANCE - SafetyWing
  // Commission: Up to $10-20 per signup
  // ============================================
  insurance: {
    getLink: (subId?: string) => {
      const sub = subId || 'insurance';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=8721&u=https%3A%2F%2Fsafetywing.com%2Fnomad-insurance%2F`;
    },
  },

  // ============================================
  // AIRPORT TRANSFERS - Kiwitaxi
  // Commission: Up to 50% revenue share
  // ============================================
  transfers: {
    getLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_transfer&trs=267028&p=1673&u=https%3A%2F%2Fkiwitaxi.com%2F%3Fto%3D${encodeURIComponent(city)}`;
    },
  },
};

// ============================================
// HELPER: Get all links for a destination
// ============================================
export const getAllLinksForDestination = (destinationId: string) => {
  return {
    flights: affiliateLinks.flights.getLink(destinationId),
    flightsAlt: affiliateLinks.flights.getKiwiLink(destinationId),
    hotels: affiliateLinks.hotels.getLink(destinationId),
    hotelsAlt: affiliateLinks.hotels.getAgodaLink(destinationId),
    tours: affiliateLinks.tours.getLink(destinationId),
    cars: affiliateLinks.cars.getLink(destinationId),
    insurance: affiliateLinks.insurance.getLink(destinationId),
    transfers: affiliateLinks.transfers.getLink(destinationId),
  };
};

// ============================================
// CTA BUTTONS CONFIG
// Primary actions shown on result page
// ============================================
export const ctaConfig = [
  {
    id: 'flights',
    label: 'Find Cheap Flights',
    emoji: '✈️',
    description: 'Compare prices from 100+ airlines',
    color: 'from-blue-500 to-cyan-500',
    getLink: (destId: string) => affiliateLinks.flights.getLink(destId),
  },
  {
    id: 'hotels',
    label: 'Book Hotels',
    emoji: '🏨',
    description: 'Best prices guaranteed',
    color: 'from-purple-500 to-pink-500',
    getLink: (destId: string) => affiliateLinks.hotels.getLink(destId),
  },
  {
    id: 'tours',
    label: 'Explore Tours & Activities',
    emoji: '🎯',
    description: 'Skip-the-line tickets & experiences',
    color: 'from-orange-500 to-red-500',
    getLink: (destId: string) => affiliateLinks.tours.getLink(destId),
  },
  {
    id: 'cars',
    label: 'Rent a Car',
    emoji: '🚗',
    description: 'Free cancellation on most bookings',
    color: 'from-green-500 to-emerald-500',
    getLink: (destId: string) => affiliateLinks.cars.getLink(destId),
  },
];

// Secondary actions
export const secondaryCtaConfig = [
  {
    id: 'insurance',
    label: 'Travel Insurance',
    emoji: '🛡️',
    getLink: () => affiliateLinks.insurance.getLink(),
  },
  {
    id: 'transfers',
    label: 'Airport Transfers',
    emoji: '🚐',
    getLink: (destId: string) => affiliateLinks.transfers.getLink(destId),
  },
];
