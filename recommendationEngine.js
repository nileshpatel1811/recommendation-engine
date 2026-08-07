function getRecommendations(answers) {

    const recommendationTable = {

        "Lowest interest cost": [
            "canara",
            "bob",
            "indian"
        ],

        "Highest loan amount": [
            "bob",
            "sbi",
            "canara"
        ],

        "Fastest processing": [
            "muthoot",
            "manappuram",
            "iifl"
        ],

        "Best overall recommendation": [
            "canara",
            "sbi",
            "bob"
        ]

    };

    let ids = [...recommendationTable[answers.priority]];

    //
    // If switching, don't recommend current lender
    //
    if (answers.purpose === "Switch an existing gold loan") {

        const currentMap = {
            "Muthoot Finance": "muthoot",
            "Manappuram Finance": "manappuram",
            "Canara Bank": "canara",
            "State Bank of India": "sbi",
            "Bank of Baroda": "bob",
            "Indian Bank": "indian",
            "IIFL Finance": "iifl"
        };

        const current = currentMap[answers.currentLender];

        if (current) {
            ids = ids.filter(id => id !== current);
        }

    }

    return ids.map(getLender);

}

function getLender(id) {

    return JSON.parse(
        JSON.stringify(
            lenders.find(l => l.id === id)
        )
    );

}