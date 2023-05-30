async function fetchContestsFromCodeforces() {
    try {
        // Send a GET request to the Codeforces API to fetch contest data
        const response = await fetch("https://codeforces.com/api/contest.list");
        // Extract the JSON data from the response
        const data = await response.json();
        // Store the contests data in a variable
        const contests = data.result;

        // Filter out only future contests by comparing their startTimeSeconds to the current time
        const futureContests = contests.filter(
            (contest) => contest.startTimeSeconds > Math.floor(Date.now() / 1000)
        );

        // Sort the futureContests array based on the startTimeSeconds property in ascending order
        futureContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

        // Iterate over each future contest and call the displayCodeforcesContest function to render them
        futureContests.forEach((contest) =>
            displayCodeforcesContest(contest)
        );
    } catch (error) {
        // Log an error message if there is any issue with fetching the contests
        console.error("Error fetching Codeforces contests:", error);
    }
}


function displayCodeforcesContest(contest) {
    // Find the HTML element with the id "contestItems"
    const contestItems = document.getElementById("contestItems");
    // Create a new list item element
    const listItem = document.createElement("li");
    // Create a new anchor element for the contest link
    const link = document.createElement("a");
    // Set the href attribute of the link to the contest URL
    link.href = `https://codeforces.com/contest/${contest.id}`;

    // Extract the contest type from the contest name
    const contestType = contest.name.split(" ")[0];

    // Format the contest start time and date
    const startTime = new Date(contest.startTimeSeconds * 1000);
    const startTimeString = startTime.toLocaleString();

    // Set the link text to include the contest type, contest name, and start time
    link.innerText = ` ${contest.name} (Starts at ${startTimeString})`;

    // Append the link to the list item
    listItem.appendChild(link);
    // Append the list item to the "contestItems" element
    contestItems.appendChild(listItem);
}

// Call the fetchContestsFromCodeforces function to start fetching and displaying Codeforces contests
fetchContestsFromCodeforces();
