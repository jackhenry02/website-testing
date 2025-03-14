// Function to open a specific tab
function openTab(evt, tabName) {
    // Hide all tab content
    document.querySelectorAll(".tabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all tab buttons
    document.querySelectorAll(".tablinks").forEach(link => link.classList.remove("active"));

    // Show the clicked tab content and add "active" class to the clicked button
    document.getElementById(tabName).classList.add("active");
    document.getElementById(tabName).classList.add("sway-enter");
    evt.currentTarget.classList.add("active");

    // Close all dropdowns
    document.querySelectorAll(".dropdown-content").forEach(content => {
        content.classList.remove("show");
    });

    // Hide all subtab content
    document.querySelectorAll(".subtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Hide all II subtab content
    document.querySelectorAll(".IIsubtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all sub-tab buttons
    document.querySelectorAll(".subtablinks").forEach(link => link.classList.remove("active"));

    // Remove "active" class from all II sub-tab buttons
    document.querySelectorAll(".IIsubtablinks").forEach(link => link.classList.remove("active"));

    // Open the first sub-tab if there are any
    openFirstSubTab(tabName);
}

// Function to handle loading text animation
function animateLoadingText(element) {
    const text = element.textContent;
    element.textContent = '';
    text.split('').forEach((char, index) => {
        setTimeout(() => {
            element.textContent += char;
        }, 50 * index); // Adjust the delay as needed
    });
}

// Function to open the first sub-tab within a tab
function openFirstSubTab(tabName) {
    const tab = document.getElementById(tabName);
    const firstSubTab = tab.querySelector(".subtablinks");

    if (firstSubTab) {
        // Automatically open the first sub-tab
        firstSubTab.click();
    }
}

// Function to toggle the visibility of dropdowns and handle subtab content
function toggleDropdown(evt, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isCurrentlyVisible = dropdown.classList.contains('show');

    // Close all dropdowns
    document.querySelectorAll(".dropdown-content").forEach(content => {
        content.classList.remove('show');
    });

    // Toggle the visibility of the clicked dropdown
    if (!isCurrentlyVisible) {
        dropdown.classList.add('show');
    }

    // Remove "active" class from all tab buttons
    document.querySelectorAll(".tablinks").forEach(link => link.classList.remove("active"));

    // Remove "active" class from all sub-tab buttons
    document.querySelectorAll(".subtablinks").forEach(link => link.classList.remove("active"));

    // Remove "active" class from all II sub-tab buttons
    document.querySelectorAll(".IIsubtablinks").forEach(link => link.classList.remove("active"));
}

// Function to open a specific sub-tab
function openSubTab(evt, subTabName) {
    // Hide all tab content
    document.querySelectorAll(".tabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all tab buttons
    document.querySelectorAll(".tablinks").forEach(link => link.classList.remove("active"));

    // Hide all sub-tab content
    document.querySelectorAll(".subtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Hide all II subtab content
    document.querySelectorAll(".IIsubtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all sub-tab buttons
    document.querySelectorAll(".subtablinks").forEach(link => link.classList.remove("active"));

    // Show the clicked sub-tab content and add "active" class to the clicked button
    document.getElementById(subTabName).classList.add("active");
    document.getElementById(subTabName).classList.add("sway-enter");
    evt.currentTarget.classList.add("active");

    // Hide all II sub-tab content
    document.querySelectorAll(".IIsubtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all II sub-tab buttons
    document.querySelectorAll(".IIsubtablinks").forEach(link => link.classList.remove("active"));
}

// Function to open a specific II sub-tab
function openIISubTab(evt, subTabName) {
    // Hide all II sub-tab content
    document.querySelectorAll(".IIsubtabcontent").forEach(content => {
        content.classList.remove("active");
        content.classList.remove("sway-enter");
    });

    // Remove "active" class from all II sub-tab buttons
    document.querySelectorAll(".IIsubtablinks").forEach(link => link.classList.remove("active"));

    // Show the clicked II sub-tab content and add "active" class to the clicked button
    document.getElementById(subTabName).classList.add("active");
    document.getElementById(subTabName).classList.add("sway-enter");
    evt.currentTarget.classList.add("active");
}

// open GUI on localhost
function fetchWithTimeout(url, options = {}, timeout = 10000) { // Set timeout to 10 seconds
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        fetch(url, options)
            .then(response => {
                clearTimeout(timer);
                if (!response.ok) {
                    reject(new Error('Network response was not ok: ' + response.statusText));
                }
                resolve(response);
            })
            .catch(err => {
                clearTimeout(timer);
                reject(err);
            });
    });
}

document.getElementById("openGuiButton").addEventListener("click", function() {
    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "block"; // Show the loading spinner

    fetchWithTimeout('http://localhost:5000/open-gui', {}, 10000) // Adjust timeout as needed
        .then(response => {
            spinner.style.display = "none"; // Hide the loading spinner
            alert("GUI application opened!");
        })
        .catch(error => {
            spinner.style.display = "none"; // Hide the loading spinner
            console.error('Error:', error);
            if (error.message === 'Request timed out') {
                alert("Request timed out. Please try again.");
            } else {
                alert("GUI is loading. Press OK when finished with GUI. If longer than 10 seconds server is not connected")
                //alert("Error: " + error.message);
            }
        });
});
