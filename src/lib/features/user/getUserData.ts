import { User } from "./User";

// Function to get the user data from the database based on user id. Be sure to handle any errors that may occur.
async function getUserData(userId: string): Promise<User | null> {
    // Call the Firebase function to get the user data
    const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_URL}/getUser?userId=${userId}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return null
    }
}

export default getUserData;