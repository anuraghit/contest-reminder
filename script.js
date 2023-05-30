
async function fetchContestsFromLeetCode() {
    try {
        const response = await fetch("https://kontests.net/api/v1/leet_code");
        const data = await response.json();
        const contests = data.contests;
        const futureContests = contests.filter(
            (contest) => contest.status === "Future"
        );
        futureContests.forEach((contest) =>
            displayContest("LeetCode", contest)
        );
    } catch (error) {
        console.error("Error fetching LeetCode contests:", error);
    }
}

async function fetchContestsFromCodeChef() {
    try {
        const response = await fetch("https://kontests.net/api/v1/code_chef");
        const data = await response.json();
        const contests = data.future_contests;
        contests.forEach((contest) =>
            displayContest("CodeChef", contest)
        );
    } catch (error) {
        console.error("Error fetching CodeChef contests:", error);
    }
}

async function displayContest(platform, contest) {
    const contestItems = document.getElementById("contestItems");
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = contest.url;
    link.innerText = `${contest.name} - ${formatDate(contest.startTimeSeconds)}`;

    listItem.appendChild(link);
    contestItems.appendChild(listItem);
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Fetch upcoming contests from different platforms
fetchContestsFromLeetCode();
fetchContestsFromCodeChef();