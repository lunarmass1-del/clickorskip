// ============================================
// TRAVELPAYOUTS AFFILIATE CONFIGURATION
// ============================================
// Marker ID: 497369
// Maximize every CPA opportunity!
// ============================================

const TRAVELPAYOUTS_MARKER = '497369';

// IATA codes for flight searches
export const destinationIATACodes: Record<string, string> = {
  bali: 'DPS',
  paris: 'CDG',
  tokyo: 'NRT',
  barcelona: 'BCN',
  cancun: 'CUN',
  dubai: 'DXB',
  rome: 'FCO',
  phuket: 'HKT',
  santorini: 'JTR',
  london: 'LHR',
  costarica: 'SJO',
  amsterdam: 'AMS',
  maldives: 'MLE',
  newyork: 'JFK',
  lisbon: 'LIS',
  vietnam: 'HAN',
  iceland: 'KEF',
  morocco: 'RAK',
  sydney: 'SYD',
  switzerland: 'ZRH',
};

// City names for searches
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

// Booking.com city IDs
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

// Format dates for searches (30 days out, 7 night stay)
const getSearchDates = () => {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 30);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 7);
  return {
    checkIn: checkIn.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
  };
};

// ============================================
// ALL AFFILIATE LINK GENERATORS
// ============================================

export const affiliateLinks = {
  // ============================================
  // FLIGHTS - Multiple providers for comparison
  // ============================================
  flights: {
    // WayAway - Up to 50% revenue share (PRIMARY)
    getLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=4114&u=https%3A%2F%2Fwayaway.io%2Fflights%2FNYC${iata}${dates.checkIn.replace(/-/g, '')}1`;
    },
    // Aviasales - Great for international
    getAviasalesLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_avi&trs=267028&p=4098&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FNYC${dates.checkIn.replace(/-/g, '')}${iata}1`;
    },
    // Kiwi - Budget travelers
    getKiwiLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_kiwi&trs=267028&p=7484&u=https%3A%2F%2Fwww.kiwi.com%2Fdeep%3Ffrom%3DNYC%26to%3D${iata}%26departure%3D${dates.checkIn}`;
    },
    // Trip.com flights
    getTripComLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'NYC';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_trip&trs=267028&p=8289&u=https%3A%2F%2Fwww.trip.com%2Fflights%2F%3Fdcity%3DNYC%26acity%3D${iata}`;
    },
  },

  // ============================================
  // HOTELS - Multiple providers
  // ============================================
  hotels: {
    // Booking.com - Most trusted (PRIMARY)
    getLink: (destinationId: string, subId?: string) => {
      const cityId = bookingCityIds[destinationId] || '-2601889';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_htl&trs=267028&p=4101&u=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Fdest_id%3D${cityId}%26dest_type%3Dcity%26checkin%3D${dates.checkIn}%26checkout%3D${dates.checkOut}`;
    },
    // Agoda - Great for Asia
    getAgodaLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_agoda&trs=267028&p=5765&u=https%3A%2F%2Fwww.agoda.com%2Fsearch%3Fcity%3D${encodeURIComponent(city)}`;
    },
    // Hostelworld - Backpackers
    getHostelworldLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_hostel&trs=267028&p=5842&u=https%3A%2F%2Fwww.hostelworld.com%2Ffindabed.php%2FChosenCity.${encodeURIComponent(city)}`;
    },
    // Trip.com hotels
    getTripComHotelsLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_triphtl&trs=267028&p=8289&u=https%3A%2F%2Fwww.trip.com%2Fhotels%2Flist%3Fcity%3D${encodeURIComponent(city)}`;
    },
    // Vrbo/HomeAway - Vacation rentals
    getVrboLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_vrbo&trs=267028&p=9474&u=https%3A%2F%2Fwww.vrbo.com%2Fsearch%3Fdestination%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // TOURS & ACTIVITIES
  // ============================================
  tours: {
    // GetYourGuide (PRIMARY)
    getLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_tours&trs=267028&p=5772&u=https%3A%2F%2Fwww.getyourguide.com%2Fs%2F%3Fq%3D${encodeURIComponent(city)}`;
    },
    // Viator
    getViatorLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_viator&trs=267028&p=9283&u=https%3A%2F%2Fwww.viator.com%2Fsearch%2F${encodeURIComponent(city)}`;
    },
    // Tiqets - Skip-the-line tickets
    getTiqetsLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_tiqets&trs=267028&p=6858&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fsearch%3Fq%3D${encodeURIComponent(city)}`;
    },
    // Musement
    getMusementLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_musement&trs=267028&p=8397&u=https%3A%2F%2Fwww.musement.com%2Fuk%2Fsearch%2F%3Fq%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // CAR RENTALS
  // ============================================
  cars: {
    // Rentalcars (PRIMARY)
    getLink: (destinationId: string, subId?: string) => {
      const iata = destinationIATACodes[destinationId] || 'LHR';
      const dates = getSearchDates();
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_cars&trs=267028&p=4104&u=https%3A%2F%2Fwww.rentalcars.com%2FSearchResults.do%3FpuDay%3D15%26searchString%3D${iata}`;
    },
    // DiscoverCars
    getDiscoverCarsLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_discover&trs=267028&p=8598&u=https%3A%2F%2Fwww.discovercars.com%2F%3Flocation%3D${encodeURIComponent(city)}`;
    },
    // EconomyBookings
    getEconomyLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_economy&trs=267028&p=5081&u=https%3A%2F%2Fwww.economybookings.com%2F%3Flocation%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // TRAVEL INSURANCE - High commission!
  // ============================================
  insurance: {
    // SafetyWing - $10-20 per signup (PRIMARY)
    getLink: (subId?: string) => {
      const sub = subId || 'insurance';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=8721&u=https%3A%2F%2Fsafetywing.com%2Fnomad-insurance%2F`;
    },
    // Insubuy
    getInsubuyLink: (subId?: string) => {
      const sub = subId || 'insubuy';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=6619&u=https%3A%2F%2Fwww.insubuy.com%2F`;
    },
    // World Nomads
    getWorldNomadsLink: (subId?: string) => {
      const sub = subId || 'nomads';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=4116&u=https%3A%2F%2Fwww.worldnomads.com%2F`;
    },
  },

  // ============================================
  // AIRPORT TRANSFERS - Up to 50% rev share!
  // ============================================
  transfers: {
    // Kiwitaxi (PRIMARY)
    getLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_transfer&trs=267028&p=1673&u=https%3A%2F%2Fkiwitaxi.com%2F%3Fto%3D${encodeURIComponent(city)}`;
    },
    // GetTransfer
    getGetTransferLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_gettransfer&trs=267028&p=7385&u=https%3A%2F%2Fgettransfer.com%2Fen%2Fsearch%3Fto%3D${encodeURIComponent(city)}`;
    },
    // Intui Travel
    getIntuiLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_intui&trs=267028&p=4103&u=https%3A%2F%2Fwww.intui.travel%2F%3Fto%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // TRAINS & BUSES (Europe/Asia)
  // ============================================
  trains: {
    // Omio - Trains & buses
    getOmioLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'London';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_omio&trs=267028&p=6181&u=https%3A%2F%2Fwww.omio.com%2Fsearch%3Fto%3D${encodeURIComponent(city)}`;
    },
    // 12Go - Asia transport
    get12GoLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'Bangkok';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_12go&trs=267028&p=5857&u=https%3A%2F%2F12go.asia%2Fen%2Ftravel%2F${encodeURIComponent(city.toLowerCase())}`;
    },
    // BlaBlaCar
    getBlaBlaCarLink: (destinationId: string, subId?: string) => {
      const city = destinationCityNames[destinationId] || 'Paris';
      const sub = subId || destinationId;
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_blabla&trs=267028&p=6617&u=https%3A%2F%2Fwww.blablacar.com%2Fsearch%3Ffc%3D${encodeURIComponent(city)}`;
    },
  },

  // ============================================
  // eSIM & MOBILE DATA - High demand!
  // ============================================
  esim: {
    // Airalo - Most popular eSIM
    getAiraloLink: (destinationId: string, subId?: string) => {
      const sub = subId || destinationId;
      // Airalo doesn't have Travelpayouts - using direct affiliate
      return `https://www.airalo.com/`;
    },
    // Drimsim
    getDrimsimLink: (subId?: string) => {
      const sub = subId || 'esim';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}_drimsim&trs=267028&p=7183&u=https%3A%2F%2Fdrimsim.com%2F`;
    },
  },

  // ============================================
  // CRUISES
  // ============================================
  cruises: {
    getCruiseDirectLink: (subId?: string) => {
      const sub = subId || 'cruise';
      return `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}.${sub}&trs=267028&p=7689&u=https%3A%2F%2Fwww.cruisedirect.com%2F`;
    },
  },
};

// ============================================
// CTA BUTTONS CONFIG - Primary actions
// ============================================
export const ctaConfig = [
  {
    id: 'flights',
    label: 'Find Cheap Flights',
    emoji: '✈️',
    icon: 'Plane',
    description: 'Compare 100+ airlines',
    color: 'from-blue-500 to-cyan-500',
    commission: 'Up to 50% rev share',
    getLink: (destId: string) => affiliateLinks.flights.getLink(destId),
  },
  {
    id: 'hotels',
    label: 'Book Hotels',
    emoji: '🏨',
    icon: 'Hotel',
    description: 'Best price guarantee',
    color: 'from-purple-500 to-pink-500',
    commission: '4-6% per booking',
    getLink: (destId: string) => affiliateLinks.hotels.getLink(destId),
  },
  {
    id: 'tours',
    label: 'Tours & Activities',
    emoji: '🎯',
    icon: 'Ticket',
    description: 'Skip-the-line tickets',
    color: 'from-orange-500 to-red-500',
    commission: 'Up to 8%',
    getLink: (destId: string) => affiliateLinks.tours.getLink(destId),
  },
  {
    id: 'cars',
    label: 'Rent a Car',
    emoji: '🚗',
    icon: 'Car',
    description: 'Free cancellation',
    color: 'from-green-500 to-emerald-500',
    commission: 'Up to 6%',
    getLink: (destId: string) => affiliateLinks.cars.getLink(destId),
  },
];

// Secondary CTAs - All additional services
export const secondaryCtaConfig = [
  {
    id: 'insurance',
    label: 'Travel Insurance',
    emoji: '🛡️',
    urgency: 'Protect your trip',
    getLink: () => affiliateLinks.insurance.getLink(),
  },
  {
    id: 'transfers',
    label: 'Airport Transfer',
    emoji: '🚐',
    urgency: 'Book ahead & save',
    getLink: (destId: string) => affiliateLinks.transfers.getLink(destId),
  },
  {
    id: 'trains',
    label: 'Trains & Buses',
    emoji: '🚂',
    urgency: 'Easy transport',
    getLink: (destId: string) => affiliateLinks.trains.getOmioLink(destId),
  },
  {
    id: 'esim',
    label: 'eSIM Data',
    emoji: '📱',
    urgency: 'Stay connected',
    getLink: () => affiliateLinks.esim.getDrimsimLink(),
  },
];

// Complete trip section - ALL services
export const completeYourTripConfig = [
  {
    category: 'Getting There',
    items: [
      { id: 'flights', label: 'Flights', emoji: '✈️', getLink: (d: string) => affiliateLinks.flights.getLink(d) },
      { id: 'flights-alt', label: 'Compare on Kiwi', emoji: '🔍', getLink: (d: string) => affiliateLinks.flights.getKiwiLink(d) },
      { id: 'trains', label: 'Trains & Buses', emoji: '🚂', getLink: (d: string) => affiliateLinks.trains.getOmioLink(d) },
    ],
  },
  {
    category: 'Where to Stay',
    items: [
      { id: 'hotels', label: 'Hotels', emoji: '🏨', getLink: (d: string) => affiliateLinks.hotels.getLink(d) },
      { id: 'hostels', label: 'Hostels', emoji: '🛏️', getLink: (d: string) => affiliateLinks.hotels.getHostelworldLink(d) },
      { id: 'vacation-rentals', label: 'Vacation Rentals', emoji: '🏡', getLink: (d: string) => affiliateLinks.hotels.getVrboLink(d) },
    ],
  },
  {
    category: 'Things to Do',
    items: [
      { id: 'tours', label: 'Tours', emoji: '🎯', getLink: (d: string) => affiliateLinks.tours.getLink(d) },
      { id: 'tickets', label: 'Skip-Line Tickets', emoji: '🎟️', getLink: (d: string) => affiliateLinks.tours.getTiqetsLink(d) },
      { id: 'experiences', label: 'Experiences', emoji: '⭐', getLink: (d: string) => affiliateLinks.tours.getViatorLink(d) },
    ],
  },
  {
    category: 'Getting Around',
    items: [
      { id: 'cars', label: 'Rent a Car', emoji: '🚗', getLink: (d: string) => affiliateLinks.cars.getLink(d) },
      { id: 'transfers', label: 'Airport Transfer', emoji: '🚐', getLink: (d: string) => affiliateLinks.transfers.getLink(d) },
      { id: 'local-transport', label: 'Local Transport', emoji: '🚌', getLink: (d: string) => affiliateLinks.trains.get12GoLink(d) },
    ],
  },
  {
    category: 'Travel Essentials',
    items: [
      { id: 'insurance', label: 'Travel Insurance', emoji: '🛡️', getLink: () => affiliateLinks.insurance.getLink() },
      { id: 'esim', label: 'eSIM / Data', emoji: '📱', getLink: () => affiliateLinks.esim.getDrimsimLink() },
    ],
  },
];

// Get ALL links for tracking
export const getAllLinksForDestination = (destinationId: string) => {
  return {
    // Flights
    flights: affiliateLinks.flights.getLink(destinationId),
    flightsKiwi: affiliateLinks.flights.getKiwiLink(destinationId),
    flightsAviasales: affiliateLinks.flights.getAviasalesLink(destinationId),
    flightsTripCom: affiliateLinks.flights.getTripComLink(destinationId),
    // Hotels
    hotels: affiliateLinks.hotels.getLink(destinationId),
    hotelsAgoda: affiliateLinks.hotels.getAgodaLink(destinationId),
    hotelsHostelworld: affiliateLinks.hotels.getHostelworldLink(destinationId),
    hotelsTripCom: affiliateLinks.hotels.getTripComHotelsLink(destinationId),
    hotelsVrbo: affiliateLinks.hotels.getVrboLink(destinationId),
    // Tours
    tours: affiliateLinks.tours.getLink(destinationId),
    toursViator: affiliateLinks.tours.getViatorLink(destinationId),
    toursTiqets: affiliateLinks.tours.getTiqetsLink(destinationId),
    toursMusement: affiliateLinks.tours.getMusementLink(destinationId),
    // Cars
    cars: affiliateLinks.cars.getLink(destinationId),
    carsDiscover: affiliateLinks.cars.getDiscoverCarsLink(destinationId),
    carsEconomy: affiliateLinks.cars.getEconomyLink(destinationId),
    // Transfers
    transfers: affiliateLinks.transfers.getLink(destinationId),
    transfersGetTransfer: affiliateLinks.transfers.getGetTransferLink(destinationId),
    transfersIntui: affiliateLinks.transfers.getIntuiLink(destinationId),
    // Trains
    trainsOmio: affiliateLinks.trains.getOmioLink(destinationId),
    trains12Go: affiliateLinks.trains.get12GoLink(destinationId),
    trainsBlaBlaCar: affiliateLinks.trains.getBlaBlaCarLink(destinationId),
    // Insurance
    insurance: affiliateLinks.insurance.getLink(destinationId),
    insuranceInsubuy: affiliateLinks.insurance.getInsubuyLink(destinationId),
    insuranceWorldNomads: affiliateLinks.insurance.getWorldNomadsLink(destinationId),
    // eSIM
    esimDrimsim: affiliateLinks.esim.getDrimsimLink(destinationId),
    // Cruises
    cruises: affiliateLinks.cruises.getCruiseDirectLink(destinationId),
  };
};
