
// ===============================
// EDUCATION PLATFORM
// ===============================

const courses = [
    {
        id: 1,
        title: "HTML & CSS Masterclass",
        category: "programming",
        categoryName: "Dasturlash",
        icon: "🌐",
        color: "linear-gradient(135deg,#e65c32,#ffae52)",
        lessons: 24,
        level: "Boshlang'ich",
        price: "Bepul",
        description: "Noldan boshlab professional va zamonaviy web saytlar yaratishni o'rganing."
    },
    {
        id: 2,
        title: "JavaScript Professional",
        category: "programming",
        categoryName: "Dasturlash",
        icon: "⚡",
        color: "linear-gradient(135deg,#d7a927,#e9d45c)",
        lessons: 36,
        level: "O'rta",
        price: "149 000 so'm",
        description: "JavaScript yordamida interaktiv va kuchli web ilovalar yarating."
    },
    {
        id: 3,
        title: "Python Development",
        category: "programming",
        categoryName: "Dasturlash",
        icon: "🐍",
        color: "linear-gradient(135deg,#2767a9,#48b9cb)",
        lessons: 42,
        level: "Boshlang'ich",
        price: "199 000 so'm",
        description: "Python dasturlash tilini o'rganing va real loyihalar yarating."
    },
    {
        id: 4,
        title: "UI/UX Design",
        category: "design",
        categoryName: "Dizayn",
        icon: "🎨",
        color: "linear-gradient(135deg,#7547d9,#c17bff)",
        lessons: 28,
        level: "Boshlang'ich",
        price: "129 000 so'm",
        description: "Figma va zamonaviy dizayn qoidalari bilan professional dizayner bo'ling."
    },
    {
        id: 5,
        title: "Graphic Design Pro",
        category: "design",
        categoryName: "Dizayn",
        icon: "🖌️",
        color: "linear-gradient(135deg,#d94b88,#ff9eaf)",
        lessons: 32,
        level: "O'rta",
        price: "159 000 so'm",
        description: "Logotip, brending, reklama va grafik dizayn sirlarini o'rganing."
    },
    {
        id: 6,
        title: "Digital Marketing",
        category: "business",
        categoryName: "Biznes",
        icon: "📈",
        color: "linear-gradient(135deg,#168d75,#50d6a4)",
        lessons: 20,
        level: "Boshlang'ich",
        price: "119 000 so'm",
        description: "Marketing, SMM va internet orqali biznes rivojlantirishni o'rganing."
    },
    {
        id: 7,
        title: "Business Startup",
        category: "business",
        categoryName: "Biznes",
        icon: "🚀",
        color: "linear-gradient(135deg,#3455c9,#7195ff)",
        lessons: 18,
        level: "O'rta",
        price: "179 000 so'm",
        description: "O'z biznesingizni yaratish va rivojlantirish asoslari."
    },
    {
        id: 8,
        title: "Advanced Web Development",
        category: "programming",
        categoryName: "Dasturlash",
        icon: "💻",
        color: "linear-gradient(135deg,#323d88,#766bdb)",
        lessons: 48,
        level: "Yuqori",
        price: "249 000 so'm",
        description: "Murakkab web loyihalar va professional frontend ko'nikmalari."
    },
    {
        id: 9,
        title: "Creative Photoshop",
        category: "design",
        categoryName: "Dizayn",
        icon: "✨",
        color: "linear-gradient(135deg,#126caa,#43b9d9)",
        lessons: 25,
        level: "O'rta",
        price: "139 000 so'm",
        description: "Adobe Photoshop orqali kreativ va professional ishlar yarating."
    }
];

// ===============================
// LOCAL STORAGE
// ===============================

let enrolledCourses = JSON.parse(
    localStorage.getItem("eduCourses") || "[]"
);

let completedCourses = JSON.parse(
    localStorage.getItem("eduCompleted") || "[]"
);

let totalPoints = Number(localStorage.getItem("eduPoints") || 0);

function saveData() {
    localStorage.setItem("eduCourses", JSON.stringify(enrolledCourses));
    localStorage.setItem("eduCompleted", JSON.stringify(completedCourses));
    localStorage.setItem("eduPoints", totalPoints);
}

// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ===============================
// COURSE RENDER
// ===============================

const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "all";

function renderCourses() {
    const search = searchInput.value.toLowerCase().trim();

    const filtered = courses.filter(course => {
        const matchesCategory =
            currentFilter === "all" ||
            course.category === currentFilter;

        const matchesSearch =
            course.title.toLowerCase().includes(search) ||
            course.categoryName.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    courseGrid.innerHTML = "";

    emptyMessage.style.display =
        filtered.length === 0 ? "block" : "none";

    filtered.forEach(course => {
        const isEnrolled = enrolledCourses.includes(course.id);

        const card = document.createElement("article");
        card.className = "course-card";

        card.innerHTML = `
            <div class="course-image" style="background:${course.color}">
                <span>${course.categoryName}</span>
                ${course.icon}
            </div>

            <div class="course-info">
                <div class="course-meta">
                    <span>📚 ${course.lessons} dars</span>
                    <span>⭐ ${course.level}</span>
                </div>

                <h3>${course.title}</h3>

                <p>${course.description}</p>

                <div class="course-bottom">
                    <span class="course-price">${course.price}</span>
                    <button class="course-open" data-id="${course.id}">
                        ${isEnrolled ? "Davom etish →" : "Ko'rish →"}
                    </button>
                </div>
            </div>
        `;

        courseGrid.appendChild(card);
    });
}

renderCourses();

// Search

searchInput.addEventListener("input", renderCourses);

// Filter

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter.active")
            ?.classList.remove("active");

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderCourses();
    });
});

// ===============================
// COURSE MODAL
// ===============================

const modal = document.getElementById("courseModal");
const modalBody = document.getElementById("modalBody");

function openCourse(id) {
    const course = courses.find(item => item.id === id);

    if (!course) return;

    const isEnrolled = enrolledCourses.includes(id);
    const isCompleted = completedCourses.includes(id);

    modalBody.innerHTML = `
        <div style="
            background:${course.color};
            padding:35px;
            border-radius:14px;
            text-align:center;
            font-size:65px;
        ">${course.icon}</div>

        <p style="margin-top:20px;color:var(--accent2)">
            ${course.categoryName}
        </p>

        <h2>${course.title}</h2>

        <p>${course.description}</p>

        <p style="margin-top:15px">
            📚 ${course.lessons} ta dars
            <br><br>
            🎯 Daraja: ${course.level}
            <br><br>
            💰 Narxi: ${course.price}
        </p>

        ${
            isCompleted
            ? `<button class="enroll" disabled>Tugatilgan ✓</button>`
            : isEnrolled
            ? `<button class="enroll" id="modalComplete">Kursni tugatish ✓</button>`
            : `<button class="enroll" id="modalEnroll">Kursga qo'shilish ↗</button>`
        }
    `;

    modal.classList.add("show");

    document.getElementById("modalEnroll")?.addEventListener("click", () => {
        enrollCourse(id);
        modal.classList.remove("show");
    });

    document.getElementById("modalComplete")?.addEventListener("click", () => {
        completeCourse(id);
        modal.classList.remove("show");
    });
}

courseGrid.addEventListener("click", event => {
    const button = event.target.closest(".course-open");

    if (button) {
        openCourse(Number(button.dataset.id));
    }
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// ===============================
// ENROLL COURSE
// ===============================

function enrollCourse(id) {
    if (enrolledCourses.includes(id)) {
        showToast("Siz bu kursga allaqachon qo'shilgansiz!");
        return;
    }

    enrolledCourses.push(id);

    saveData();
    renderCourses();
    renderDashboard();

    showToast("Kurs muvaffaqiyatli qo'shildi! 🎉");
}

// ===============================
// COMPLETE COURSE
// ===============================

function completeCourse(id) {
    if (!enrolledCourses.includes(id)) return;

    if (completedCourses.includes(id)) return;

    completedCourses.push(id);
    totalPoints += 100;

    saveData();
    renderCourses();
    renderDashboard();

    showToast("Tabriklaymiz! 100 ball qo'lga kiritdingiz 🏆");
}

// ===============================
// STUDENT DASHBOARD
// ===============================

function renderDashboard() {
    document.getElementById("enrolledCount").textContent =
        enrolledCourses.length;

    document.getElementById("completedCount").textContent =
        completedCourses.length;

    document.getElementById("totalPoints").textContent =
        totalPoints;

    const container = document.getElementById("myCourses");

    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="no-courses">
                <span>📖</span>
                <h3>Hali kurs tanlamagansiz</h3>
                <p>Kurslardan birini tanlang va o'rganishni boshlang.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    enrolledCourses.forEach(id => {
        const course = courses.find(item => item.id === id);

        if (!course) return;

        const completed = completedCourses.includes(id);

        const item = document.createElement("div");
        item.className = "my-course-item";

        item.innerHTML = `
            <span class="my-course-icon">${course.icon}</span>

            <div>
                <strong>${course.title}</strong>
                <p>${completed ? "Tugatilgan ✓" : "O'rganish davom etmoqda"}</p>
            </div>

            <button data-id="${id}" ${completed ? "disabled" : ""}>
                ${completed ? "Bajarildi" : "Tugatish"}
            </button>
        `;

        container.appendChild(item);
    });
}

document.getElementById("myCourses").addEventListener("click", event => {
    const button = event.target.closest("button");

    if (button && button.dataset.id) {
        completeCourse(Number(button.dataset.id));
    }
});

renderDashboard();

// ===============================
// QUIZ SYSTEM
// ===============================

const questions = [
    {
        question: "HTML nima uchun ishlatiladi?",
        answers: [
            "Web sahifa tuzilishini yaratish",
            "Rasm chizish",
            "Video montaj qilish",
            "Operatsion tizim yaratish"
        ],
        correct: 0
    },
    {
        question: "CSS ning asosiy vazifasi nima?",
        answers: [
            "Ma'lumot saqlash",
            "Web sahifani bezash",
            "Server yaratish",
            "Matn tarjima qilish"
        ],
        correct: 1
    },
    {
        question: "JavaScript qanday til?",
        answers: [
            "Faqat dizayn tili",
            "Dasturlash tili",
            "Rasm formati",
            "Operatsion tizim"
        ],
        correct: 1
    },
    {
        question: "Python da ekranga ma'lumot chiqarish?",
        answers: [
            "print()",
            "show()",
            "writeHTML()",
            "displayCSS()"
        ],
        correct: 0
    },
    {
        question: "Figma asosan nima uchun ishlatiladi?",
        answers: [
            "Dastur o'rnatish",
            "UI/UX dizayn yaratish",
            "Musiqa tinglash",
            "Ma'lumotlar bazasi"
        ],
        correct: 1
    }
];

let questionIndex = 0;
let quizScore = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");
const feedback = document.getElementById("quizFeedback");

function renderQuestion() {
    const question = questions[questionIndex];

    answered = false;

    questionElement.textContent = question.question;

    document.getElementById("questionNumber").textContent =
        `${questionIndex + 1} / ${questions.length}`;

    document.getElementById("quizProgress").style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    feedback.textContent = "To'g'ri javobni tanlang";
    nextButton.disabled = true;
    nextButton.textContent =
        questionIndex === questions.length - 1 ? "Natijani ko'rish" : "Keyingi →";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersElement.appendChild(button);
    });
}

function selectAnswer(index) {
    if (answered) return;

    answered = true;

    const correct = questions[questionIndex].correct;
    const buttons = answersElement.querySelectorAll(".answer");

    buttons.forEach((button, i) => {
        button.disabled = true;

        if (i === correct) {
            button.classList.add("correct");
        }

        if (i === index && index !== correct) {
            button.classList.add("wrong");
        }
    });

    if (index === correct) {
        quizScore++;
        feedback.textContent = "Ajoyib! To'g'ri javob ✓";
    } else {
        feedback.textContent = "Noto'g'ri. To'g'ri javob belgilandi.";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (questionIndex < questions.length - 1) {
        questionIndex++;
        renderQuestion();
    } else {
        showQuizResult();
    }
});

function showQuizResult() {
    const earnedPoints = quizScore * 10;

    totalPoints += earnedPoints;
    saveData();
    renderDashboard();

    questionElement.textContent = "Test yakunlandi! 🎉";

    answersElement.innerHTML = `
        <div style="text-align:center;padding:25px">
            <div style="font-size:55px">🏆</div>
            <h2 style="font-size:35px;margin:15px">${quizScore}/${questions.length}</h2>
            <p style="color:var(--muted)">Siz ${earnedPoints} ball to'pladingiz!</p>
        </div>
    `;

    feedback.textContent = "Natijangiz saqlandi!";
    nextButton.disabled = false;
    nextButton.textContent = "Qayta boshlash";

    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    questionIndex = 0;
    quizScore = 0;

    nextButton.onclick = null;

    renderQuestion();
}

renderQuestion();

// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("eduTheme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeBtn.textContent = isLight ? "☀" : "☾";

    localStorage.setItem(
        "eduTheme",
        isLight ? "light" : "dark"
    );
});

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// ===============================
// LOGIN DEMO
// ===============================

document.getElementById("loginBtn").addEventListener("click", () => {
    const name = prompt("Ismingizni kiriting:");

    if (name && name.trim()) {
        localStorage.setItem("eduUser", name.trim());

        document.getElementById("loginBtn").textContent =
            name.trim().slice(0, 12);

        showToast(`Xush kelibsiz, ${name.trim()}! 👋`);
    }
});

const savedUser = localStorage.getItem("eduUser");

if (savedUser) {
    document.getElementById("loginBtn").textContent =
        savedUser.slice(0, 12);
}

// ===============================
// CONTACT FORM
// ===============================

document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        showToast("Barcha maydonlarni to'ldiring!");
        return;
    }

    document.getElementById("formMessage").textContent =
        "Xabaringiz qabul qilindi! Demo rejimda yuborish serverga ulanmagan.";

    event.target.reset();
    showToast("Forma muvaffaqiyatli tekshirildi!");
});

// ===============================
// PAGE LOADER
// ===============================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 500);
});
