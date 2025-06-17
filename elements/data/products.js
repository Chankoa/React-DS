export const products = {
    'gibson-lespaul': {
        title: "Gibson Les Paul Standard",
        description: "Une guitare électrique emblématique avec corps en acajou et table en érable",
        image: "https://placehold.co/600x400?text=Gibson+Les+Paul",
        price: "2799€",
        category: "Guitares",
        subcategories: ["Guitares électriques", "Gibson", "Les Paul"],
        tags: ["rock", "blues", "premium", "humbucker"],
        specs: {
            wood: "Acajou/Érable",
            pickups: "Humbuckers Gibson",
            bridge: "TOM Bridge",
            color: "Sunburst"
        },
        inStock: true,
        featured: true
    },
    'fender-strat': {
        title: "Fender Stratocaster Professional",
        description: "La légendaire Stratocaster avec micros V-Mod II",
        image: "https://placehold.co/600x400?text=Fender+Strat",
        price: "1899€",
        category: "Guitares",
        subcategories: ["Guitares électriques", "Fender", "Stratocaster"],
        tags: ["rock", "blues", "funk", "single-coil"],
        specs: {
            wood: "Aulne/Érable",
            pickups: "3 V-Mod II Single-coil",
            bridge: "2-Point Tremolo",
            color: "Olympic White"
        },
        inStock: true,
        featured: true
    },
    'marshall-jcm800': {
        title: "Marshall JCM800 2203",
        description: "Amplificateur à lampes 100W, le son du rock britannique",
        image: "https://placehold.co/600x400?text=Marshall+JCM800",
        price: "2499€",
        category: "Amplification",
        subcategories: ["Amplis à lampes", "Marshall", "Têtes d'ampli"],
        tags: ["rock", "metal", "lampes", "haute-puissance"],
        specs: {
            power: "100W",
            tubes: "EL34",
            channels: "2",
            speaker: "4x12 cabinet"
        },
        inStock: false,
        featured: true
    },
    'boss-sd1': {
        title: "BOSS SD-1 Super OverDrive",
        description: "Pédale overdrive asymétrique classique",
        image: "https://placehold.co/600x400?text=BOSS+SD1",
        price: "119€",
        category: "Effets",
        subcategories: ["Pédales", "Overdrive", "BOSS"],
        tags: ["overdrive", "analogique", "économique"],
        specs: {
            type: "Overdrive",
            controls: "Level, Tone, Drive",
            bypass: "Buffered",
            power: "9V DC"
        },
        inStock: true,
        featured: false
    }
};

// Structure des catégories pour le menu de navigation
export const categories = {
    "Guitares": {
        "Guitares électriques": ["Gibson", "Fender", "Ibanez"],
        "Guitares acoustiques": ["Martin", "Taylor"],
        "Basses": ["Fender", "Music Man"]
    },
    "Amplification": {
        "Amplis à lampes": ["Marshall", "Fender", "Orange"],
        "Amplis transistor": ["Roland", "Fender"],
        "Baffles": ["Marshall", "Orange"]
    },
    "Effets": {
        "Overdrive": ["BOSS", "Ibanez"],
        "Delay": ["Strymon", "BOSS"],
        "Reverb": ["Strymon", "TC Electronic"]
    }
};