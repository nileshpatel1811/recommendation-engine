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
        title: "What matters most?",
        options: [
            "Lowest interest cost",
            "Highest loan amount",
            "Fastest processing",
            "Best overall recommendation"
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
        id: "city",
        title: "Which city are you in?",
        type: "text"
    },
    {
        id: "currentLender",
        title: "Who is your current lender?",
        type: "text",
        showIf: (answers) =>
            answers.purpose === "Switch an existing gold loan"
    }
];