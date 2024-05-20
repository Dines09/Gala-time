document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("inputContainer");
    const friendNameInput = document.getElementById("friendNameInput");
    const submitBtn = document.getElementById("submitBtn");
    const friendList = document.getElementById("friendList");

    // Check if user has already submitted their name
    const userName = localStorage.getItem("userName");
    if (userName) {
        inputContainer.style.display = "none"; // Hide input and button if already submitted
    } else {
        inputContainer.style.display = "block"; // Show input and button if not submitted
    }

    // Load existing friends from localStorage
    let friends = JSON.parse(localStorage.getItem("friends")) || [];

    // Function to display friends
    function displayFriends() {
        friendList.innerHTML = ''; // Clear the list
        friends.forEach(friend => {
            const listItem = document.createElement("li");
            listItem.textContent = `${friend.name}: ${friend.time} (Remaining hours: ${friend.remainingHours})`;
            if (isWithinRange(friend.hours)) {
                listItem.classList.add("highlight");
            }
            friendList.appendChild(listItem);
        });
    }

    // Function to add a friend's name and display their system time
    function addFriendAndTime(friendName) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const formattedTime = formatTime(hours, minutes, seconds);
        const remainingHours = calculateRemainingHours(hours);

        const friend = {
            name: friendName,
            time: formattedTime,
            hours: hours,
            remainingHours: remainingHours
        };

        friends.push(friend);
        localStorage.setItem("friends", JSON.stringify(friends));
        displayFriends();
    }

    // Function to calculate remaining hours until the end of the specified range
    function calculateRemainingHours(currentHour) {
        let remainingHours = 0;
        if (currentHour >= 13 && currentHour < 15) {
            remainingHours = 15 - currentHour;
        }
        return remainingHours;
    }

    // Function to format time as HH:MM:SS
    function formatTime(hours, minutes, seconds) {
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Function to check if the current time is within the specified range
    function isWithinRange(hours) {
        return (hours >= 13 && hours < 15);
    }

    // Function to handle friend name submission
    function submitFriendName() {
        const friendName = friendNameInput.value;
        if (friendName) {
            addFriendAndTime(friendName);
            localStorage.setItem("userName", friendName); // Remember the user's name
            inputContainer.style.display = "none"; // Hide the input field and button
        }
    }

    // Add event listener to submit button
    submitBtn.addEventListener("click", submitFriendName);

    // Initially display all friends
    displayFriends();

    // Update the displayed times every second
    setInterval(() => {
        friends.forEach(friend => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            friend.time = formatTime(hours, minutes, seconds);
            friend.remainingHours = calculateRemainingHours(hours);
        });
        displayFriends();
    }, 1000);
});
document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("inputContainer");
    const friendNameInput = document.getElementById("friendNameInput");
    const submitBtn = document.getElementById("submitBtn");
    const friendList = document.getElementById("friendList");

    // Check if user has already submitted their name
    const userName = localStorage.getItem("userName");
    if (userName) {
        inputContainer.style.display = "none"; // Hide input and button if already submitted
    } else {
        inputContainer.style.display = "block"; // Show input and button if not submitted
    }

    // Load existing friends from localStorage
    let friends = JSON.parse(localStorage.getItem("friends")) || [];

    // Function to display friends
    function displayFriends() {
        friendList.innerHTML = ''; // Clear the list
        friends.forEach(friend => {
            const listItem = document.createElement("li");
            listItem.textContent = `${friend.name}: ${friend.time} (Remaining hours: ${friend.remainingHours})`;
            if (isWithinRange(friend.hours)) {
                listItem.classList.add("highlight");
            }
            friendList.appendChild(listItem);
        });
    }

    // Function to add a friend's name and display their system time
    function addFriendAndTime(friendName) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const formattedTime = formatTime(hours, minutes, seconds);
        const remainingHours = calculateRemainingHours(hours);

        const friend = {
            name: friendName,
            time: formattedTime,
            hours: hours,
            remainingHours: remainingHours
        };

        friends.push(friend);
        localStorage.setItem("friends", JSON.stringify(friends));
        displayFriends();
    }

    // Function to calculate remaining hours until the end of the specified range
    function calculateRemainingHours(currentHour) {
        let remainingHours = 0;
        if (currentHour >= 13 && currentHour < 15) {
            remainingHours = 15 - currentHour;
        }
        return remainingHours;
    }

    // Function to format time as HH:MM:SS
    function formatTime(hours, minutes, seconds) {
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Function to check if the current time is within the specified range
    function isWithinRange(hours) {
        return (hours >= 13 && hours < 15);
    }

    // Function to handle friend name submission
    function submitFriendName() {
        const friendName = friendNameInput.value;
        if (friendName) {
            addFriendAndTime(friendName);
            localStorage.setItem("userName", friendName); // Remember the user's name
            inputContainer.style.display = "none"; // Hide the input field and button
        }
    }

    // Add event listener to submit button
    submitBtn.addEventListener("click", submitFriendName);

    // Initially display all friends
    displayFriends();

    // Update the displayed times every second
    setInterval(() => {
        friends.forEach(friend => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            friend.time = formatTime(hours, minutes, seconds);
            friend.remainingHours = calculateRemainingHours(hours);
        });
        displayFriends();
    }, 1000);
});
