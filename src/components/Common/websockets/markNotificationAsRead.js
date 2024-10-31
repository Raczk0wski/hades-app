import axios from 'axios';

export const markNotificationAsRead = async (notificationId) => {
    try {
        await axios.put(`/api/notifications/${notificationId}`, { read: true });
        console.log(`Notification ${notificationId} marked as read.`);
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};
