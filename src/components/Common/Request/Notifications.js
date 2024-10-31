export const markNotificationAsRead = async (notificationId) => {
    const response = await fetch(`http://localhost:8080/api/v1/notification/read?id=${notificationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch read notification', response);
    }
    return response
};

export const getUserNotifications = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/v1/notification/get/user?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch get notification', response);
    }
    return response.json()
};