async function fetchContestsFromLeetCode() {
    try {
        // Send a GET request to the LeetCode API to fetch contest data
        const response = await fetch("https://kontests.net/api/v1/leet_code");
        // Extract the JSON data from the response
        const data = await response.json();
        // Store the contests data in a variable
        const contests = data;

        // Filter out only future contests by comparing their start_time to the current time
        const futureContests = contests.filter(
            (contest) => new Date(contest.start_time) > new Date()
        );

        // Iterate over each future contest and call the displayLeetCodeContest function to render them
        futureContests.forEach((contest) =>
            displayLeetCodeContest(contest)
        );
    } catch (error) {
        // Log an error message if there is any issue with fetching the contests
        console.error("Error fetching LeetCode contests:", error);
    }
}

function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
    };
    return date.toLocaleString(undefined, options);
}

function displayLeetCodeContest(contest) {
    // Find the HTML element with the id "contestItems"
    const contestItems = document.getElementById("contestItems");
    // Create a new list item element
    const listItem = document.createElement("li");
    // Create a new anchor element for the contest link
    const link = document.createElement("a");
    // Set the href attribute of the link to the contest URL
    link.href = contest.url;

    // Extract the contest number from the URL by splitting it and taking the last part
    const contNum = contest.url.split("/").pop();

    // Format the start time and date
    const startTime = formatDateTime(contest.start_time);

    // Set the link text to include the contest number and the formatted start time
    link.innerText = `${contNum} => ${startTime}`;

    // Append the link to the list item
    listItem.appendChild(link);
    // Append the list item to the "contestItems" element
    contestItems.appendChild(listItem);
}

// Call the fetchContestsFromLeetCode function to start fetching and displaying LeetCode contests
fetchContestsFromLeetCode();
