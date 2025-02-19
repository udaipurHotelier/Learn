const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBdGShEAg6teoVgXVfsbzUJO1sIY3bZPH4",
    authDomain: "udaipur-hotelier-4b582.firebaseapp.com",
    projectId: "udaipur-hotelier-4b582",
    storageBucket: "udaipur-hotelier-4b582.firebasestorage.app",
    messagingSenderId: "843875126311",
    appId: "1:843875126311:web:2c76e6e8b79d4223439202",
    measurementId: "G-M93ZN7YSNB"
});
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password) {
    return password.length >= 6;
}

// Function to check if the email is already registered in Firebase Authentication
async function isEmailAlreadyRegistered(email) {
    try {
        const methods = await firebase.auth().fetchSignInMethodsForEmail(email);
        return methods.length > 0;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// Handle Authentication (Login/Signup)
const handleAuth = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let valid = true;

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById("email-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("email-error").style.display = "none";
    }

    // Validate password
    if (!validatePassword(password)) {
        document.getElementById("password-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("password-error").style.display = "none";
    }

    // Proceed if valid
    if (valid) {
        const emailExists = await isEmailAlreadyRegistered(email);

        if (emailExists) {
            // Attempt login if the email exists
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                alert("Successfully logged in!");
            } catch (error) {
                console.log("Error during login:", error.code, error.message);

                // Display the password mismatch error
                if (error.code === "auth/wrong-password") {
                    document.getElementById("password-mismatch-error").style.display = "block";
                } else {
                    document.getElementById("password-mismatch-error").style.display = "none";
                }
            }
        } else {
            // Attempt signup if the email doesn't exist
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Optionally, add user data to Firestore
                db.collection('users').doc(user.uid).set({
                    email: email,
                    createdAt: new Date()
                });

                alert("Successfully signed up!");
                window.location.href = "Restaurant_Management_System.html";
            } catch (error) {
                console.log("Error during sign-up:", error.code, error.message);
                alert("Signup failed. Please try again.");
            }
        }
    }
};