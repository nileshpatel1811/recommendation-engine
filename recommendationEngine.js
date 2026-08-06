function getRecommendations(answers) {

    const results = lenders.map(lender => ({
        ...lender,
        score: 0,
        reasons: []
    }));

    results.forEach(lender => {

        // ---------------------------------
        // Priority
        // ---------------------------------

        if (answers.priority === "Lowest interest cost") {

            if (["canara", "bob", "sbi", "union", "indian"].includes(lender.id)) {
                lender.score += 5;
                lender.reasons.push("Expected lower interest rates");
            }

        }

        if (answers.priority === "Fastest processing") {

            if (["muthoot", "manappuram"].includes(lender.id)) {
                lender.score += 5;
                lender.reasons.push("Fast processing and quick disbursement");
            }

        }

        if (answers.priority === "Highest loan amount") {

            if (["canara", "bob", "sbi"].includes(lender.id)) {
                lender.score += 4;
                lender.reasons.push("Suitable for larger loan amounts");
            }

        }

        if (answers.priority === "Best overall recommendation") {

            if (["canara", "bob", "sbi"].includes(lender.id)) {
                lender.score += 4;
                lender.reasons.push("Strong overall balance of cost and trust");
            }

            if (["muthoot", "manappuram"].includes(lender.id)) {
                lender.score += 2;
            }

        }

        // ---------------------------------
        // Purpose
        // ---------------------------------

        if (answers.purpose === "Switch an existing gold loan") {

            if (["canara", "bob", "sbi"].includes(lender.id)) {
                lender.score += 3;
                lender.reasons.push("Often considered for balance transfer");
            }

        }

        // ---------------------------------
        // Amount
        // ---------------------------------

        if (answers.amount === "Above ₹5 lakh") {

            if (["canara", "sbi", "bob"].includes(lender.id)) {
                lender.score += 2;
                lender.reasons.push("Better suited for higher loan values");
            }

        }

        if (answers.amount === "Under ₹50,000") {

            if (["muthoot", "manappuram"].includes(lender.id)) {
                lender.score += 2;
                lender.reasons.push("Quick processing for smaller loans");
            }

        }

    });

    // ---------------------------------
    // Sort by score
    // ---------------------------------

    results.sort((a, b) => b.score - a.score);

    // ---------------------------------
    // Confidence
    // ---------------------------------

    results.forEach(lender => {

        if (lender.score >= 10) {
            lender.match = "★★★★★ Strong Match";
        }
        else if (lender.score >= 7) {
            lender.match = "★★★★☆ Good Match";
        }
        else {
            lender.match = "★★★☆☆ Worth Considering";
        }

    });

    results.forEach(lender=>{

        lender.reasons=[...new Set(lender.reasons)];

    });

    // ---------------------------------
    // Return Top 3
    // ---------------------------------

    return results.slice(0, 3);

}