import { User } from "./User";

async function createUser(userId: string): Promise<User> {
    // Call the Firebase function to create a new user
    const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_URL}/createUser`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Error creating user');
    }
}

export default createUser;