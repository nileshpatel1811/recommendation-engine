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

    const currentLender = currentMap[answers.currentLender];
    const isSwitching = answers.purpose === "Switch an existing gold loan";
    const isLargeTicket = answers.amount === "Above ₹5 lakh" || answers.amount === "₹2 lakh - ₹5 lakh";

    const scoredLenders = lenders.map(lender => {
        const profile = lender.profile || {};
        let score = 0;
        const matches = [];

        // ==================================================
        // 1. PRIMARY PRIORITY SCORING
        // ==================================================
        if (answers.priority === "Lowest interest cost") {
            if (profile.interestPosition === "competitive") {
                score += 24;
                matches.push("competitive-interest");
            } else if (profile.interestPosition === "mid_to_competitive") {
                score += 14;
            } else {
                score += 4;
            }
        }

        if (answers.priority === "Highest loan amount") {
            if (profile.loanAmount === "very_high") {
                score += 22;
                matches.push("very-high-loan-amount");
            } else if (profile.loanAmount === "high") {
                score += 16;
                matches.push("high-loan-amount");
            } else {
                score += 6;
            }
        }

        if (answers.priority === "Fastest processing") {
            if (profile.speed === "fast") {
                score += 22;
                matches.push("fast-processing");
            } else if (profile.speed === "moderate") {
                score += 12;
            } else {
                score += 4;
            }
        }

        if (answers.priority === "Best overall balance" || answers.priority === "Best overall recommendation") {
            if (profile.interestPosition === "competitive") score += 10;
            if (profile.speed === "fast" || profile.speed === "moderate") score += 8;
            if (profile.trust === "very_high") score += 5;
        }

        // ==================================================
        // 2. BALANCE TRANSFER / SWITCH ADJUSTMENT
        // ==================================================
        if (isSwitching) {
            // When switching large loans, competitive rates (PSU/HDFC) & dedicated takeover desks win
            if (profile.interestPosition === "competitive") {
                score += 12;
            }
            if (lender.id === "iifl" || lender.id === "canara" || lender.id === "hdfc") {
                score += 8; // Strong assisted balance transfer desks in Surat
            }
        }

        // ==================================================
        // 3. LOAN STYLE & PARTIAL RELEASE
        // ==================================================
        if (answers.loanStyle === "Flexible payments and partial gold release") {
            if (profile.partialGoldRelease) {
                score += 10;
                matches.push("partial-gold-release");
            }
            if (profile.monthlyInterest || lender.id === "canara" || lender.id === "sbi") {
                score += 6;
                matches.push("monthly-interest");
            }
        }

        if (answers.loanStyle === "Lower cost, fewer payments") {
            if (profile.interestPosition === "competitive") score += 8;
            if (profile.bullet) score += 4;
        }

        // ==================================================
        // 4. LOAN AMOUNT / TICKET SIZE
        // ==================================================
        if (answers.amount === "Above ₹5 lakh") {
            if (profile.interestPosition === "competitive") score += 6; // Big tickets benefit most from low rate
            if (profile.loanAmount === "very_high") score += 6;
        } else if (answers.amount === "₹2 lakh - ₹5 lakh") {
            if (profile.loanAmount === "very_high" || profile.loanAmount === "high") score += 4;
        }

        // ==================================================
        // 5. URGENCY
        // ==================================================
        if (answers.urgency === "Today" && profile.speed === "fast") {
            score += 8;
        } else if (answers.urgency === "Within a few days" && (profile.speed === "fast" || profile.speed === "moderate")) {
            score += 4;
        }

        return {
            lender,
            score,
            matches
        };
    });

    // ==================================================
    // FILTER OUT CURRENT LENDER
    // ==================================================
    let results = scoredLenders;
    if (isSwitching && currentLender) {
        results = results.filter(result => result.lender.id !== currentLender);
    }

    // ==================================================
    // SORT BY SCORE AND TIEBREAKER
    // ==================================================
    results.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return tieBreaker(a.lender, b.lender, answers.priority, answers.loanStyle);
    });

    // ==================================================
    // RETURN TOP 3
    // ==================================================
    return results.slice(0, 3).map(result => {
        const lender = getLender(result.lender.id);
        lender.matchScore = result.score;
        lender.matchData = result.matches;
        return lender;
    });
}

function tieBreaker(a, b, priority, loanStyle) {
    const profileA = a.profile || {};
    const profileB = b.profile || {};

    if (priority === "Lowest interest cost") {
        const interestRank = { "competitive": 4, "mid_to_competitive": 3, "variable": 2, "higher_variable": 1 };
        return (interestRank[profileB.interestPosition] || 0) - (interestRank[profileA.interestPosition] || 0);
    }

    if (priority === "Highest loan amount") {
        const amountRank = { "very_high": 4, "high": 3, "normal": 2, "low": 1 };
        return (amountRank[profileB.loanAmount] || 0) - (amountRank[profileA.loanAmount] || 0);
    }

    if (priority === "Fastest processing") {
        const speedRank = { "fast": 3, "moderate": 2, "slow": 1 };
        return (speedRank[profileB.speed] || 0) - (speedRank[profileA.speed] || 0);
    }

    return 0;
}

function getLender(id) {
    return JSON.parse(
        JSON.stringify(
            lenders.find(lender => lender.id === id)
        )
    );
}