export type CategoryType = 'lashes' | 'tattoos';

export interface LashSpecs {
  curl?: 'C-Curl' | 'CC-Curl' | 'D-Curl' | 'L-Curl' | 'Natural J';
  lengthRange?: string;
  density?: 'Natural 1:1' | 'Soft Volume 3D' | 'Glam Volume 5D' | 'Mega Volume 10D';
  mappingStyle?: 'Cat Eye' | 'Doll Eye' | 'Wispy Kim K' | 'Squirrel / Natural Swept' | 'Custom';
}

export interface TattooSpecs {
  placement?: 'Forearm' | 'Wrist' | 'Collarbone' | 'Ribs' | 'Ankle/Foot' | 'Behind Ear' | 'Custom';
  approxSizeInches?: string;
  styleCategory?: 'Fine Line Minimalist' | 'Micro-Realism' | 'Botanical / Floral' | 'Ornamental' | 'Cyber Sigilism' | 'Custom Design';
  inkColor?: 'Charcoal Black' | 'Fine Grey Wash' | 'Red Accent' | 'Custom Color';
}

export interface Service {
  _id?: string;
  id: string;
  category: CategoryType;
  title: string;
  subtitle: string;
  price: number;
  depositAmount: number;
  durationMinutes: number;
  description: string;
  image: string;
  popular?: boolean;
  tags: string[];
  features: string[];
  defaultLashSpecs?: LashSpecs;
  defaultTattooSpecs?: TattooSpecs;
  prepNotes: string[];
  aftercareNotes: string[];
}

export interface Artist {
  _id?: string;
  id: string;
  name: string;
  title: string;
  categories: CategoryType[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  portfolioImages: string[];
  workingDays: string[];
  availableHours: string[];
}

export interface Booking {
  _id?: string;
  id: string;
  bookingRef: string;
  serviceId: string;
  serviceTitle: string;
  category: CategoryType;
  artistId: string;
  artistName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  totalPrice: number;
  depositPaid: number;
  depositStatus: 'paid' | 'pending' | 'refunded';
  status: 'confirmed' | 'completed' | 'cancelled';
  lashSpecs?: LashSpecs;
  tattooSpecs?: TattooSpecs;
  clientNotes?: string;
  healthConsentsAccepted: boolean;
  createdAt: string;
}

export interface AiConsultationRequest {
  category: CategoryType;
  vibeDescription: string;
  eyeShapeOrPlacement?: string;
  skinOrLashSensitivity?: string;
  preferredTone?: string;
}

export interface AiConsultationResponse {
  recommendationTitle: string;
  styleDescription: string;
  suggestedSpecs: {
    curlOrStyle: string;
    lengthOrSize: string;
    densityOrInk: string;
    mappingOrPlacement: string;
  };
  recommendedArtistId: string;
  recommendedServiceId: string;
  prepAdvice: string[];
  aftercareHighlight: string;
}

export interface Testimonial {
  _id?: string;
  id: string;
  clientName: string;
  clientAvatar: string;
  verifiedClient: boolean;
  category: CategoryType;
  serviceId: string;
  serviceTitle: string;
  artistId: string;
  artistName: string;
  rating: number;
  date: string;
  quote: string;
  vibeTag: string;
  specsSummary: string;
  beforeAfterId?: string;
}

export interface BeforeAfterItem {
  _id?: string;
  id: string;
  category: CategoryType;
  title: string;
  subtitle: string;
  serviceId: string;
  artistId: string;
  artistName: string;
  specs: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  clientQuote?: string;
}

export interface StudioFaq {
  q: string;
  a: string;
}
