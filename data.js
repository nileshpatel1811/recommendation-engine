const questions = [
    {
        id: "purpose",
        title: "What are you trying to do today?",
        options: [
            "Get a new gold loan",
            "Switch an existing gold loan",
            "Just comparing"
        ]
    },

    {
        id: "priority",
        title: "What matters most to you?",
        options: [
            "Lowest interest cost",
            "Highest loan amount",
            "Fastest processing",
            "Best overall balance"
        ]
    },

    {
        id: "amount",
        title: "How much money do you need?",
        options: [
            "Under ₹50,000",
            "₹50,000 - ₹2 lakh",
            "₹2 lakh - ₹5 lakh",
            "Above ₹5 lakh"
        ]
    },

    {
        id: "urgency",
        title: "How quickly do you need the money?",
        options: [
            "Today",
            "Within a few days",
            "I'm not in a hurry"
        ]
    },

    {
        id: "loanStyle",
        title: "Which loan style would suit you better?",
        options: [
            "Lower cost, fewer payments",
            "Flexible payments and partial gold release",
            "I'm not sure"
        ]
    },

    {
        id: "currentLender",
        title: "Who is your current lender?",
        options: [
            "Muthoot Finance",
            "Manappuram Finance",
            "Canara Bank",
            "State Bank of India",
            "Bank of Baroda",
            "IIFL Finance",
            "Other"
        ],
        showIf: (answers) =>
            answers.purpose === "Switch an existing gold loan"
    }
];