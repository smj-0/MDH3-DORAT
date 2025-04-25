document.getElementById('actionButton').addEventListener('click', () => {
  alert('Button clicked!');
});

// Fetch recent, upcoming, and all launches from the SpaceX API
async function fetchLaunchData() {
  const upcomingApiUrl = 'https://api.spacexdata.com/v4/launches/upcoming';
  const recentApiUrl = 'https://api.spacexdata.com/v4/launches/past';
  const allApiUrl = 'https://api.spacexdata.com/v4/launches';

  try {
    // Fetch upcoming launches
    const upcomingResponse = await fetch(upcomingApiUrl);
    if (!upcomingResponse.ok) {
      throw new Error(`HTTP error! status: ${upcomingResponse.status}`);
    }
    const upcomingData = await upcomingResponse.json();
    const upcomingLaunches = upcomingData.slice(0, 5); // Get the next 5 launches

    // Fetch recent launches
    const recentResponse = await fetch(recentApiUrl);
    if (!recentResponse.ok) {
      throw new Error(`HTTP error! status: ${recentResponse.status}`);
    }
    const recentData = await recentResponse.json();
    const recentLaunches = recentData.slice(-5); // Get the last 5 launches

    // Fetch all launches
    const allResponse = await fetch(allApiUrl);
    if (!allResponse.ok) {
      throw new Error(`HTTP error! status: ${allResponse.status}`);
    }
    const allData = await allResponse.json();

    // Display the launches
    displayLaunchData(recentLaunches, 'recent');
    displayLaunchData(upcomingLaunches, 'upcoming');
    displayLaunchData(allData, 'all');
  } catch (error) {
    console.error('Error fetching launch data:', error);
    document.getElementById('columns').innerHTML = `<p>Failed to load launch data: ${error.message}</p>`;
  }
}

// Display launch data in the appropriate column
function displayLaunchData(launches, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear existing content

  launches.forEach((launch) => {
    const launchElement = document.createElement('div');
    launchElement.className = 'launch';
    launchElement.innerHTML = `
      <h3>${launch.name}</h3>
      <p><strong>NET:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
      <p><strong>Rocket:</strong> ${launch.rocket}</p>
      <p><strong>Launch Pad:</strong> ${launch.launchpad}</p>
    `;
    container.appendChild(launchElement);
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Create containers for upcoming and recent launches
  const appContainer = document.getElementById('launches');
  appContainer.innerHTML = `
    <div id="recent" class="half-screen"></div>
    <div id="upcoming" class="half-screen"></div>
  `;

  // Theme buttons
  const spacexButton = document.getElementById('spacex-theme');
  const spaceforceButton = document.getElementById('spaceforce-theme');
  const californiaButton = document.getElementById('california-theme');

  // Add event listeners to change themes
  spacexButton.addEventListener('click', () => {
    document.body.className = 'spacex';
  });

  spaceforceButton.addEventListener('click', () => {
    document.body.className = 'spaceforce';
  });

  californiaButton.addEventListener('click', () => {
    document.body.className = 'california';
  });

  fetchLaunchData();
});