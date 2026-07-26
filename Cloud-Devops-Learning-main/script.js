const completeButtons = document.querySelectorAll(".complete-button");
const completedTopicsElement = document.getElementById("completedTopics");
const progressPercentageElement = document.getElementById("progressPercentage");
const progressTextElement = document.getElementById("progressText");
const progressBarElement = document.getElementById("progressBar");
const progressContainerElement = document.querySelector(".progress-container");
const themeButton = document.getElementById("themeButton");

let completedTopics =
    JSON.parse(localStorage.getItem("completedTopics")) || [];

function updateProgress() {
    const totalTopics = completeButtons.length;
    const completedCount = completedTopics.length;
    const percentage = Math.round((completedCount / totalTopics) * 100);

    completedTopicsElement.textContent = completedCount;
    progressPercentageElement.textContent = `${percentage}%`;
    progressTextElement.textContent =
        `${completedCount} of ${totalTopics} topics completed`;
    progressBarElement.style.width = `${percentage}%`;
    progressContainerElement.setAttribute("aria-valuenow", percentage);
}

function loadProgress() {
    document.querySelectorAll(".topic-card").forEach((card) => {
        const topicName = card.dataset.topic;
        const button = card.querySelector(".complete-button");

        if (completedTopics.includes(topicName)) {
            card.classList.add("completed");
            button.textContent = "✓ Completed";
        }
    });

    updateProgress();
}

completeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".topic-card");
        const topicName = card.dataset.topic;

        if (completedTopics.includes(topicName)) {
            completedTopics = completedTopics.filter(
                (topic) => topic !== topicName
            );

            card.classList.remove("completed");
            button.textContent = "Mark Complete";
        } else {
            completedTopics.push(topicName);

            card.classList.add("completed");
            button.textContent = "✓ Completed";
        }

        localStorage.setItem(
            "completedTopics",
            JSON.stringify(completedTopics)
        );

        updateProgress();
    });
});

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

loadProgress();