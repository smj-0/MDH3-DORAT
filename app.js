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