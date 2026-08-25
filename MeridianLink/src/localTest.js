// This script is used to load the MeridianLink app tracker in a local test environment.
// It checks if the appTracker is already loaded to avoid duplicate loading.
// If not loaded, it initializes the hubspot tracking code script and the app tracking script.
// HubSpot Portal ID: 48766625
// HubSpot Tracking Code: <script type="text/javascript" id="hs-script-loader" async defer src="https://js.hs-scripts.com/{{HubSpot Portal ID}}.js"></script>
// App Tracking Code: <script id="gha-ml-script" async defer src="https://js.ghagency.com/hubfs/scripts/{{HubSpot Portal ID}}/ml.js" type="text/javascript"></script>

function loadAppTracker() {
  if (window.appTracker) {
    return;
  }

    // Load HubSpot tracking code
    const hubspotScript = document.createElement('script');
    hubspotScript.type = 'text/javascript';
    hubspotScript.id = 'hs-script-loader';
    hubspotScript.async = true;
    hubspotScript.defer = true;
    hubspotScript.src = 'https://js.hs-scripts.com/48766625.js';
    
    document.head.appendChild(hubspotScript);
    // Load MeridianLink app tracking code
    const appScript = document.createElement('script');
    appScript.id = 'gha-ml-script';
    appScript.async = true;
    appScript.defer = true;
    appScript.src = 'https://js.ghagency.com/hubfs/scripts/48766625/pos.js';
    appScript.type = 'text/javascript';
    document.head.appendChild(appScript);
}