import { Service, Artist, Booking, Testimonial, BeforeAfterItem } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'lash-hybrid-wispy',
    category: 'lashes',
    title: 'The Signature Wispy Hybrid',
    subtitle: 'Textured, airy extensions with effortless dimensional flutter',
    price: 185,
    depositAmount: 50,
    durationMinutes: 105,
    description: 'Our most sought-after lash look in Kigali. Blends single classic lashes with fluffy hand-crafted volume fans to create a textured, textured-wispy strip-lash effect tailored precisely to your eye shape.',
    image: '/src/assets/images/lash_artistry_showcase_1785252623748.jpg',
    popular: true,
    tags: ['Wispy', 'Kigali Bestseller', 'Lightweight'],
    features: [
      'Custom lash mapping tailored to eye anatomy',
      'Medical-grade formaldehyde-free retention bond',
      'Includes complimentary lash cleanser kit',
      '3-4 week retention with proper care'
    ],
    defaultLashSpecs: {
      curl: 'CC-Curl',
      lengthRange: '9mm - 14mm',
      density: 'Soft Volume 3D',
      mappingStyle: 'Wispy Kim K'
    },
    prepNotes: [
      'Arrive at our Kiyovu studio with clean lashes free of mascara, oil, or eye cream',
      'Avoid caffeinated beverages 2 hours before appointment',
      'Remove contact lenses prior to application'
    ],
    aftercareNotes: [
      'Keep lashes dry for 24 hours post-application',
      'Brush daily with provided spoolie brush',
      'Use oil-free facial products around the eye zone'
    ]
  },
  {
    id: 'lash-classic-natural',
    category: 'lashes',
    title: 'The Barely-There Classic',
    subtitle: '1:1 individual extension per natural lash for clean, dark mascara definition',
    price: 150,
    depositAmount: 40,
    durationMinutes: 90,
    description: 'An understated, high-fashion mascara effect for Kigali fashion lovers. Single cashmere lash extensions applied precisely 1:1 to every healthy natural lash, enhancing length and curl with pure subtle sophistication.',
    image: 'https://images.unsplash.com/photo-1583001809873-a1284a5da527?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tags: ['Natural', 'Minimalist', 'Everyday Luxury'],
    features: [
      'Soft featherlight Cashmere fibers',
      'Zero weight strain on natural lash follicle',
      'Perfect for lash extension first-timers'
    ],
    defaultLashSpecs: {
      curl: 'C-Curl',
      lengthRange: '8mm - 12mm',
      density: 'Natural 1:1',
      mappingStyle: 'Squirrel / Natural Swept'
    },
    prepNotes: [
      'Cleanse eyelids thoroughly before arrival',
      'Do not perm or tint lashes within 14 days prior'
    ],
    aftercareNotes: [
      'Avoid rubbing or pulling on lash extensions',
      'Schedule a refill every 2-3 weeks'
    ]
  },
  {
    id: 'lash-mega-volume',
    category: 'lashes',
    title: 'Velvet Mega Volume',
    subtitle: 'Ultra-dense, dark velvet fans creating dramatic feline intensity',
    price: 230,
    depositAmount: 60,
    durationMinutes: 135,
    description: 'For lovers of captivating intensity across Rwanda. Hand-made ultra-fine 0.03mm fans attached to each natural lash, creating a dense, velvety black lash line with maximum fluff and impact.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tags: ['Glamour', 'Full Velvet', 'Dramatic'],
    features: [
      'Ultra-light 0.03mm luxury fiber fans',
      'Seamless pitch-black lash line definition',
      'Deep cat-eye or doll-eye customization'
    ],
    defaultLashSpecs: {
      curl: 'D-Curl',
      lengthRange: '10mm - 16mm',
      density: 'Mega Volume 10D',
      mappingStyle: 'Cat Eye'
    },
    prepNotes: [
      'Thoroughly remove all waterproof eye makeup',
      'Ensure comfortable attire for a relaxed 2-hour session'
    ],
    aftercareNotes: [
      'Wash gently with lash shampoo 3x a week',
      'Avoid high-heat ovens or direct hair dryer heat'
    ]
  },
  {
    id: 'lash-lift-keratin',
    category: 'lashes',
    title: 'Keratin Lash Infusion & Tint',
    subtitle: 'Natural lash lift, deep conditioning treatment & custom obsidian tint',
    price: 110,
    depositAmount: 30,
    durationMinutes: 60,
    description: 'Nourish and elevate your natural lashes. Uses a gentle amino-keratin formulation to lift, curl, and tint your natural lashes from root to tip, lasting 6 to 8 weeks.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tags: ['Maintenance Free', 'Keratin Lift', 'Natural'],
    features: [
      'Zero extension adhesive required',
      'Infused with peptide and biotin botanical nourishment',
      'Includes custom black-brown or jet-black tint'
    ],
    defaultLashSpecs: {
      curl: 'Natural J',
      lengthRange: 'Natural Length',
      density: 'Natural 1:1',
      mappingStyle: 'Squirrel / Natural Swept'
    },
    prepNotes: [
      'Avoid waterproof mascara 48 hours before session',
      'Remove contact lenses prior to procedure'
    ],
    aftercareNotes: [
      'Keep dry and steam-free for 24 hours',
      'Apply keratin serum oil nightly for lash longevity'
    ]
  },

  // TATTOO SERVICES
  {
    id: 'tattoo-fineline-micro',
    category: 'tattoos',
    title: 'Micro Fine-Line Tattoo',
    subtitle: 'Single-needle delicate line work, minimalist typography, and micro symbols',
    price: 160,
    depositAmount: 50,
    durationMinutes: 75,
    description: 'Precision single-needle (1RL/3RL) tattooing for whisper-thin lines, Kinyarwanda or French script, micro motifs, and subtle geometric accents. Minimal trauma, exceptionally fast healing.',
    image: '/src/assets/images/tattoo_artistry_showcase_1785252638200.jpg',
    popular: true,
    tags: ['Single Needle', 'Bestseller', 'Delicate'],
    features: [
      'Single-use sterile single needle cartridge',
      'Custom placement consultation and stencil sizing in our Kiyovu atelier',
      'Includes medical grade Saniderm / SecondSkin wrap',
      'Vegan hypo-allergenic dynamic inks'
    ],
    defaultTattooSpecs: {
      placement: 'Collarbone',
      approxSizeInches: '2" x 2"',
      styleCategory: 'Fine Line Minimalist',
      inkColor: 'Charcoal Black'
    },
    prepNotes: [
      'Stay well-hydrated and eat a meal 1 hour before session',
      'Avoid blood thinners or alcohol 24 hours prior',
      'Exfoliate and moisturize skin 3 days in advance'
    ],
    aftercareNotes: [
      'Leave clear protective wrap on for 3-5 days',
      'Wash gently with fragrance-free cleanser',
      'Apply thin layer of unscented moisturizer twice daily'
    ]
  },
  {
    id: 'tattoo-botanical-ornamental',
    category: 'tattoos',
    title: 'Botanical & Ornamental Art',
    subtitle: 'Flowing flora, delicate vines, and anatomy-sculpted ornamental fine art',
    price: 240,
    depositAmount: 75,
    durationMinutes: 120,
    description: 'Bespoke custom illustrative tattooing inspired by Rwanda\'s lush flora and geometry, flowing seamlessly with your body contour.',
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80',
    popular: true,
    tags: ['Custom Design', 'Botanical', 'Body Sculpted'],
    features: [
      'Pre-appointment digital sketch preview',
      'Single-needle & micro-shading balance',
      'Tailored to highlight natural body lines'
    ],
    defaultTattooSpecs: {
      placement: 'Forearm',
      approxSizeInches: '3" x 5"',
      styleCategory: 'Botanical / Floral',
      inkColor: 'Fine Grey Wash'
    },
    prepNotes: [
      'Shave target body area gently prior to session if needed',
      'Wear loose comfortable clothing allowing easy access to tattoo area'
    ],
    aftercareNotes: [
      'Avoid swimming, sunbathing, or sauna for 2 weeks',
      'Do not pick or scratch flaking skin during healing phase'
    ]
  },
  {
    id: 'tattoo-custom-flash',
    category: 'tattoos',
    title: 'Curated Atelier Flash Piece',
    subtitle: 'Exclusive pre-designed studio flash concepts from our resident artists',
    price: 190,
    depositAmount: 50,
    durationMinutes: 90,
    description: 'Select from our rotating seasonal Kigali atelier flash collection. Original artwork ranging from abstract line art to micro surrealism, sized up to 4 inches.',
    image: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80',
    popular: false,
    tags: ['Exclusive Artwork', 'Kigali Collection', 'Quick Session'],
    features: [
      'Ready-to-ink studio flash artwork',
      'One-on-one custom sizing and tint adjustment',
      'Complimentary touch-up within 3 months'
    ],
    defaultTattooSpecs: {
      placement: 'Wrist',
      approxSizeInches: '3" x 3"',
      styleCategory: 'Custom Design',
      inkColor: 'Charcoal Black'
    },
    prepNotes: [
      'Bring a valid national ID or passport',
      'Ensure skin is healthy with no sunburn or cuts'
    ],
    aftercareNotes: [
      'Pat dry with clean paper towel after washing',
      'Keep out of direct sunlight during 14-day healing'
    ]
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'artist-elena',
    name: 'Ines Keza',
    title: 'Master Lash Architect & Brow Specialist',
    categories: ['lashes'],
    bio: 'Trained in Paris and Tokyo, Ines is Kigali\'s leading lash artist specializing in airy wispy hybrids and customized lash mapping that enhances natural African and global eye features.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.98,
    reviewCount: 184,
    specialties: ['Wispy Hybrid Mapping', 'Featherweight Volume', 'Keratin Lash Lifts'],
    portfolioImages: [
      '/src/assets/images/lash_artistry_showcase_1785252623748.jpg',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableHours: ['10:00 AM', '11:45 AM', '02:00 PM', '04:15 PM', '06:00 PM']
  },
  {
    id: 'artist-kai',
    name: 'Gael Mugisha',
    title: 'Fine-Line & Ornamental Tattooist',
    categories: ['tattoos'],
    bio: 'A prominent Kigali visual artist and tattooist, Gael creates whisper-thin single needle tattoos, Rwandan floral patterns, and delicate script that ages gracefully.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.99,
    reviewCount: 212,
    specialties: ['Single Needle 1RL', 'Botanical Flow', 'Minimalist Kinyarwanda Script', 'Micro-Realism'],
    portfolioImages: [
      '/src/assets/images/tattoo_artistry_showcase_1785252638200.jpg',
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80'
    ],
    workingDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableHours: ['11:00 AM', '01:30 PM', '03:30 PM', '05:30 PM', '07:00 PM']
  },
  {
    id: 'artist-mila',
    name: 'Sonia Uwase',
    title: 'Dual Specialist (Lashes & Fine-Line Ink)',
    categories: ['lashes', 'tattoos'],
    bio: 'Sonia bridges lash aesthetics and fine-line body art in Kiyovu, Kigali. Known for high precision and an exceptionally relaxing atelier experience.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    rating: 4.96,
    reviewCount: 156,
    specialties: ['Classic Mascara Lashes', 'Micro Finger & Collarbone Ink', 'Keratin Lift & Tint'],
    portfolioImages: [
      'https://images.unsplash.com/photo-1583001809873-a1284a5da527?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80'
    ],
    workingDays: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availableHours: ['10:30 AM', '12:30 PM', '03:00 PM', '05:00 PM']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingRef: 'AURA-7821',
    serviceId: 'lash-hybrid-wispy',
    serviceTitle: 'The Signature Wispy Hybrid',
    category: 'lashes',
    artistId: 'artist-elena',
    artistName: 'Ines Keza',
    clientName: 'Divine Umutoni',
    clientEmail: 'divine.umutoni@example.rw',
    clientPhone: '+250 788 123 456',
    appointmentDate: '2026-08-02',
    appointmentTime: '02:00 PM',
    totalPrice: 185,
    depositPaid: 50,
    depositStatus: 'paid',
    status: 'confirmed',
    lashSpecs: {
      curl: 'CC-Curl',
      lengthRange: '9mm - 13mm',
      density: 'Soft Volume 3D',
      mappingStyle: 'Wispy Kim K'
    },
    clientNotes: 'Slight sensitivity in left eye; prefers subtle cat-eye outer flare.',
    healthConsentsAccepted: true,
    createdAt: '2026-07-28T08:00:00Z'
  },
  {
    id: 'bk-102',
    bookingRef: 'AURA-8932',
    serviceId: 'tattoo-fineline-micro',
    serviceTitle: 'Micro Fine-Line Tattoo',
    category: 'tattoos',
    artistId: 'artist-kai',
    artistName: 'Gael Mugisha',
    clientName: 'Cedric Irazu',
    clientEmail: 'c.irazu@example.rw',
    clientPhone: '+250 789 654 321',
    appointmentDate: '2026-08-03',
    appointmentTime: '01:30 PM',
    totalPrice: 160,
    depositPaid: 50,
    depositStatus: 'paid',
    status: 'confirmed',
    tattooSpecs: {
      placement: 'Wrist',
      approxSizeInches: '2" x 2"',
      styleCategory: 'Fine Line Minimalist',
      inkColor: 'Charcoal Black'
    },
    clientNotes: 'Minimalist constellation outline on right inner wrist.',
    healthConsentsAccepted: true,
    createdAt: '2026-07-28T08:15:00Z'
  }
];

export const STUDIO_FAQS = [
  {
    q: 'Where is AURA Studio located in Kigali?',
    a: 'We are situated in Kiyovu, Boulevard de l\'Umuganda, Suite 400, Kigali, Rwanda. MoMo and Card payments are accepted at check-out.'
  },
  {
    q: 'How long do lash extensions and lifts last?',
    a: 'Lash extensions typically last 3-4 weeks before requiring a fill as your natural lashes shed. Keratin Lash Lifts last 6-8 weeks with zero daily maintenance.'
  },
  {
    q: 'What is the deposit policy?',
    a: 'We require a non-refundable $30–$75 deposit depending on service complexity to reserve your artist time slot. You can reschedule up to 48 hours prior without penalty.'
  },
  {
    q: 'Is fine-line tattooing painful and how does it heal?',
    a: 'Fine-line single needle tattooing causes minimal trauma compared to traditional tattooing. Most clients describe it as a light scratching sensation. Healing takes 7–10 days with our medical SecondSkin bandage.'
  },
  {
    q: 'Can I combine a lash appointment and tattoo session?',
    a: 'Yes! Our dual specialist Sonia Uwase or back-to-back artist booking allows seamless same-day atelier appointments in Kigali.'
  }
];

export const INITIAL_BEFORE_AFTER: BeforeAfterItem[] = [
  {
    id: 'ba-lash-wispy',
    category: 'lashes',
    title: 'The Signature Wispy Hybrid',
    subtitle: 'From natural sparse lashes to textured dimensional flutter',
    serviceId: 'lash-hybrid-wispy',
    artistId: 'artist-elena',
    artistName: 'Ines Keza',
    specs: 'CC-Curl • 9mm - 14mm • Wispy Kim K Mapping',
    beforeImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    afterImage: '/src/assets/images/lash_artistry_showcase_1785252623748.jpg',
    description: 'Custom mapping designed specifically for almond eyes. Blends cashmere classic singles with hand-crafted 3D fans for airy height and maximum lash retention.',
    clientQuote: 'I used to apply strip lashes every morning in Kigali. Now I wake up looking completely effortless.'
  },
  {
    id: 'ba-lash-lift',
    category: 'lashes',
    title: 'Keratin Lash Lift & Obsidian Tint',
    subtitle: 'Natural straight lashes elevated with amino-protein curl',
    serviceId: 'lash-lift-keratin',
    artistId: 'artist-elena',
    artistName: 'Ines Keza',
    specs: 'Keratin Infusion • Jet Black Obsidian Tint • 8 Weeks Duration',
    beforeImage: 'https://images.unsplash.com/photo-1583001809873-a1284a5da527?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Natural lashes lifted directly from the follicle root using non-toxic botanical curling serums, followed by a dark tint coating.',
    clientQuote: 'Zero extensions needed! My natural lashes look twice as long and dark.'
  },
  {
    id: 'ba-lash-mega',
    category: 'lashes',
    title: 'Velvet Mega Volume Transformation',
    subtitle: 'Fine lashes transformed into rich black velvet fans',
    serviceId: 'lash-mega-volume',
    artistId: 'artist-mila',
    artistName: 'Sonia Uwase',
    specs: 'D-Curl • 10mm - 16mm • 10D Handmade Fans',
    beforeImage: 'https://images.unsplash.com/photo-1583001809873-a1284a5da527?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Creating dense black intensity using 0.03mm ultra-light silk fibers, customized in a cat-eye wing shape.',
    clientQuote: 'The ultimate Kigali red-carpet volume that feels completely weightless on the eyes.'
  },
  {
    id: 'ba-tattoo-fineline',
    category: 'tattoos',
    title: 'Single-Needle Collarbone Wildflower',
    subtitle: 'Bare collarbone canvas to whisper-thin botanical art',
    serviceId: 'tattoo-fineline-micro',
    artistId: 'artist-kai',
    artistName: 'Gael Mugisha',
    specs: '1RL Single Needle • Collarbone • Charcoal Black Ink',
    beforeImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    afterImage: '/src/assets/images/tattoo_artistry_showcase_1785252638200.jpg',
    description: 'Etched with single-needle precision following the anatomical curve of the collarbone. Clean heal with Saniderm protective wrap.',
    clientQuote: 'So subtle and elegant. It looks as if it was drawn onto my skin with a fine gel pen.'
  },
  {
    id: 'ba-tattoo-botanical',
    category: 'tattoos',
    title: 'Anatomy-Flowing Botanical Forearm',
    subtitle: 'Unmarked inner arm to flowing floral filigree',
    serviceId: 'tattoo-botanical-ornamental',
    artistId: 'artist-kai',
    artistName: 'Gael Mugisha',
    specs: '3RL Needle & Micro-Wash • Forearm • Custom Stencil',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80',
    description: 'Illustrative botanical piece with soft grey-wash shading designed to complement wrist motion and arm contour.',
    clientQuote: 'Gael listened to my vision and brought my Rwandan botanical art to life so beautifully.'
  },
  {
    id: 'ba-tattoo-micro',
    category: 'tattoos',
    title: 'Micro Constellation Wrist Piece',
    subtitle: 'Bare wrist to delicate single-pass star geometry',
    serviceId: 'tattoo-fineline-micro',
    artistId: 'artist-mila',
    artistName: 'Sonia Uwase',
    specs: 'Micro 1RL • Inner Wrist • Obsidian Charcoal',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80',
    description: 'Whisper-thin 1.5 inch micro tattoo featuring micro dotwork and sharp geometric lines.',
    clientQuote: 'Healed in less than 7 days in Kigali with zero fading or ink spreading.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Aline Gasana',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verifiedClient: true,
    category: 'lashes',
    serviceId: 'lash-hybrid-wispy',
    serviceTitle: 'The Signature Wispy Hybrid',
    artistId: 'artist-elena',
    artistName: 'Ines Keza',
    rating: 5,
    date: 'Verified Atelier Visit • July 2026',
    quote: 'Ines completely transformed my eyes. The Signature Wispy set feels like air—I forget I even have extensions on until I catch my reflection!',
    vibeTag: 'Weightless Wispy',
    specsSummary: 'CC-Curl • 9mm-14mm • Kim K Mapping',
    beforeAfterId: 'ba-lash-wispy'
  },
  {
    id: 't-2',
    clientName: 'Fiona Mutesi',
    clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verifiedClient: true,
    category: 'tattoos',
    serviceId: 'tattoo-fineline-micro',
    serviceTitle: 'Micro Fine-Line Tattoo',
    artistId: 'artist-kai',
    artistName: 'Gael Mugisha',
    rating: 5,
    date: 'Verified Atelier Visit • June 2026',
    quote: "Gael's single-needle precision is unbelievable. My collarbone wildflower tattoo healed so crisply with zero blowout under the Saniderm bandage.",
    vibeTag: 'Whisper Single Needle',
    specsSummary: '1RL Needle • Collarbone • Charcoal Ink',
    beforeAfterId: 'ba-tattoo-fineline'
  },
  {
    id: 't-3',
    clientName: 'Keza Marie',
    clientAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    verifiedClient: true,
    category: 'lashes',
    serviceId: 'lash-lift-keratin',
    serviceTitle: 'Keratin Lash Infusion & Tint',
    artistId: 'artist-elena',
    artistName: 'Ines Keza',
    rating: 5,
    date: 'Verified Atelier Visit • July 2026',
    quote: 'The Keratin Lash Lift lasted over 7 weeks. It gave my natural lashes such a dark glossy curl that I completely threw away my eyelash curler!',
    vibeTag: 'Zero-Maintenance Lift',
    specsSummary: 'Keratin Boost • Jet Black Obsidian Tint',
    beforeAfterId: 'ba-lash-lift'
  },
  {
    id: 't-4',
    clientName: 'Kevin Manzi',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verifiedClient: true,
    category: 'tattoos',
    serviceId: 'tattoo-botanical-ornamental',
    serviceTitle: 'Botanical & Ornamental Art',
    artistId: 'artist-kai',
    artistName: 'Gael Mugisha',
    rating: 5,
    date: 'Verified Atelier Visit • May 2026',
    quote: 'Sonia & Gael created a custom fine-line botanical piece for my forearm that flows so naturally with my movement. The Kiyovu studio environment is serene.',
    vibeTag: 'Anatomy Flow Ink',
    specsSummary: 'Botanical Shading • Fine Grey Wash',
    beforeAfterId: 'ba-tattoo-botanical'
  },
  {
    id: 't-5',
    clientName: 'Sonia Nsabimana',
    clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verifiedClient: true,
    category: 'lashes',
    serviceId: 'lash-mega-volume',
    serviceTitle: 'Velvet Mega Volume',
    artistId: 'artist-mila',
    artistName: 'Sonia Uwase',
    rating: 5,
    date: 'Verified Atelier Visit • July 2026',
    quote: 'As someone who loves dramatic eyes, Sonia created the dark velvet lash line of my dreams in Kigali without damaging my natural lashes at all.',
    vibeTag: 'Velvet Feline Glam',
    specsSummary: 'D-Curl • 10D Fans • 10mm-16mm',
    beforeAfterId: 'ba-lash-mega'
  }
];

