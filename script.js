// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiTPEdjcPdBNulZrDWP9ThapqMiypKKPk",
  authDomain: "friendtimetracker.firebaseapp.com",
  databaseURL: "https://friendtimetracker-default-rtdb.firebaseio.com",
  projectId: "friendtimetracker",
  storageBucket: "friendtimetracker.appspot.com",
  messagingSenderId: "866443606470",
  appId: "1:866443606470:web:2226478c6d24d656319ac7",
  measurementId: "G-TZ5Q1GJELX"
};
firebase.initializeApp(firebaseConfig);

// Get references to database service and input container
var database = firebase.database();
var inputContainer = document.getElementById("inputContainer");
var submitBtn = document.getElementById("submitBtn"); // Added

// Function to add a friend's name and display their system time
function addFriendAndTime(friendName) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds);
    const remainingHours = calculateRemainingHours(hours);

    // Write data to Firebase Realtime Database
    database.ref('friends').push({
        name: friendName,
        time: formattedTime,
        hours: hours,
        remainingHours: remainingHours
    }, function(error) {
        if (error) {
            console.error("Error adding friend:", error);
        } else {
            console.log("Friend added successfully!");
        }
    });
}

// Function to display friends
function displayFriends() {
    var friendList = document.getElementById("friendList"); // Added
    database.ref('friends').once('value', function(snapshot) {
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
    const friendName = document.getElementById("friendNameInput").value; // Corrected
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