document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  fetchLaunchData();
});

// Setup tab switching
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      // Add active class to the clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Fetch recent and upcoming launches from the Launch Library 2 API
async function fetchLaunchData() {
  const upcomingApiUrl = 'https://llapi.thespacedevs.com/2.2.0/launch/upcoming/?limit=5';
  const recentApiUrl = 'https://llapi.thespacedevs.com/2.2.0/launch/previous/?limit=5';

  try {
    // Fetch upcoming launches
    const upcomingResponse = await fetch(upcomingApiUrl);
    if (!upcomingResponse.ok) {
      throw new Error(`HTTP error! status: ${upcomingResponse.status}`);
    }
    const upcomingData = await upcomingResponse.json();
    const upcomingLaunches = upcomingData.results;

    // Fetch recent launches
    const recentResponse = await fetch(recentApiUrl);
    if (!recentResponse.ok) {
      throw new Error(`HTTP error! status: ${recentResponse.status}`);
    }
    const recentData = await recentResponse.json();
    const recentLaunches = recentData.results;

    // Display the launches
    displayLaunchData(recentLaunches, 'recent');
    displayLaunchData(upcomingLaunches, 'upcoming');
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
      <p><strong>NET:</strong> ${new Date(launch.net).toLocaleString()}</p>
      <p><strong>Rocket:</strong> ${launch.rocket.configuration.name}</p>
      <p><strong>Launch Pad:</strong> ${launch.pad.name}</p>
    `;
    container.appendChild(launchElement);
  });
}