const app = document.getElementById("app");

const state = {
    currentQuestion: 0,
    answers: {},
    leadData: {}
};

function trackEvent(eventName, parameters = {}) {
    // Google Analytics
    if (typeof gtag === "function") {
        gtag("event", eventName, parameters);
    }
    // Meta Pixel
    if (typeof fbq === "function") {
        if (eventName === "questionnaire_completed" || eventName === "lead_submitted") {
            fbq("track", "Lead", parameters);
        } else {
            fbq("trackCustom", eventName, parameters);
        }
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
        <div class="landing" style="text-align: center; max-width: 500px; margin: 0 auto; padding: 10px 12px;">

            <h1 style="font-size: 1.65rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1.25;">
                Compare Top Gold Loans in Surat
            </h1>

            <p class="subtitle" style="font-size: 0.95rem; color: #475569; margin-bottom: 16px; line-height: 1.45;">
                Compare lowest interest rates & highest per-gram valuation across verified banks & NBFCs.
            </p>

            <!-- Live Rate Snapshot Table -->
            <div class="rate-snapshot-card">
                <div class="table-header">
                    <h3>📊 Surat Benchmark Gold Loan Rates</h3>
                    <span class="live-badge">Updated Aug 2026</span>
                </div>
                <div class="table-responsive">
                    <table class="rate-table">
                        <thead>
                            <tr>
                                <th>Lender Type</th>
                                <th>Expected Rate</th>
                                <th>Speed</th>
                                <th>Key Advantage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>🏛️ SBI / Bank of Baroda / Canara</strong></td>
                                <td><span class="rate-highlight">8.75% – 9.50%</span></td>
                                <td>1–2 Days</td>
                                <td>Lowest Total Interest</td>
                            </tr>
                            <tr>
                                <td><strong>🏦 HDFC Bank</strong></td>
                                <td><span class="rate-highlight">9.00% – 16.00%</span></td>
                                <td>Same Day</td>
                                <td>High LTV & Account Perks</td>
                            </tr>
                            <tr>
                                <td><strong>🟡 Muthoot / Manappuram / IIFL</strong></td>
                                <td><span class="rate-highlight">10.50% – 16.00%</span></td>
                                <td>30 Mins</td>
                                <td>Instant Cash, Minimal Docs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="rate-footnote">⚠️ Rates depend on required speed, loan amount, and repayment structure.</p>
            </div>

            <!-- Lenders directly visible above the fold -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 20px;">
                <span style="background:#f8fafc; border: 1px solid #cbd5e1; padding: 4px 9px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #1e293b;">🏛️ SBI</span>
                <span style="background:#f8fafc; border: 1px solid #cbd5e1; padding: 4px 9px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #1e293b;">🟡 Muthoot</span>
                <span style="background:#f8fafc; border: 1px solid #cbd5e1; padding: 4px 9px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #1e293b;">🏦 HDFC Bank</span>
                <span style="background:#f8fafc; border: 1px solid #cbd5e1; padding: 4px 9px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #1e293b;">🏛️ Bank of Baroda</span>
                <span style="background:#f8fafc; border: 1px solid #cbd5e1; padding: 4px 9px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #1e293b;">🟡 IIFL Finance</span>
            </div>

            <!-- Interactive Conversion Card -->
            <div class="quick-start-box" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 14px; padding: 18px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                <p style="font-weight: 700; margin-bottom: 14px; font-size: 1.05rem; color: #0f172a;">
                    Select your required loan amount to begin:
                </p>

                <div class="amount-pills" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button class="amount-btn option" data-amount="Below ₹50,000" style="padding: 14px 10px; font-weight: 700; font-size: 0.95rem; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; cursor: pointer; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; justify-content: center; align-items: center; gap: 4px;">
                        ₹25k – ₹50k <span style="color: #2563eb;">→</span>
                    </button>
                    <button class="amount-btn option popular" data-amount="₹50,000 - ₹2 lakh" style="padding: 14px 10px; font-weight: 700; font-size: 0.95rem; border-radius: 8px; border: 2px solid #2563eb; background: #eff6ff; cursor: pointer; color: #1e40af; box-shadow: 0 2px 6px rgba(37,99,235,0.12); display: flex; justify-content: center; align-items: center; gap: 4px;">
                        ₹50k – ₹2 Lakh <span style="color: #2563eb;">→</span>
                    </button>
                    <button class="amount-btn option" data-amount="₹2 lakh - ₹5 lakh" style="padding: 14px 10px; font-weight: 700; font-size: 0.95rem; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; cursor: pointer; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; justify-content: center; align-items: center; gap: 4px;">
                        ₹2 – ₹5 Lakhs <span style="color: #2563eb;">→</span>
                    </button>
                    <button class="amount-btn option" data-amount="Above ₹5 lakh" style="padding: 14px 10px; font-weight: 700; font-size: 0.95rem; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #ffffff; cursor: pointer; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; justify-content: center; align-items: center; gap: 4px;">
                        ₹5 Lakhs+ <span style="color: #2563eb;">→</span>
                    </button>
                </div>

                <div style="margin-top: 14px; font-size: 0.8rem; color: #059669; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 4px;">
                    <span>⚡ 100% Free • Verified Surat Branch Matches</span>
                </div>
            </div>

            <!-- Trust Points -->
            <div style="margin-top: 20px; font-size: 0.85rem; color: #64748b; line-height: 1.6; text-align: left; background: #f8fafc; border-radius: 10px; padding: 12px 16px;">
                <div>✓ <strong>Direct Comparison:</strong> Compare 7 Top Lenders across Surat</div>
                <div>✓ <strong>Fast:</strong> Takes only 45 seconds for instant on-screen results</div>
            </div>

        </div>
    `;

    document.querySelectorAll(".amount-btn").forEach(button => {
        button.addEventListener("click", () => {
            const selectedAmount = button.dataset.amount;

            button.style.background = "#2563eb";
            button.style.color = "#ffffff";
            button.style.borderColor = "#1d4ed8";

            state.answers = {
                amount: selectedAmount
            };

            trackEvent("questionnaire_started", {
                start_method: "direct_amount_select",
                initial_amount: selectedAmount
            });

            trackEvent("question_answered", {
                question_id: "amount",
                answer: selectedAmount
            });

            let nextIdx = 0;
            while (
                nextIdx < questions.length &&
                (questions[nextIdx].id === "amount" ||
                    (questions[nextIdx].showIf && !questions[nextIdx].showIf(state.answers)))
                ) {
                nextIdx++;
            }

            state.currentQuestion = nextIdx;

            setTimeout(() => {
                if (state.currentQuestion < questions.length) {
                    showQuestion(state.currentQuestion);
                } else {
                    showPhoneGate();
                }
            }, 180);
        });
    });
}

/* ======================================================
   QUESTION
====================================================== */

function showQuestion(index) {
    // Reset scroll to top immediately so the question and progress bar are fully visible
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

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
            : `<button id="backToHomeBtn">← Back to Home</button>`
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

    const currentVisibleIndex = visibleQuestions.indexOf(questions[index]);
    const percent = Math.max(15, ((currentVisibleIndex + 1) / visibleQuestions.length) * 100);

    return `
        <div class="progress">
            <div class="progress-text">
                Question ${currentVisibleIndex + 1} of ${visibleQuestions.length}
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${percent}%"></div>
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
                <div id="citySuggestions" style="margin-top:10px;"></div>
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
                class="option ${state.answers[question.id] === option ? "selected" : ""}"
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

        document.getElementById("nextBtn").addEventListener("click", () => {
            const value = document.getElementById("textAnswer").value.trim();
            if (!value) {
                alert("Please enter a value.");
                return;
            }
            state.answers[question.id] = value;
            nextQuestion();
        });
        return;
    }

    document.querySelectorAll(".option").forEach(button => {
        button.addEventListener("click", () => {
            button.style.background = "#2563eb";
            button.style.color = "#ffffff";
            button.style.borderColor = "#1d4ed8";

            state.answers[question.id] = button.dataset.value;

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
    const input = document.getElementById("cityInput");
    const suggestions = document.getElementById("citySuggestions");

    input.focus();

    input.addEventListener("input", () => {
        const search = input.value.toLowerCase().trim();
        suggestions.innerHTML = "";

        if (search.length < 2) return;

        const matches = cities
            .filter(city => city.toLowerCase().startsWith(search))
            .slice(0, 8);

        matches.forEach(city => {
            const div = document.createElement("div");
            div.className = "city-item";
            div.textContent = city;

            div.onclick = () => {
                state.answers.city = city;
                trackEvent("question_answered", {
                    question_id: "city",
                    answer: city
                });
                suggestions.innerHTML = "";
                nextQuestion();
            };

            suggestions.appendChild(div);
        });

        if (matches.length === 0) {
            suggestions.innerHTML = "<div class='city-item'>No matching city</div>";
        }
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const first = suggestions.firstChild;
            if (first) {
                first.click();
            }
        }
    });
}

/* ======================================================
   BACK BUTTON
====================================================== */

function bindBackButton(index) {
    const backBtn = document.getElementById("backBtn");
    const backToHomeBtn = document.getElementById("backToHomeBtn");

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener("click", renderLanding);
        return;
    }

    if (backBtn) {
        backBtn.addEventListener("click", previousQuestion);
    }
}

function previousQuestion() {
    do {
        state.currentQuestion--;
    } while (
        state.currentQuestion >= 0 &&
        (questions[state.currentQuestion].id === "amount" ||
            (questions[state.currentQuestion].showIf && !questions[state.currentQuestion].showIf(state.answers)))
        );

    if (state.currentQuestion < 0) {
        renderLanding();
    } else {
        showQuestion(state.currentQuestion);
    }
}

/* ======================================================
   NEXT QUESTION
====================================================== */

function nextQuestion() {
    do {
        state.currentQuestion++;
    } while (
        state.currentQuestion < questions.length &&
        (questions[state.currentQuestion].id === "amount" ||
            (questions[state.currentQuestion].showIf && !questions[state.currentQuestion].showIf(state.answers)))
        );

    if (state.currentQuestion < questions.length) {
        showQuestion(state.currentQuestion);
    } else {
        showPhoneGate();
    }
}

/* ======================================================
   PHONE & LOCATION CAPTURE GATE
====================================================== */

function showPhoneGate() {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    trackEvent("questionnaire_completed", {
        purpose: state.answers.purpose || "",
        priority: state.answers.priority || "",
        amount: state.answers.amount || "",
        urgency: state.answers.urgency || "",
        loan_style: state.answers.loanStyle || "",
        current_lender: state.answers.currentLender || ""
    });

    app.innerHTML = `
        <div class="phone-gate-card" style="max-width: 480px; margin: 0 auto; padding: 20px 16px; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); text-align: left;">
            
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <span style="font-size: 1.4rem;">🎉</span>
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 0;">We Found Your Best Matches!</h2>
            </div>

            <p style="font-size: 0.92rem; color: #475569; margin-bottom: 18px; line-height: 1.45;">
                Enter your WhatsApp/Mobile number to view your exact branch rate card and local appraiser contact in Surat.
            </p>

            <form id="leadCaptureForm">
                <div style="margin-bottom: 14px;">
                    <label for="leadName" style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e293b; margin-bottom: 6px;">
                        Full Name
                    </label>
                    <input 
                        type="text" 
                        id="leadName" 
                        required 
                        placeholder="e.g. Rahul Patel" 
                        style="width: 100%; padding: 12px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;"
                    />
                </div>

                <div style="margin-bottom: 14px;">
                    <label for="leadPhone" style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e293b; margin-bottom: 6px;">
                        WhatsApp / Mobile Number
                    </label>
                    <div style="display: flex; align-items: center; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; background: #ffffff;">
                        <span style="background: #f1f5f9; padding: 12px 12px; font-size: 0.95rem; font-weight: 600; color: #475569; border-right: 1.5px solid #cbd5e1;">+91</span>
                        <input 
                            type="tel" 
                            id="leadPhone" 
                            required 
                            pattern="[6-9][0-9]{9}" 
                            maxlength="10" 
                            placeholder="98765 43210" 
                            style="width: 100%; padding: 12px 14px; border: none; outline: none; font-size: 1rem; box-sizing: border-box;"
                        />
                    </div>
                </div>

                <div style="margin-bottom: 18px;">
                    <label for="leadArea" style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e293b; margin-bottom: 6px;">
                        Your Area in Surat
                    </label>
                    <select 
                        id="leadArea" 
                        required 
                        style="width: 100%; padding: 12px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; background: #ffffff; color: #0f172a; box-sizing: border-box;"
                    >
                        <option value="Varachha / Mini Bazar" selected>Varachha / Mini Bazar / Hirabaug</option>
                        <option value="Katargam / AK Road">Katargam / AK Road / Ved Road</option>
                        <option value="Adajan / Pal / Rander">Adajan / Pal / Rander</option>
                        <option value="Vesu / City Light / Althan">Vesu / City Light / Althan</option>
                        <option value="Ring Road / Textile Market">Ring Road / Textile Market</option>
                        <option value="Other Area in Surat">Other Area in Surat</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    id="submitLeadBtn" 
                    style="width: 100%; padding: 14px 16px; background: #2563eb; color: #ffffff; font-size: 1.05rem; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 3px 8px rgba(37,99,235,0.3); display: flex; justify-content: center; align-items: center; gap: 8px;"
                >
                    <span>Unlock Matched Lenders & Rates</span> →
                </button>
            </form>

            <div style="margin-top: 14px; font-size: 0.78rem; color: #64748b; line-height: 1.4; text-align: center;">
                🔒 <strong>Strict Privacy:</strong> Your number is only used to send branch contact details & loan eligibility. No spam.
            </div>

        </div>
    `;

    document.getElementById("leadCaptureForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("leadName").value.trim();
        const phone = document.getElementById("leadPhone").value.trim();
        const area = document.getElementById("leadArea").value;

        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        state.leadData = {
            name: name,
            phone: phone,
            area: area,
            timestamp: new Date().toISOString()
        };

        const submitBtn = document.getElementById("submitLeadBtn");
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Matching Branch Appraisers...</span>";

        // Dispatch GA4 & Meta Pixel Events
        trackEvent("lead_submitted", {
            name: name,
            area: area,
            amount: state.answers.amount || "",
            purpose: state.answers.purpose || "",
            priority: state.answers.priority || "",
            urgency: state.answers.urgency || ""
        });

        // Push lead payload to webhook / backend
        sendLeadToWebhook({
            ...state.leadData,
            answers: state.answers
        });

        setTimeout(() => {
            showRecommendation();
        }, 350);
    });
}

function sendLeadToWebhook(payload) {
    // console.log("Captured Lead Payload:", payload);

    const WEBHOOK_URL = "https://formspree.io/f/mgaeegyr";

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (response.ok) {
                // console.log("Lead successfully delivered to Formspree!");
            } else {
                // console.error("Formspree rejected submission:", response.statusText);
            }
        })
        .catch(err => console.error("Webhook network error:", err));
}

/* ======================================================
   RECOMMENDATION
====================================================== */

function showRecommendation() {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    const recommendations = getRecommendations(state.answers);
    const userArea = state.leadData.area || "Surat";

    app.innerHTML = `
        <div class="result">

            <h1>Your Recommended Lenders</h1>

            <p class="subtitle">
                Matched for <strong>${state.answers.amount || "your loan"}</strong> near <strong>${userArea}</strong> based on lowest interest cost, per-gram value, and speed.
            </p>

            ${recommendations.map(renderRecommendationCard).join("<hr>")}

            <div class="disclaimer">
                Recommendations are based on current lender research and the details you selected.
                Lender rates, per-gram valuation, eligibility, processing fees, and approval terms can vary. Always confirm current terms directly with the lender before proceeding.
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
                    Was this comparison helpful?
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
                    <button class="feedback-btn" data-feedback="yes">
                        👍 Yes, this helps
                    </button>
                    <button class="feedback-btn" data-feedback="somewhat">
                        🤔 Somewhat
                    </button>
                    <button class="feedback-btn" data-feedback="no">
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
                    Thanks — your feedback helps us keep rates accurate.
                </div>
            </div>

            <br>

            <button id="restartBtn">
                Start New Comparison
            </button>

        </div>
    `;

    trackEvent("recommendations_viewed", {
        priority: state.answers.priority || "",
        amount: state.answers.amount || "",
        urgency: state.answers.urgency || "",
        loan_style: state.answers.loanStyle || "",
        area: userArea,
        recommendation_1: recommendations[0]?.id || "",
        recommendation_2: recommendations[1]?.id || "",
        recommendation_3: recommendations[2]?.id || ""
    });

    document.querySelectorAll(".feedback-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".feedback-btn").forEach(btn => {
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
                area: userArea,
                recommendation_1: recommendations[0]?.id || "",
                recommendation_2: recommendations[1]?.id || "",
                recommendation_3: recommendations[2]?.id || ""
            });

            document.getElementById("feedbackThanks").style.display = "block";
        });
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
        state.currentQuestion = 0;
        state.answers = {};
        state.leadData = {};
        renderLanding();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ======================================================
   DYNAMIC RECOMMENDATION EXPLANATION ENGINE
====================================================== */

function getRecommendationExplanation(lender, index) {
    const answers = state.answers;
    const profile = lender.profile || {};
    const reasons = [];
    const tradeoffs = [];

    const isSwitching = answers.purpose === "Switch an existing gold loan";
    const isLargeAmount = answers.amount === "Above ₹5 lakh" || answers.amount === "₹2 lakh - ₹5 lakh";
    const currentLenderName = answers.currentLender || "your current lender";

    // 1. Balance Transfer / Switch Specific Logic
    if (isSwitching) {
        if (profile.interestPosition === "competitive") {
            reasons.push(`Significant interest savings compared to ${currentLenderName} (reduces borrowing cost by 3%–6% p.a.).`);
        } else if (lender.id === "iifl" || lender.id === "hdfc") {
            reasons.push(`Fast takeover desk assistance with potential top-up cash on appreciated gold valuation.`);
        }
    }

    // 2. Loan Style & Repayment Flexibility
    if (answers.loanStyle === "Flexible payments and partial gold release") {
        if (profile.partialGoldRelease) {
            reasons.push("Supports proportional gold release when paying down principal.");
        }
        if (profile.monthlyInterest || lender.id === "canara" || lender.id === "sbi") {
            reasons.push("Overdraft (OD) / flexible interest-servicing facility available.");
        }
    } else if (answers.loanStyle === "Lower cost, fewer payments") {
        if (profile.bullet) {
            reasons.push("Clean bullet repayment scheme (repay principal and interest at maturity).");
        }
    }

    // 3. Priorities & Ticket Size
    if (answers.priority === "Lowest interest cost" && profile.interestPosition === "competitive") {
        reasons.push("Category-leading benchmark interest rate among Surat branches.");
    } else if (answers.priority === "Highest loan amount" && (profile.loanAmount === "very_high" || profile.loanAmount === "high")) {
        reasons.push("Maximizes per-gram valuation up to the official 75% RBI LTV ceiling.");
    } else if (answers.priority === "Fastest processing" && profile.speed === "fast") {
        reasons.push("Priority fast-track processing and immediate gold assaying on-site.");
    }

    // 4. Large Ticket Size Benefit
    if (isLargeAmount && (lender.id === "canara" || lender.id === "sbi" || lender.id === "bob")) {
        reasons.push("Special high-ticket slabs with capped processing charges.");
    }

    // 5. Context-Aware Tradeoffs / Things to Know
    if (isSwitching) {
        if (profile.interestPosition === "competitive") {
            tradeoffs.push("Balance takeover requires 2–4 working days to clear custody from your existing lender.");
        } else {
            tradeoffs.push("Higher interest rate than public sector banks, but offers faster 24–48 hr takeover settlement.");
        }
    } else {
        if (profile.speed !== "fast") {
            tradeoffs.push("Requires visiting the local branch during working hours; turnaround is typically 1–2 days.");
        }
        if (profile.interestPosition === "higher_variable" || profile.interestPosition === "variable") {
            tradeoffs.push("Rates are higher than public sector banks; best suited for short-term liquidity.");
        }
    }

    // Fallbacks if list is sparse
    if (reasons.length === 0 && lender.reasons) {
        reasons.push(...lender.reasons.slice(0, 2));
    }
    if (tradeoffs.length === 0 && lender.tradeoffs) {
        tradeoffs.push(...lender.tradeoffs.slice(0, 1));
    }
    if (tradeoffs.length === 0) {
        tradeoffs.push("Final sanctioned rate and per-gram appraisal depend on gold purity (22K/24K) and scheme selected.");
    }

    // Deduplicate any accidental duplicate strings
    const uniqueReasons = [...new Set(reasons)];
    const uniqueTradeoffs = [...new Set(tradeoffs)];

    return {
        reasons: uniqueReasons.slice(0, 3),
        tradeoffs: uniqueTradeoffs.slice(0, 2)
    };
}

function getMatchHeadline(lender, index, answers) {
    const isSwitching = answers && answers.purpose === "Switch an existing gold loan";

    if (index === 0) {
        return isSwitching ? "Top recommendation for loan takeover & maximum savings" : "Strongest overall match based on your preferences";
    }
    if (index === 1) {
        return isSwitching ? "Fastest assisted balance-transfer option" : "Strong secondary option with high per-gram valuation";
    }
    return "Reliable alternative for rate and tenure comparison";
}

/* ======================================================
   RECOMMENDATION CARD
====================================================== */

function renderRecommendationCard(lender, index) {
    const medals = ["🥇", "🥈", "🥉"];
    const explanation = getRecommendationExplanation(lender, index);
    const userArea = state.leadData.area || "Surat";
    const isSwitching = state.answers.purpose === "Switch an existing gold loan";

    // Dynamic rate & speed mapping
    let rateText = "8.75% – 9.50% p.a.";
    let speedText = "📅 1 – 2 Days";

    if (lender.id === "sbi") {
        rateText = "8.75% – 9.50% p.a.";
        speedText = isSwitching ? "⏱️ 2 – 3 Days (Takeover)" : "📅 1 – 2 Days";
    } else if (lender.id === "bob") {
        rateText = "8.80% – 9.50% p.a.";
        speedText = isSwitching ? "⏱️ 2 – 3 Days (Takeover)" : "📅 1 – 2 Days";
    } else if (lender.id === "canara") {
        rateText = "8.75% – 10.25% p.a.";
        speedText = isSwitching ? "⏱️ 2 – 4 Days (Takeover)" : "⚡ Same Day (Swarna)";
    } else if (lender.id === "hdfc") {
        rateText = "9.00% – 16.00% p.a.";
        speedText = isSwitching ? "⏱️ 24 – 48 Hours" : "⏱️ Same Day";
    } else if (lender.id === "muthoot") {
        rateText = "11.90% – 16.00% p.a.";
        speedText = "⚡ ~30 Minutes";
    } else if (lender.id === "manappuram") {
        rateText = "11.90% – 16.00% p.a.";
        speedText = "⚡ ~30 Minutes";
    } else if (lender.id === "iifl") {
        rateText = "10.50% – 15.50% p.a.";
        speedText = isSwitching ? "⏱️ 24 – 48 Hours (Assisted)" : "⏱️ ~1 Hour";
    }

    return `
        <div class="recommendation-card" style="background:#ffffff; border:1.5px solid #e2e8f0; border-radius:12px; padding:18px; margin-bottom:20px; box-shadow:0 3px 10px rgba(0,0,0,0.03);">
            <h2 style="font-size:1.25rem; font-weight:800; color:#0f172a; margin-top:0; margin-bottom:4px;">
                ${medals[index]} ${lender.name}
            </h2>

            <p class="recommendation-summary" style="font-size:0.9rem; font-weight:600; color:#2563eb; margin-bottom:14px;">
                ${getMatchHeadline(lender, index, state.answers)}
            </p>

            <!-- Structured Metrics Grid -->
            <div class="match-details-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:#f8fafc; padding:12px; border-radius:8px; margin-bottom:16px;">
                <div class="match-detail-item">
                    <span class="detail-label" style="display:block; font-size:0.75rem; color:#64748b; text-transform:uppercase;">Indicative Rate</span>
                    <span class="detail-value rate-green" style="font-weight:700; color:#166534; font-size:0.95rem;">${rateText}</span>
                </div>
                <div class="match-detail-item">
                    <span class="detail-label" style="display:block; font-size:0.75rem; color:#64748b; text-transform:uppercase;">${isSwitching ? 'Takeover Speed' : 'Disbursal Speed'}</span>
                    <span class="detail-value" style="font-weight:600; color:#1e293b; font-size:0.95rem;">${speedText}</span>
                </div>
                <div class="match-detail-item">
                    <span class="detail-label" style="display:block; font-size:0.75rem; color:#64748b; text-transform:uppercase;">Max Valuation</span>
                    <span class="detail-value" style="font-weight:600; color:#1e293b; font-size:0.95rem;">Up to 75% LTV</span>
                </div>
                <div class="match-detail-item">
                    <span class="detail-label" style="display:block; font-size:0.75rem; color:#64748b; text-transform:uppercase;">Available Near</span>
                    <span class="detail-value" style="font-weight:600; color:#1e293b; font-size:0.95rem;">${userArea.split('/')[0].trim()}</span>
                </div>
            </div>

            <h3 style="font-size:0.95rem; font-weight:700; color:#0f172a; margin-bottom:8px;">Why this matches you</h3>
            <ul style="margin:0 0 16px 0; padding-left:20px; font-size:0.88rem; color:#334155; line-height:1.5;">
                ${explanation.reasons.map(reason => `<li style="margin-bottom:6px;">${reason}</li>`).join("")}
            </ul>

            <h3 style="font-size:0.95rem; font-weight:700; color:#0f172a; margin-bottom:8px;">Things to know</h3>
            <ul style="margin:0; padding-left:20px; font-size:0.88rem; color:#64748b; line-height:1.5;">
                ${explanation.tradeoffs.map(tradeoff => `<li style="margin-bottom:6px;">${tradeoff}</li>`).join("")}
            </ul>
        </div>
    `;
}