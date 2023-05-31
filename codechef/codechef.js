async function fetchContestsFromCodeChef() {
    try {
      // Send a GET request to the CodeChef API to fetch contest data
      const response = await fetch("https://www.codechef.com/api/list/contests/all");
      // Extract the JSON data from the response
      const data = await response.json();
      // Store the contests data in a variable
      const contests = data.future_contests;
  
      // Iterate over each contest and call the displayCodeChefContest function to render them
      contests.forEach((contest) => displayCodeChefContest(contest));
    } catch (error) {
      // Log an error message if there is any issue with fetching the contests
      console.error("Error fetching CodeChef contests:", error);
    }
  }
  
  function displayCodeChefContest(contest) {
    // Find the HTML element with the id "contestItems"
    const contestItems = document.getElementById("contestItems");
    // Create a new list item element
    const listItem = document.createElement("li");
    // Create a new anchor element for the contest link
    const link = document.createElement("a");
    
    // Extract the contest code, name, and start date from the contest object
    const contestCode = contest.contest_code;
    const contestName = contest.contest_name;
    const contestStartDate = contest.contest_start_date;
  
    // Set the href attribute of the link to the contest URL
    link.href = `https://www.codechef.com/${contestCode}`;
  
    // Set the link text to include the contest name and start date
    link.innerText = `${contestName} (${contestStartDate})`;
  
    // Append the link to the list item
    listItem.appendChild(link);
    // Append the list item to the "contestItems" element
    contestItems.appendChild(listItem);
  }
  
  // Call the fetchContestsFromCodeChef function to start fetching and displaying CodeChef contests
  fetchContestsFromCodeChef();
  