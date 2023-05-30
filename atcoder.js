async function fetchContestsFromAtCoder() {
    try {
        // Send a GET request to the AtCoder API to fetch contest data
        const response = await fetch("https://kontests.net/api/v1/at_coder");
        // Extract the JSON data from the response
        const data = await response.json();
        // Store the contests data in a variable
        const contests = data;

        // Filter out only future contests by comparing their start_time to the current time
        const futureContests = contests.filter(
            (contest) => new Date(contest.start_time) > new Date()
        );

        // Iterate over each future contest and call the displayAtCoderContest function to render them
        futureContests.forEach((contest) =>
            displayAtCoderContest(contest)
        );
    } catch (error) {
        // Log an error message if there is any issue with fetching the contests
        console.error("Error fetching AtCoder contests:", error);
    }
}

function displayAtCoderContest(contest) {
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

    const str = `${contNum}`;
    let contestType = "";

    if (str[1] === 'b') {
        contestType = 'AtCoder Beginner Contest';
    } else if (str[1] === 'h') {
        contestType = 'AtCoder Heuristic Contest';
    } else if (str[1] === 'r') {
        contestType = 'AtCoder Regular Contest';
    }

    const startTime = new Date(contest.start_time);
    const startTimeString = startTime.toLocaleString();

    // Set the link text to include the contest type, contest number, and the formatted start time
    link.innerText = `${contestType} - ${str.substring(3, 6)} (Starts at ${startTimeString})`;

    // Append the link to the list item
    listItem.appendChild(link);
    // Append the list item to the "contestItems" element
    contestItems.appendChild(listItem);
}

// Call the fetchContestsFromAtCoder function to start fetching and displaying AtCoder contests
fetchContestsFromAtCoder();
