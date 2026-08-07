const lenders = [

    {
        id: "canara",
        name: "Canara Bank",
        type: "Bank",

        summary:
            "Excellent choice if your priority is the lowest possible interest and you don't mind visiting a branch.",

        recommendedWhen: {
            lowestInterest: true,
            fastest: false,
            trusted: true,
            emergency: false,
            highLtv: false,
            transfer: false
        },

        reasons: [
            "One of the lowest interest rates",
            "Trusted public sector bank",
            "Good for planned borrowing"
        ],

        tradeoffs: [
            "Physical gold must be brought to the branch",
            "Processing is slower than NBFCs"
        ]
    },

    {
        id: "bob",
        name: "Bank of Baroda",
        type: "Bank",

        summary:
            "Great balance between low interest and higher loan eligibility.",

        recommendedWhen: {
            lowestInterest: true,
            fastest: false,
            trusted: true,
            emergency: false,
            highLtv: true,
            transfer: false
        },

        reasons: [
            "Competitive interest rates",
            "Higher loan-to-value eligibility",
            "Fast account opening"
        ],

        tradeoffs: [
            "Still slower than NBFCs",
            "Physical branch visit required"
        ]
    },

    {
        id: "indian",
        name: "Indian Bank",
        type: "Bank",

        summary:
            "Good option for customers looking for competitive rates with relatively quick branch processing.",

        recommendedWhen: {
            lowestInterest: true,
            fastest: false,
            trusted: true,
            emergency: false,
            highLtv: false,
            transfer: false
        },

        reasons: [
            "Competitive interest",
            "Quick branch processing",
            "Public sector bank"
        ],

        tradeoffs: [
            "ITR may be required for larger loans",
            "New account opening may take time"
        ]
    },

    {
        id: "sbi",
        name: "State Bank of India",
        type: "Bank",

        summary:
            "Best suited for borrowers who value trust, reputation and nationwide branch coverage.",

        recommendedWhen: {
            lowestInterest: true,
            fastest: false,
            trusted: true,
            emergency: false,
            highLtv: false,
            transfer: false
        },

        reasons: [
            "Highly trusted bank",
            "Competitive interest rates",
            "Excellent branch network"
        ],

        tradeoffs: [
            "Can take longer than NBFCs",
            "Branch queues can be longer"
        ]
    },

    {
        id: "muthoot",
        name: "Muthoot Finance",
        type: "NBFC",

        summary:
            "Best choice when speed matters and you need money the same day.",

        recommendedWhen: {
            lowestInterest: false,
            fastest: true,
            trusted: true,
            emergency: true,
            highLtv: false,
            transfer: true
        },

        reasons: [
            "Very fast approval",
            "Excellent for emergency loans",
            "Supports balance transfer"
        ],

        tradeoffs: [
            "Interest rates are usually higher than banks"
        ]
    },

    {
        id: "manappuram",
        name: "Manappuram Finance",
        type: "NBFC",

        summary:
            "Strong option for borrowers looking for quick processing and flexible service.",

        recommendedWhen: {
            lowestInterest: false,
            fastest: true,
            trusted: true,
            emergency: true,
            highLtv: false,
            transfer: true
        },

        reasons: [
            "Very fast processing",
            "Supports balance transfer",
            "Good for urgent requirements"
        ],

        tradeoffs: [
            "Higher interest than most banks"
        ]
    },

    {
        id: "iifl",
        name: "IIFL Finance",
        type: "NBFC",

        summary:
            "Good digital-first option with quick processing and convenient customer experience.",

        recommendedWhen: {
            lowestInterest: false,
            fastest: true,
            trusted: true,
            emergency: true,
            highLtv: false,
            transfer: true
        },

        reasons: [
            "Quick approval",
            "Good digital experience",
            "Convenient application process"
        ],

        tradeoffs: [
            "Interest is generally higher than public sector banks"
        ]
    }

];