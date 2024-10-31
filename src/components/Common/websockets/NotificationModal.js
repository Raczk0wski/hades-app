import React from 'react';
import './NotificationModal.css';
import { dateFormat } from '../Patterns/DatePattern';

const NotificationModal = ({ open, onClose, notifications, highlightedNotificationIds }) => {
    if (!open) return null;

    return (
        <div className="notification-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Notifications</h2>
                <ul className="notification-list">
                    {notifications.slice().reverse().map((notification) => (
                        <li 
                            key={notification.id} 
                            className={`notification notification-${notification.id} ${highlightedNotificationIds.includes(notification.id) ? 'highlighted' : ''}`}
                        >
                            <p>{notification.title}</p>
                            <p>{notification.message} <strong>{notification.createdBy}</strong></p>
                            <p>{dateFormat(notification.createdAt)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotificationModal;
