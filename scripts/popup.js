document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the checkbox element
  const toggleBowsCheckbox = document.getElementById("toggleBowsCheckbox");

  // Retrieve the current state of the checkbox from Chrome storage
  chrome.storage.sync.get('toggleBows', function(data) {
    // If the toggleBows value is found in storage, update the checkbox state
    if (typeof data.toggleBows !== 'undefined') {
      toggleBowsCheckbox.checked = data.toggleBows;
    }
  });

  // Add event listener to the checkbox
  toggleBowsCheckbox.addEventListener("change", function() {
    // Save the state of the checkbox to Chrome storage
    chrome.storage.sync.set({toggleBows: this.checked});
  });
});
