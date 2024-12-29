import { User } from "./User";

async function updateUserInfo(user: User): Promise<User> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_URL}/updateUserInfo`, {
        method: 'POST',
        body: JSON.stringify({ user }),
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

export default updateUserInfo;