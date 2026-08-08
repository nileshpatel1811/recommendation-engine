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

    const percent =
        ((index + 1) / questions.length) * 100;

    return `
        <div class="progress">

            <div class="progress-text">
                Question ${index + 1} of ${questions.length}
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
                id="textAnswer"
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
        purpose: state.answers.purpose,
        priority: state.answers.priority,
        amount: state.answers.amount
    });

    const recommendations =
        getRecommendations(state.answers);

    app.innerHTML = `

<div class="result">

    <h1>Your Recommended Lenders</h1>

<p class="subtitle">
    Based on what matters most to you, these are our recommended options.
</p>

${recommendations
    .map(renderRecommendationCard)
    .join("<hr>")}

<div class="disclaimer">

    Recommendations are based on publicly available lender information
    and our independent research. Final interest rates, eligibility,
    and approval depend on the lender's assessment of your gold and application.

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
        id="feedbackDetails"
        style="display:none;margin-top:18px;"
    >

                    <textarea
                        id="feedbackText"
                        rows="3"
                        placeholder="What was missing or confusing? (optional)"
                        style="
                            width:100%;
                            box-sizing:border-box;
                            padding:10px;
                            border:1px solid #d1d5db;
                            border-radius:8px;
                            resize:vertical;
                            font-family:inherit;
                        "
                    ></textarea>

        <button
            id="feedbackSubmitBtn"
            style="margin-top:10px;"
        >
            Send Feedback
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
        priority: state.answers.priority,
        recommendation_1: recommendations[0]?.id || "",
        recommendation_2: recommendations[1]?.id || "",
        recommendation_3: recommendations[2]?.id || ""
    });

    let selectedFeedback = null;

    document
        .querySelectorAll(".feedback-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                selectedFeedback =
                    button.dataset.feedback;

                document
                    .querySelectorAll(".feedback-btn")
                    .forEach(btn => {
                        btn.style.background = "";
                        btn.style.borderColor = "";
                    });

                button.style.background = "#dbeafe";
                button.style.borderColor = "#2563eb";

                trackEvent("recommendation_feedback", {

                    feedback: selectedFeedback,

                    priority: state.answers.priority

                });

                document
                    .getElementById("feedbackDetails")
                    .style.display = "block";

            });

        });

    document
        .getElementById("feedbackSubmitBtn")
        .addEventListener("click", () => {

            const feedbackText =
                document
                    .getElementById("feedbackText")
                    .value
                    .trim();

            /*
             * Important:
             * Do NOT send free-text feedback to GA4.
             * It could contain personal information.
             *
             * For now we only acknowledge the feedback locally.
             */

            document
                .getElementById("feedbackDetails")
                .style.display = "none";

            document
                .getElementById("feedbackThanks")
                .style.display = "block";

        });

    document
        .getElementById("restartBtn")
        .addEventListener("click", renderLanding);

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

    return `

        <div class="recommendation-card">

            <h2>

                ${medals[index]}
                ${lender.name}

            </h2>

            <p style="color:#2563eb;font-weight:600;">

                ${lender.summary}

            </p>

            <h3>
                Why we recommend it
            </h3>

            <ul>

                ${lender.reasons
        .map(r => `<li>${r}</li>`)
        .join("")}

            </ul>

            <h3>
                Things to know
            </h3>

            <ul>

                ${lender.tradeoffs
        .map(t => `<li>${t}</li>`)
        .join("")}

            </ul>

        </div>

    `;

}