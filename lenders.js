const lenders = [

    {
        id: "sbi",
        name: "State Bank of India",
        type: "Bank",

        summary:
            "Strong option for borrowers who want an established bank with competitive gold-loan pricing and multiple repayment structures.",

        profile: {
            interestPosition: "competitive",
            speed: "moderate",
            trust: "very_high",
            loanAmount: "high",

            repaymentOptions: [
                "Bullet repayment",
                "EMI",
                "Overdraft"
            ],

            monthlyInterest: false,
            overdraft: true,
            bullet: true,

            // Do not claim partial gold release.
            partialGoldRelease: false
        },

        reasons: [
            "Competitive gold-loan pricing",
            "Multiple repayment structures",
            "Strong nationwide banking presence"
        ],

        tradeoffs: [
            "Some alternatives may offer faster processing",
            "Product terms vary by gold-loan scheme"
        ]
    },


    {
        id: "canara",
        name: "Canara Bank",
        type: "Bank",

        summary:
            "Strong option when you want a competitive bank loan with options including Swarna Express, overdraft and monthly-interest products.",

        profile: {
            interestPosition: "competitive",
            speed: "fast",
            trust: "high",
            loanAmount: "high",

            repaymentOptions: [
                "Bullet repayment",
                "Monthly interest",
                "Overdraft"
            ],

            monthlyInterest: true,
            overdraft: true,
            bullet: true,

            partialGoldRelease: false
        },

        reasons: [
            "Competitive interest rates",
            "Swarna Express is designed for quick disbursement",
            "Multiple Swarna loan structures"
        ],

        tradeoffs: [
            "Specific terms depend on the Swarna product selected",
            "Branch processing may vary by location"
        ]
    },


    {
        id: "hdfc",
        name: "HDFC Bank",
        type: "Bank",

        summary:
            "Good private-bank option for borrowers who value convenience, speed and multiple repayment choices.",

        profile: {
            interestPosition: "mid_to_competitive",
            speed: "fast",
            trust: "high",
            loanAmount: "high",

            repaymentOptions: [
                "Monthly interest",
                "Bullet repayment",
                "Other product-specific options"
            ],

            monthlyInterest: true,
            overdraft: false,
            bullet: true,

            partialGoldRelease: false
        },

        reasons: [
            "Private-bank option with multiple repayment choices",
            "Monthly interest repayment is available",
            "HDFC publishes a quick branch turnaround for gold loans"
        ],

        tradeoffs: [
            "Interest rates can vary substantially by customer and product",
            "May not be the lowest-cost option for every borrower"
        ]
    },


    {
        id: "muthoot",
        name: "Muthoot Finance",
        type: "NBFC",

        summary:
            "Strong specialist option when processing convenience, multiple gold-loan schemes and flexible repayment are important.",

        profile: {
            interestPosition: "higher_variable",
            speed: "fast",
            trust: "high",
            loanAmount: "very_high",

            repaymentOptions: [
                "Monthly interest",
                "Prepayment",
                "Scheme-specific repayment"
            ],

            monthlyInterest: true,
            overdraft: false,
            bullet: false,

            // We have evidence for partial prepayment,
            // but NOT enough evidence to call this
            // "partial gold release".
            partialGoldRelease: true,

            partialPrepayment: true
        },

        reasons: [
            "Large range of gold-loan schemes",
            "Monthly-interest options are available",
            "Partial prepayment is supported"
        ],

        tradeoffs: [
            "Rates vary significantly by scheme",
            "The lowest advertised rate may depend on repayment conditions"
        ]
    },

    {
        id: "iifl",
        name: "IIFL Finance",
        type: "NBFC",

        summary:
            "Strong specialist option for borrowers who value quick processing, flexible gold-loan schemes and convenient repayment options.",

        profile: {
            interestPosition: "variable",
            speed: "fast",
            trust: "high",
            loanAmount: "very_high",

            repaymentOptions: [
                "Bullet repayment",
                "Monthly interest",
                "Scheme-specific repayment"
            ],

            monthlyInterest: true,
            overdraft: false,
            bullet: true,

            partialGoldRelease: true
        },

        reasons: [
            "Multiple gold-loan schemes",
            "Flexible repayment options",
            "Fast processing through a specialist gold-loan lender"
        ],

        tradeoffs: [
            "Interest rates vary by scheme and customer profile",
            "Final charges and repayment terms depend on the selected scheme"
        ]
    },
    {
        id: "bob",
        name: "Bank of Baroda",
        type: "Bank",

        summary:
            "Strong bank option for borrowers who value competitive pricing, high loan-to-value potential and relatively quick processing.",

        profile: {
            interestPosition: "competitive",
            speed: "fast",
            trust: "very_high",
            loanAmount: "high",

            repaymentOptions: [
                "Bullet repayment",
                "EMI",
                "Partial repayment"
            ],

            monthlyInterest: false,
            overdraft: false,
            bullet: true,

            partialGoldRelease: false,
            partialPrepayment: true
        },

        reasons: [
            "Competitive interest pricing",
            "Up to 80% LTV for applicable product/loan band",
            "Relatively quick processing based on current research"
        ],

        tradeoffs: [
            "No direct balance-transfer support in the researched product",
            "Partial repayment does not mean partial release of pledged gold",
            "Exact LTV, rate and processing time depend on the applicable product and application"
        ]
    },
    {
        id: "manappuram",
        name: "Manappuram Finance",
        type: "NBFC",

        summary:
            "Strong specialist option for borrowers who value flexible repayment structures and quick gold-loan processing.",

        profile: {
            interestPosition: "variable",
            speed: "fast",
            trust: "high",
            loanAmount: "very_high",

            repaymentOptions: [
                "Bullet repayment",
                "Monthly prompt-interest payment",
                "Scheme-specific repayment"
            ],

            monthlyInterest: true,
            overdraft: false,
            bullet: true,

            partialGoldRelease: true
        },

        reasons: [
            "Flexible repayment structures",
            "Monthly prompt-payment option",
            "Gold-loan specialist with large loan limits"
        ],

        tradeoffs: [
            "Advertised effective rates depend on prompt repayment conditions",
            "Actual rate and charges depend on the selected scheme"
        ]
    }

];
