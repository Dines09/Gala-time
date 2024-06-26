// Import necessary functions from Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js';

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRkXeK23tF8E10XB1Wnzf9z7ocGH13YVQ",
    authDomain: "friend-track-time.firebaseapp.com",
    databaseURL: "https://friend-track-time-default-rtdb.firebaseio.com/",
    projectId: "friend-track-time",
    storageBucket: "friend-track-time.appspot.com",
    messagingSenderId: "44313737290",
    appId: "1:44313737290:web:1e23b7abf3e3a9d86cceb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

const inputContainer = document.getElementById("inputContainer");
const friendNameInput = document.getElementById("friendNameInput");
const submitBtn = document.getElementById("submitBtn");
const friendList = document.getElementById("friendList");

// Function to format time
function formatTime(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to calculate remaining hours
function calculateRemainingTime(hours, minutes) {
    const targetHour = 23; // 11 PM
    const targetMinute = 0; // 0 minute
    let remainingHours = 0;
    let remainingMinutes = 0;

    if (hours < targetHour || (hours === targetHour && minutes < targetMinute)) {
        remainingHours = targetHour - hours;
        remainingMinutes = targetMinute - minutes;
        if (remainingMinutes < 0) {
            remainingMinutes += 60;
            remainingHours -= 1;
        }
    }

    return { hours: remainingHours, minutes: remainingMinutes };
}

// Function to check if current time is within the special range
function isWithinRange(hours) {
    return (hours >= 13 && hours < 15);
}

// Add event listener to submit button
submitBtn.addEventListener("click", function() {
    const friendName = friendNameInput.value;
    if (friendName) {
        addFriendAndTime(friendName);
        inputContainer.style.display = "none"; // Hide the input field and button
        friendNameInput.value = ""; // Clear the input field
    }
});

// Function to add a friend's name and display their system time
function addFriendAndTime(friendName) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds);
    const remainingTime = calculateRemainingTime(hours, minutes);

    // Write data to Firebase Realtime Database
    push(ref(database, 'friends'), {
        name: friendName,
        time: formattedTime,
        hours: hours,
        remainingTime: remainingTime
    }, function(error) {
        if (error) {
            console.error("Error adding friend:", error);
        } else {
            console.log("Friend added successfully!");
            displayFriends();
        }
    });
}

// Function to display friends
function displayFriends() {
    onValue(ref(database, 'friends'), function(snapshot) {
        friendList.innerHTML = ''; // Clear the list
        snapshot.forEach(function(childSnapshot) {
            var friendData = childSnapshot.val();
            const listItem = document.createElement("li");
            const remainingHours = friendData.remainingTime.hours;
            const remainingMinutes = friendData.remainingTime.minutes;
            listItem.textContent = `${friendData.name}: ${friendData.time} (Remaining time: ${remainingHours} hours ${remainingMinutes} minutes)`;
            if (isWithinRange(friendData.hours)) {
                listItem.classList.add("highlight");
            }
            friendList.appendChild(listItem);
        });
    }, function(error) {
        console.error("Error fetching friends:", error);
    });
}


// Check if the user has already submitted their name
const isNameSubmitted = localStorage.getItem('isNameSubmitted');

// Hide the input field and submit button if name is already submitted
if (isNameSubmitted) {
    inputContainer.style.display = 'none';
}

// Add event listener to submit button
submitBtn.addEventListener('click', function() {
    // Check if name is not already submitted
    if (!isNameSubmitted) {
        const friendName = friendNameInput.value;
        if (friendName) {
            addFriendAndTime(friendName);
            inputContainer.style.display = 'none'; // Hide the input field and button
            // Set flag indicating name submission
            localStorage.setItem('isNameSubmitted', true);
        }
    }
});


// Initially display all friends
displayFriends();

// Update the displayed times every 5 seconds
setInterval(displayFriends, 5000);
