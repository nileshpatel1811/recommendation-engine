const app = document.getElementById("app");

const state = {
    currentQuestion: 0,
    answers: {}
};

function trackEvent(eventName, parameters = {}) {

    if (typeof gtag === "function") {

        gtag("event", eventName, parameters);

    }

}

renderLanding();

/* ======================================================
   LANDING
====================================================== */

function renderLanding() {

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    app.innerHTML = `
        <div class="landing">

            <h1>Find Your Best Gold Loan Match</h1>

            <p class="subtitle">
                Answer a few simple questions and we'll recommend
                the lenders that best match your needs.
            </p>

            <button id="startBtn">
                Find My Best Match
            </button>

            <p class="trust">
                ✓ Takes less than 60 seconds<br>
                ✓ Free to use<br>
                ✓ No personal information required
            </p>

        </div>
    `;

    document
        .getElementById("startBtn")
        .addEventListener("click", () => {

            state.currentQuestion = 0;
            state.answers = {};

            trackEvent("questionnaire_started");

            showQuestion(0);

        });

}

/* ======================================================
   QUESTION
====================================================== */

function showQuestion(index) {

    const question = questions[index];

    app.innerHTML = `
        <div class="question">

            ${renderProgress(index)}

            <h2>${question.title}</h2>

            ${renderQuestion(question)}

            <div style="margin-top:30px;display:flex;gap:12px;">

                ${
        index > 0
            ? `<button id="backBtn">← Back</button>`
            : ""
    }

            </div>

        </div>
    `;

    bindQuestion(question);

    bindBackButton(index);

}

/* ======================================================
   PROGRESS BAR
====================================================== */

function renderProgress(index) {

    const visibleQuestions = questions.filter(question => {

        if (!question.showIf) {
            return true;
        }

        return question.showIf(state.answers);

    });

    const currentVisibleIndex =
        visibleQuestions.indexOf(questions[index]);

    const percent =
        ((currentVisibleIndex + 1) / visibleQuestions.length) * 100;

    return `
        <div class="progress">

            <div class="progress-text">
                Question ${currentVisibleIndex + 1}
                of ${visibleQuestions.length}
            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percent}%">
                </div>

            </div>

        </div>
    `;
}

/* ======================================================
   RENDER QUESTION
====================================================== */

function renderQuestion(question) {

    if (question.type === "text") {

        if (question.id === "city") {

            return `

                <input
                    id="cityInput"
                    value="${state.answers.city || ""}"
                    type="text"
                    autocomplete="off"
                    placeholder="Start typing your city..."
                >

                <div
                    id="citySuggestions"
                    style="margin-top:10px;">
                </div>

            `;

        }

        return `

            <input
                id="textAnswer"
                value="${state.answers[question.id] || ""}"
                type="text"
                placeholder="Type here..."
            >

            <br><br>

            <button id="nextBtn">
                Continue
            </button>

        `;

    }

    return question.options
        .map(option => `
            <button
                class="option
                ${
                        state.answers[question.id] === option
                            ? "selected"
                            : ""
                    }"
                data-value="${option}">
                ${option}
            </button>

            <br><br>
        `)
        .join("");

}

/* ======================================================
   EVENTS
====================================================== */

function bindQuestion(question) {

    if (question.type === "text") {

        if (question.id === "city") {

            bindCityAutocomplete();

            return;

        }

        document
            .getElementById("nextBtn")
            .addEventListener("click", () => {

                const value =
                    document
                        .getElementById("textAnswer")
                        .value
                        .trim();

                if (!value) {

                    alert("Please enter a value.");

                    return;

                }

                state.answers[question.id] = value;

                nextQuestion();

            });

        return;

    }

    document
        .querySelectorAll(".option")
        .forEach(button => {

            button.addEventListener("click", () => {

                button.style.background = "#dbeafe";
                button.style.borderColor = "#2563eb";

                state.answers[question.id] =
                    button.dataset.value;

                trackEvent("question_answered", {
                    question_id: question.id,
                    answer: button.dataset.value
                });

                setTimeout(nextQuestion, 180);

            });

        });

}

/* ======================================================
   CITY AUTOCOMPLETE
====================================================== */

function bindCityAutocomplete() {

    const input =
        document.getElementById("cityInput");

    const suggestions =
        document.getElementById("citySuggestions");

    input.focus();

    input.addEventListener("input", () => {

        const search =
            input.value.toLowerCase().trim();

        suggestions.innerHTML = "";

        if (search.length < 2)
            return;

        const matches = cities
            .filter(city =>
                city
                    .toLowerCase()
                    .startsWith(search)
            )
            .slice(0, 8);

        matches.forEach(city => {

            const div =
                document.createElement("div");

            div.className = "city-item";

            div.textContent = city;

            div.onclick = () => {

                state.answers.city = city;

                trackEvent("question_answered", {
                    question_id: "city",
                    answer: city
                });

                suggestions.innerHTML="";

                nextQuestion();

            };

            suggestions.appendChild(div);

        });

        if(matches.length===0){

            suggestions.innerHTML=
                "<div class='city-item'>No matching city</div>";

        }

    });

    input.addEventListener("keydown",e=>{

        if(e.key==="Enter"){

            const first=suggestions.firstChild;

            if(first){

                first.click();

            }

        }

    });

}

/* ======================================================
   BACK BUTTON
====================================================== */

function bindBackButton(index) {

    if (index === 0)
        return;

    document
        .getElementById("backBtn")
        .addEventListener("click", previousQuestion);

}

function previousQuestion() {

    do {

        state.currentQuestion--;

    } while (

        state.currentQuestion >= 0 &&
        questions[state.currentQuestion].showIf &&
        !questions[state.currentQuestion].showIf(state.answers)

        );

    showQuestion(state.currentQuestion);

}

/* ======================================================
   NEXT QUESTION
====================================================== */

function nextQuestion() {

    do {

        state.currentQuestion++;

    } while (

        state.currentQuestion < questions.length &&
        questions[state.currentQuestion].showIf &&
        !questions[state.currentQuestion].showIf(state.answers)

        );

    if (state.currentQuestion < questions.length) {

        showQuestion(state.currentQuestion);

    } else {

        showRecommendation();

    }

}

/* ======================================================
   RECOMMENDATION
====================================================== */

function showRecommendation() {

    trackEvent("questionnaire_completed", {
        purpose: state.answers.purpose || "",
        priority: state.answers.priority || "",
        amount: state.answers.amount || "",
        urgency: state.answers.urgency || "",
        loan_style: state.answers.loanStyle || "",
        current_lender: state.answers.currentLender || ""
    });

    const recommendations =
        getRecommendations(state.answers);

    app.innerHTML = `

        <div class="result">

            <h1>Your Recommended Lenders</h1>

            <p class="subtitle">
                We matched lenders to your priorities, loan amount,
                urgency and preferred loan style.
            </p>

            ${recommendations
        .map(renderRecommendationCard)
        .join("<hr>")}

            <div class="disclaimer">

                Recommendations are based on our current lender research
                and the information you provided.

                Lender rates, eligibility, repayment terms, charges and
                approval can vary. Always confirm the current terms directly
                with the lender before taking a loan.

            </div>

            <div
                class="feedback-box"
                style="
                    margin-top:30px;
                    padding:20px;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    background:#f9fafb;
                "
            >

                <h3 style="margin-top:0;">
                    Was this recommendation useful?
                </h3>

                <div
                    id="feedbackOptions"
                    style="
                        display:flex;
                        flex-wrap:wrap;
                        gap:10px;
                        margin-top:15px;
                    "
                >

                    <button
                        class="feedback-btn"
                        data-feedback="yes"
                    >
                        👍 Yes, this helps
                    </button>

                    <button
                        class="feedback-btn"
                        data-feedback="somewhat"
                    >
                        🤔 Somewhat
                    </button>

                    <button
                        class="feedback-btn"
                        data-feedback="no"
                    >
                        👎 Not useful
                    </button>

                </div>

                <div
                    id="feedbackThanks"
                    style="
                        display:none;
                        margin-top:15px;
                        color:#166534;
                        font-weight:600;
                    "
                >
                    Thanks — your feedback helps us improve.
                </div>

            </div>

            <br>

            <button id="restartBtn">
                Start Again
            </button>

        </div>

    `;

    trackEvent("recommendations_viewed", {
        priority: state.answers.priority || "",
        amount: state.answers.amount || "",
        urgency: state.answers.urgency || "",
        loan_style: state.answers.loanStyle || "",
        recommendation_1: recommendations[0]?.id || "",
        recommendation_2: recommendations[1]?.id || "",
        recommendation_3: recommendations[2]?.id || ""
    });

    document
        .querySelectorAll(".feedback-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".feedback-btn")
                    .forEach(btn => {
                        btn.style.background = "";
                        btn.style.borderColor = "";
                    });

                button.style.background = "#dbeafe";
                button.style.borderColor = "#2563eb";

                trackEvent("recommendation_feedback", {

                    feedback: button.dataset.feedback,

                    priority: state.answers.priority || "",
                    amount: state.answers.amount || "",
                    urgency: state.answers.urgency || "",
                    loan_style: state.answers.loanStyle || "",
                    purpose: state.answers.purpose || "",

                    recommendation_1: recommendations[0]?.id || "",
                    recommendation_2: recommendations[1]?.id || "",
                    recommendation_3: recommendations[2]?.id || ""

                });

                document
                    .getElementById("feedbackThanks")
                    .style.display = "block";

            });

        });

    document
        .getElementById("restartBtn")
        .addEventListener("click", () => {

            state.currentQuestion = 0;
            state.answers = {};

            renderLanding();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
}


function getRecommendationExplanation(lender, index) {

    const answers = state.answers;

    const profile = lender.profile || {};

    const reasons = [];
    const tradeoffs = [];


    /*
     * --------------------------------------------------
     * PRIMARY PRIORITY
     * --------------------------------------------------
     */

    if (answers.priority === "Lowest interest cost") {

        if (
            profile.interestPosition === "competitive"
        ) {

            reasons.push(
                "A stronger match because keeping interest cost low is your top priority."
            );

        } else {

            tradeoffs.push(
                "Its main advantage is not lower interest cost compared with the bank options."
            );

        }
    }


    if (answers.priority === "Highest loan amount") {

        if (
            profile.loanAmount === "very_high" ||
            profile.loanAmount === "high"
        ) {

            reasons.push(
                "A stronger match if you need a larger gold-loan amount."
            );

        } else {

            tradeoffs.push(
                "Another lender may be a stronger option if maximising loan amount is your main goal."
            );

        }
    }


    if (answers.priority === "Fastest processing") {

        if (
            profile.speed === "fast"
        ) {

            reasons.push(
                "A stronger match because you prioritised faster processing."
            );

        } else {

            tradeoffs.push(
                "Some other lenders in our comparison may offer faster processing."
            );

        }
    }


    if (
        answers.priority === "Best overall recommendation" ||
        answers.priority === "Best overall balance"
    ) {

        if (
            profile.interestPosition === "competitive"
        ) {

            reasons.push(
                "Offers a competitive option for borrowers who care about borrowing cost."
            );

        }

        if (
            profile.speed === "fast"
        ) {

            reasons.push(
                "Offers a faster-processing option compared with some bank alternatives."
            );

        }

        if (
            profile.repaymentOptions &&
            profile.repaymentOptions.length >= 2
        ) {

            reasons.push(
                "Offers more than one repayment structure."
            );

        }

    }


    /*
     * --------------------------------------------------
     * URGENCY
     * --------------------------------------------------
     */

    if (answers.urgency === "Today") {

        if (
            profile.speed === "fast"
        ) {

            reasons.push(
                "Its product offering makes processing speed a meaningful part of the match."
            );

        } else {

            /*
             * IMPORTANT:
             * Do NOT say banks cannot provide money today.
             */

            tradeoffs.push(
                "Actual same-day availability can depend on the product, branch and application."
            );

        }

    }


    if (
        answers.urgency === "Within a few days" &&
        profile.speed === "fast"
    ) {

        reasons.push(
            "Its faster-processing profile fits your short timeline."
        );

    }


    /*
     * --------------------------------------------------
     * LOAN AMOUNT
     * --------------------------------------------------
     */

    if (
        answers.amount === "Above ₹5 lakh" ||
        answers.amount === "₹2 lakh - ₹5 lakh"
    ) {

        if (
            profile.loanAmount === "very_high"
        ) {

            reasons.push(
                "Its loan-size profile makes it a strong option for larger borrowing needs."
            );

        } else if (
            profile.loanAmount === "high"
        ) {

            reasons.push(
                "Its loan-size profile is suitable for a larger borrowing requirement."
            );

        }

    }


    /*
     * --------------------------------------------------
     * REPAYMENT PREFERENCE
     * --------------------------------------------------
     */

    if (
        answers.loanStyle ===
        "Lower cost, fewer payments"
    ) {

        if (
            profile.interestPosition === "competitive"
        ) {

            reasons.push(
                "Better aligned with your preference to keep borrowing cost down."
            );

        }

        if (
            profile.bullet
        ) {

            reasons.push(
                "A bullet repayment option is available for this lender."
            );

        }

        if (
            profile.interestPosition !== "competitive"
        ) {

            tradeoffs.push(
                "Its published pricing may not be the strongest fit if minimizing interest cost is your main goal."
            );

        }

    }


    /*
     * --------------------------------------------------
     * FLEXIBLE REPAYMENT
     * --------------------------------------------------
     */

    if (
        answers.loanStyle ===
        "Flexible payments and partial gold release"
    ) {

        if (
            profile.monthlyInterest
        ) {

            reasons.push(
                "A monthly-interest repayment option is available."
            );

        }

        if (
            profile.partialPrepayment
        ) {

            reasons.push(
                "Partial prepayment is supported."
            );

        }

        if (
            profile.repaymentOptions &&
            profile.repaymentOptions.length >= 2
        ) {

            reasons.push(
                "Multiple repayment structures are available."
            );

        }

        if (profile.partialGoldRelease) {

            reasons.push(
                "Part-release of pledged gold is supported, subject to the applicable product terms."
            );

        }

        /*
         * Do NOT claim partial gold release.
         *
         * Partial prepayment and partial release of pledged
         * gold are not necessarily the same thing.
         */

        if (
            !profile.monthlyInterest &&
            !profile.partialPrepayment
        ) {

            tradeoffs.push(
                "This lender may offer less repayment flexibility than some alternatives."
            );

        }

    }


    /*
     * --------------------------------------------------
     * SWITCHING
     * --------------------------------------------------
     */

    if (
        answers.purpose ===
        "Switch an existing gold loan"
    ) {

        /*
         * We deliberately don't claim transfer support
         * unless it has been verified for the specific product.
         */

        reasons.push(
            "This option is included as an alternative lender while you compare your existing loan."
        );

    }


    /*
     * --------------------------------------------------
     * FALLBACK
     * --------------------------------------------------
     */

    if (
        reasons.length === 0 &&
        lender.reasons
    ) {

        reasons.push(
            ...lender.reasons.slice(0, 2)
        );

    }


    if (
        tradeoffs.length === 0 &&
        lender.tradeoffs
    ) {

        tradeoffs.push(
            ...lender.tradeoffs.slice(0, 1)
        );

    }


    return {
        reasons: reasons.slice(0, 3),
        tradeoffs: tradeoffs.slice(0, 2)
    };

}

function getMatchHeadline(lender, index) {

    if (index === 0) {
        return "Strongest match based on your answers";
    }

    if (index === 1) {
        return "Another strong option to compare";
    }

    return "Another option worth considering";
}

/* ======================================================
   RECOMMENDATION CARD
====================================================== */

function renderRecommendationCard(lender, index) {

    const medals = [
        "🥇",
        "🥈",
        "🥉"
    ];

    const explanation =
        getRecommendationExplanation(lender, index);

    return `

        <div class="recommendation-card">

            <h2>
                ${medals[index]}
                ${lender.name}
            </h2>

            <p class="recommendation-summary">
                ${getMatchHeadline(lender, index)}
            </p>

            <h3>
                Why this matches you
            </h3>

            ${
        explanation.reasons.length
            ? `
                        <ul>
                            ${explanation.reasons
                .map(reason =>
                    `<li>${reason}</li>`
                )
                .join("")}
                        </ul>
                    `
            : `
                        <p>
                            This lender matches several of the
                            preferences you selected.
                        </p>
                    `
    }

            <h3>
                Things to know
            </h3>

            ${
        explanation.tradeoffs.length
            ? `
                        <ul>
                            ${explanation.tradeoffs
                .map(tradeoff =>
                    `<li>${tradeoff}</li>`
                )
                .join("")}
                        </ul>
                    `
            : `
                        <p>
                            As with any gold loan, confirm the current
                            rate, charges, eligibility and repayment
                            terms directly with the lender.
                        </p>
                    `
    }

        </div>

    `;
}