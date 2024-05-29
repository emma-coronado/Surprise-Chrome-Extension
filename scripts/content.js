// Function to add coquette bows
function addCoquetteBows(element) {
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("images/bow.png"); 
  const fontSize = parseFloat(window.getComputedStyle(element).getPropertyValue("font-size"));
  const bowSize = Math.min(fontSize * 1.3, 50); // Adjust the scaling factor and maximum size as needed
  const bowMargin = fontSize * 0.1; // Adjust the margin as needed
  img.style.width = bowSize + "px"; // Set the size dynamically
  img.style.height = "auto";
  img.style.marginRight = bowMargin + "px"; // Adjust the spacing dynamically
  img.classList.add("coquette-bow"); // Add a class to the bow image
  element.insertBefore(img, element.firstChild);
}

// Select all headings with text larger than a certain size (in pixels)
let headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(heading => {
  const computedStyle = window.getComputedStyle(heading);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  return fontSize > 16; // Adjust this value as needed
});

// Add bows to headings
function addBowsToHeadings() {
  headings.forEach(addCoquetteBows);
}

// Remove bows from headings
function removeBowsFromHeadings() {
  const bows = document.querySelectorAll(".coquette-bow");
  bows.forEach(bow => bow.remove());
}

// Initial check of the checkbox state
chrome.storage.sync.get('toggleBows', function(data) {
  if (data.toggleBows === false) {
    removeBowsFromHeadings();
  } else {
    addBowsToHeadings();
  }
});

// Listen for changes in the checkbox state
document.getElementById("toggleBowsCheckbox").addEventListener("change", function() {
  if (this.checked) {
    addBowsToHeadings();
    chrome.storage.sync.set({toggleBows: true});
  } else {
    removeBowsFromHeadings();
    chrome.storage.sync.set({toggleBows: false});
  }
});
