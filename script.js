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
function calculateRemainingHours(hours) {
    const targetHour1 = 13; // 1 PM
    const targetHour2 = 15; // 3 PM
    let remainingHours = 0;
    if (hours < targetHour1) {
        remainingHours = targetHour1 - hours;
    } else if (hours < targetHour2) {
        remainingHours = targetHour2 - hours;
    }
    return remainingHours;
}

// Function to check if current time is within the special range
function isWithinRange(hours) {
    return (hours >= 13 && hours < 15);
}

// Function to add a friend's name and display their system time
function addFriendAndTime(friendName) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds);
    const remainingHours = calculateRemainingHours(hours);

    // Write data to Firebase Realtime Database
    push(ref(database, 'friends'), {
        name: friendName,
        time: formattedTime,
        hours: hours,
        remainingHours: remainingHours
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
            listItem.textContent = `${friendData.name}: ${friendData.time} (Remaining hours: ${friendData.remainingHours})`;
            if (isWithinRange(friendData.hours)) {
                listItem.classList.add("highlight");
            }
            friendList.appendChild(listItem);
        });
    }, function(error) {
        console.error("Error fetching friends:", error);
    });
}

// Add event listener to submit button
submitBtn.addEventListener("click", function() {
    const friendName = friendNameInput.value;
    if (friendName) {
        addFriendAndTime(friendName);
        inputContainer.style.display = "none"; // Hide the input field and button
    }
});

// Initially display all friends
displayFriends();

// Update the displayed times every second
setInterval(() => {
    displayFriends();
}, 1000);
