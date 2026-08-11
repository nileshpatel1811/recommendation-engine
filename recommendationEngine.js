function getRecommendations(answers) {

    const currentMap = {
        "Muthoot Finance": "muthoot",
        "Manappuram Finance": "manappuram",
        "Canara Bank": "canara",
        "State Bank of India": "sbi",
        "Bank of Baroda": "bob",
        "Indian Bank": "indian",
        "IIFL Finance": "iifl"
    };

    /*
     * Start every lender at zero.
     * We then add points based on what the borrower told us.
     */
    const scores = {};

    lenders.forEach(lender => {
        scores[lender.id] = 0;
    });

    /*
     * --------------------------------------------------
     * 1. PRIMARY PRIORITY
     * --------------------------------------------------
     */

    const priorityWeights = {
        "Lowest interest cost": {
            lowestInterest: 5
        },

        "Highest loan amount": {
            highLtv: 5
        },

        "Fastest processing": {
            fastest: 5
        },

        "Best overall balance": {
            lowestInterest: 2,
            highLtv: 2,
            fastest: 2,
            trusted: 1
        }
    };

    const priority = priorityWeights[answers.priority];

    if (priority) {

        lenders.forEach(lender => {

            Object.entries(priority).forEach(([factor, points]) => {

                if (lender.recommendedWhen[factor]) {
                    scores[lender.id] += points;
                }

            });

        });

    }


    /*
     * --------------------------------------------------
     * 2. URGENCY
     * --------------------------------------------------
     */

    if (answers.urgency === "Today") {

        lenders.forEach(lender => {

            if (lender.recommendedWhen.emergency) {
                scores[lender.id] += 4;
            }

            if (lender.recommendedWhen.fastest) {
                scores[lender.id] += 2;
            }

        });

    }

    else if (answers.urgency === "Within a few days") {

        lenders.forEach(lender => {

            if (lender.recommendedWhen.fastest) {
                scores[lender.id] += 2;
            }

        });

    }

    /*
     * If the borrower isn't in a hurry,
     * don't give the speed-focused lenders extra points.
     */


    /*
     * --------------------------------------------------
     * 3. LOAN AMOUNT
     * --------------------------------------------------
     */

    if (answers.amount === "Above ₹5 lakh") {

        lenders.forEach(lender => {

            if (lender.recommendedWhen.highLtv) {
                scores[lender.id] += 3;
            }

        });

    }

    else if (answers.amount === "₹2 lakh - ₹5 lakh") {

        lenders.forEach(lender => {

            if (lender.recommendedWhen.highLtv) {
                scores[lender.id] += 2;
            }

        });

    }


    /*
     * --------------------------------------------------
     * 4. REPAYMENT / FLEXIBILITY PREFERENCE
     * --------------------------------------------------
     */

    if (
        answers.loanStyle ===
        "Lower cost, fewer payments"
    ) {

        lenders.forEach(lender => {

            if (lender.type === "Bank") {
                scores[lender.id] += 3;
            }

        });

    }

    else if (
        answers.loanStyle ===
        "Flexible payments and partial gold release"
    ) {

        lenders.forEach(lender => {

            if (lender.recommendedWhen.flexibleRepayment) {
                scores[lender.id] += 3;
            }

            if (lender.recommendedWhen.partialRelease) {
                scores[lender.id] += 3;
            }

        });

    }


    /*
     * --------------------------------------------------
     * 5. SWITCHING EXISTING LOAN
     * --------------------------------------------------
     */

    if (answers.purpose === "Switch an existing gold loan") {

        const current = currentMap[answers.currentLender];

        /*
         * Never recommend the lender the borrower
         * is currently using.
         */

        if (current) {
            scores[current] = -999;
        }

        /*
         * Balance-transfer-friendly lenders get
         * an additional boost.
         */

        lenders.forEach(lender => {

            if (lender.recommendedWhen.transfer) {
                scores[lender.id] += 3;
            }

        });

    }


    /*
     * --------------------------------------------------
     * 6. GET TOP RESULTS
     * --------------------------------------------------
     */

    const ranked = lenders
        .map(lender => ({
            lender,
            score: scores[lender.id]
        }))
        .sort((a, b) => {

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            /*
             * Stable tie-breaker:
             * prefer lenders appearing earlier
             * in the lender list.
             */

            return lenders.indexOf(a.lender) -
                lenders.indexOf(b.lender);

        });


    /*
     * Return the top three lenders.
     */

    return ranked
        .slice(0, 3)
        .map(result => {

            const lender = JSON.parse(
                JSON.stringify(result.lender)
            );

            /*
             * Keep the score available for the
             * recommendation explanation/UI.
             */

            lender.matchScore = result.score;

            return lender;

        });
}


/*
 * Helper retained for compatibility with
 * the existing application.
 */

function getLender(id) {

    return JSON.parse(
        JSON.stringify(
            lenders.find(l => l.id === id)
        )
    );

}