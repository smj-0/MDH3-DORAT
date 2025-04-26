<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Space Force Launches</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* General body styling */
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #0b3d91, #1c1e26); /* Space Force dark blue gradient */
      color: #ffffff; /* White text for contrast */
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* App container */
    #app {
      text-align: center;
      width: 90%;
      max-width: 1200px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
    }

    /* Title styling */
    h1 {
      font-size: 36px;
      margin-bottom: 20px;
      color: #00d1ff; /* Bright cyan for futuristic feel */
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    /* Section titles */
    #upcoming h2 {
      font-size: 24px;
      margin-bottom: 15px;
      color: #ffffff;
      border-bottom: 2px solid #00d1ff; /* Cyan accent line */
      padding-bottom: 5px;
    }

    /* Launch container */
    .launch-container {
      padding: 20px;
      background: rgba(255, 255, 255, 0.05); /* Slightly transparent background */
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow */
      overflow-y: auto;
      max-height: 70vh;
    }

    /* Launch item styling */
    .launch {
      border-bottom: 1px solid #2d3748; /* Subtle divider */
      padding: 15px 0;
    }

    .launch:last-child {
      border-bottom: none;
    }

    .launch h3 {
      font-size: 20px;
      margin: 0 0 5px;
      color: #00d1ff; /* Bright cyan for launch names */
    }

    .launch p {
      margin: 5px 0;
      font-size: 16px;
      color: #d1d5db; /* Neutral gray for secondary text */
    }

    /* Scrollbar styling */
    .launch-container::-webkit-scrollbar {
      width: 8px;
    }

    .launch-container::-webkit-scrollbar-thumb {
      background-color: #00d1ff; /* Bright cyan scrollbar */
      border-radius: 4px;
    }

    .launch-container::-webkit-scrollbar-track {
      background-color: #1c1e26; /* Dark track */
    }
  </style>
</head>
<body>
  <div id="app">
    <h1>🚀 Space Force Launches</h1>
    <div id="upcoming" class="launch-container">
      <h2>Upcoming Launches</h2>
      <p>Loading...</p>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>

document.addEventListener('DOMContentLoaded', () => {
  fetchUpcomingLaunches();
});

// Fetch upcoming launches from the RocketLaunch.Live API
async function fetchUpcomingLaunches() {
  const upcomingApiUrl = 'https://fdo.rocketlaunch.live/json/launches/next/5';

  try {
    // Fetch upcoming launches
    const response = await fetch(upcomingApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const upcomingLaunches = data.result;

    // Display the launches
    displayLaunchData(upcomingLaunches);
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    document.getElementById('upcoming').innerHTML = `<p>Failed to load launch data: ${error.message}</p>`;
  }
}

// Display upcoming launch data
function displayLaunchData(launches) {
  const container = document.getElementById('upcoming');
  container.innerHTML = ''; // Clear existing content

  launches.forEach((launch) => {
    const launchElement = document.createElement('div');
    launchElement.className = 'launch';
    launchElement.innerHTML = `
      <h3>${launch.name}</h3>
      <p><strong>NET:</strong> ${new Date(launch.sort_date * 1000).toLocaleString()}</p>
      <p><strong>Rocket:</strong> ${launch.vehicle.name}</p>
      <p><strong>Launch Pad:</strong> ${launch.pad.location.name}</p>
    `;
    container.appendChild(launchElement);
  });
}