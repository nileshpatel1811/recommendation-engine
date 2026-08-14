function getRecommendations(answers) {

    const currentMap = {
        "Muthoot Finance": "muthoot",
        "Manappuram Finance": "manappuram",
        "Canara Bank": "canara",
        "State Bank of India": "sbi",
        "HDFC Bank": "hdfc",
        "IIFL Finance": "iifl",
        "Bank of Baroda": "bob"
    };

    const currentLender =
        currentMap[answers.currentLender];


    const scoredLenders = lenders.map(lender => {

        const profile = lender.profile || {};

        let score = 0;

        const matches = [];


        // ==================================================
        // PRIMARY PRIORITY
        // ==================================================

        /*
         * The user's selected priority gets the largest
         * weighting. Other answers refine the result.
         */


        // --------------------------------------------------
        // LOWEST INTEREST COST
        // --------------------------------------------------

        if (answers.priority === "Lowest interest cost") {

            if (
                profile.interestPosition === "competitive"
            ) {

                score += 20;

                matches.push("competitive-interest");

            }
            else if (
                profile.interestPosition === "mid_to_competitive"
            ) {

                score += 12;

                matches.push("mid-competitive-interest");

            }
            else {

                score += 5;

            }
        }


        // --------------------------------------------------
        // HIGHEST LOAN AMOUNT
        // --------------------------------------------------

        if (answers.priority === "Highest loan amount") {

            if (
                profile.loanAmount === "very_high"
            ) {

                score += 20;

                matches.push("very-high-loan-amount");

            }
            else if (
                profile.loanAmount === "high"
            ) {

                score += 15;

                matches.push("high-loan-amount");

            }
            else {

                score += 5;

            }
        }


        // --------------------------------------------------
        // FASTEST PROCESSING
        // --------------------------------------------------

        if (answers.priority === "Fastest processing") {

            if (
                profile.speed === "fast"
            ) {

                score += 20;

                matches.push("fast-processing");

            }
            else if (
                profile.speed === "moderate"
            ) {

                score += 12;

            }
            else {

                score += 5;

            }
        }


        // --------------------------------------------------
        // BEST OVERALL BALANCE
        // --------------------------------------------------

        if (answers.priority === "Best overall balance") {

            if (
                profile.interestPosition === "competitive"
            ) {

                score += 8;

                matches.push("competitive-interest");

            }
            else if (
                profile.interestPosition === "mid_to_competitive"
            ) {

                score += 6;

            }
            else {

                score += 3;

            }


            if (
                profile.speed === "fast"
            ) {

                score += 7;

                matches.push("fast-processing");

            }
            else if (
                profile.speed === "moderate"
            ) {

                score += 5;

            }
            else {

                score += 2;

            }


            if (
                profile.trust === "very_high"
            ) {

                score += 4;

            }
            else if (
                profile.trust === "high"
            ) {

                score += 3;

            }


            if (
                profile.repaymentOptions &&
                profile.repaymentOptions.length >= 2
            ) {

                score += 3;

            }

        }


        // ==================================================
        // URGENCY
        // ==================================================

        if (answers.urgency === "Today") {

            /*
             * Do NOT eliminate banks.
             *
             * Banks can also provide same-day processing
             * depending on product, branch and application.
             */

            if (
                profile.speed === "fast"
            ) {

                score += 5;

                matches.push("fast-processing");

            }
            else if (
                profile.speed === "moderate"
            ) {

                score += 3;

            }
            else {

                score += 1;

            }

        }


        if (
            answers.urgency === "Within a few days"
        ) {

            if (
                profile.speed === "fast"
            ) {

                score += 3;

            }
            else if (
                profile.speed === "moderate"
            ) {

                score += 2;

            }
            else {

                score += 1;

            }

        }


        // ==================================================
        // LOAN STYLE
        // ==================================================

        if (
            answers.loanStyle ===
            "Lower cost, fewer payments"
        ) {

            if (
                profile.interestPosition === "competitive"
            ) {

                score += 6;

                matches.push("lower-cost");

            }
            else if (
                profile.interestPosition ===
                "mid_to_competitive"
            ) {

                score += 4;

            }


            if (profile.bullet) {

                score += 3;

                matches.push("bullet-repayment");

            }

        }


        // --------------------------------------------------
        // FLEXIBLE PAYMENTS
        // --------------------------------------------------

        if (
            answers.loanStyle ===
            "Flexible payments and partial gold release"
        ) {

            if (profile.partialGoldRelease) {

                score += 8;

                matches.push("partial-gold-release");

            }

            if (profile.monthlyInterest) {

                score += 4;

                matches.push("monthly-interest");

            }

            if (
                profile.repaymentOptions &&
                profile.repaymentOptions.length >= 2
            ) {

                score += 3;

                matches.push("multiple-repayment-options");

            }

            if (profile.partialPrepayment) {

                score += 3;

                matches.push("partial-prepayment");

            }

        }


        // ==================================================
        // LOAN AMOUNT
        // ==================================================

        if (
            answers.amount === "Above ₹5 lakh"
        ) {

            if (
                profile.loanAmount === "very_high"
            ) {

                score += 4;

            }
            else if (
                profile.loanAmount === "high"
            ) {

                score += 3;

            }

        }


        if (
            answers.amount === "₹2 lakh - ₹5 lakh"
        ) {

            if (
                profile.loanAmount === "very_high"
            ) {

                score += 3;

            }
            else if (
                profile.loanAmount === "high"
            ) {

                score += 2;

            }

        }


        // ==================================================
        // SWITCHING
        // ==================================================

        /*
         * We currently do not award points for balance
         * transfer because that field is not consistently
         * verified across the current lender dataset.
         *
         * We simply remove the current lender below.
         */


        return {
            lender,
            score,
            matches
        };

    });


    // ==================================================
    // REMOVE CURRENT LENDER WHEN SWITCHING
    // ==================================================

    let results = scoredLenders;

    if (
        answers.purpose ===
        "Switch an existing gold loan" &&
        currentLender
    ) {

        results =
            results.filter(
                result =>
                    result.lender.id !== currentLender
            );

    }


    // ==================================================
    // SORT
    // ==================================================

    results.sort((a, b) => {

        if (b.score !== a.score) {

            return b.score - a.score;

        }

        return tieBreaker(
            a.lender,
            b.lender,
            answers.priority,
            answers.loanStyle
        );

    });


    // ==================================================
    // RETURN TOP 3
    // ==================================================

    return results
        .slice(0, 3)
        .map(result => {

            const lender =
                getLender(result.lender.id);

            lender.matchScore =
                result.score;

            lender.matchData =
                result.matches;

            return lender;

        });

}


/* ======================================================
   TIE BREAKER
   ====================================================== */

function tieBreaker(a, b, priority, loanStyle) {

    const profileA = a.profile || {};
    const profileB = b.profile || {};


    // --------------------------------------------------
    // LOWEST INTEREST
    // --------------------------------------------------

    if (
        priority ===
        "Lowest interest cost"
    ) {

        const interestRank = {

            "competitive": 4,
            "mid_to_competitive": 3,
            "variable": 2,
            "higher_variable": 1

        };

        return (
            (interestRank[
                profileB.interestPosition
                ] || 0)
            -
            (interestRank[
                profileA.interestPosition
                ] || 0)
        );

    }


    // --------------------------------------------------
    // HIGHEST LOAN AMOUNT
    // --------------------------------------------------

    if (
        priority ===
        "Highest loan amount"
    ) {

        const amountRank = {

            "very_high": 4,
            "high": 3,
            "normal": 2,
            "low": 1

        };

        return (
            (amountRank[
                profileB.loanAmount
                ] || 0)
            -
            (amountRank[
                profileA.loanAmount
                ] || 0)
        );

    }


    // --------------------------------------------------
    // FASTEST PROCESSING
    // --------------------------------------------------

    if (
        priority ===
        "Fastest processing"
    ) {

        const speedRank = {

            "fast": 4,
            "moderate": 3,
            "slow": 2

        };

        return (
            (speedRank[
                profileB.speed
                ] || 0)
            -
            (speedRank[
                profileA.speed
                ] || 0)
        );

    }


    // --------------------------------------------------
    // BEST OVERALL
    // --------------------------------------------------

    if (
        priority ===
        "Best overall balance"
    ) {

        const trustRank = {

            "very_high": 3,
            "high": 2,
            "normal": 1

        };

        return (
            (trustRank[
                profileB.trust
                ] || 0)
            -
            (trustRank[
                profileA.trust
                ] || 0)
        );

    }


    return 0;

}


/* ======================================================
   GET LENDER
   ====================================================== */

function getLender(id) {

    return JSON.parse(
        JSON.stringify(
            lenders.find(
                lender =>
                    lender.id === id
            )
        )
    );

}