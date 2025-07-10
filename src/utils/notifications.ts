/**
 * Notification Utility
 * Centralized notification system for user feedback
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  options: NotificationOptions;
  timestamp: number;
}

class NotificationManager {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];
  private idCounter = 0;

  /**
   * Add a new notification
   */
  public show(
    message: string, 
    type: NotificationType = 'info', 
    options: NotificationOptions = {}
  ): string {
    const id = `notification-${++this.idCounter}`;
    const notification: Notification = {
      id,
      type,
      message,
      options: {
        duration: 5000,
        position: 'top-right',
        persistent: false,
        ...options,
      },
      timestamp: Date.now(),
    };

    this.notifications.push(notification);
    this.notifyListeners();

    // Auto-remove notification after duration (unless persistent)
    if (!notification.options.persistent && notification.options.duration) {
      setTimeout(() => {
        this.remove(id);
      }, notification.options.duration);
    }

    return id;
  }

  /**
   * Remove a notification by ID
   */
  public remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  /**
   * Clear all notifications
   */
  public clear(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  /**
   * Get all notifications
   */
  public getAll(): Notification[] {
    return [...this.notifications];
  }

  /**
   * Subscribe to notification changes
   */
  public subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener([...this.notifications]);
    });
  }
}

// Create singleton instance
const notificationManager = new NotificationManager();

/**
 * Show a notification
 */
export function showNotification(
  message: string,
  type: NotificationType = 'info',
  options?: NotificationOptions
): string {
  return notificationManager.show(message, type, options);
}

/**
 * Show success notification
 */
export function showSuccess(message: string, options?: NotificationOptions): string {
  return showNotification(message, 'success', options);
}

/**
 * Show error notification
 */
export function showError(message: string, options?: NotificationOptions): string {
  return showNotification(message, 'error', {
    duration: 8000, // Longer duration for errors
    ...options,
  });
}

/**
 * Show warning notification
 */
export function showWarning(message: string, options?: NotificationOptions): string {
  return showNotification(message, 'warning', options);
}

/**
 * Show info notification
 */
export function showInfo(message: string, options?: NotificationOptions): string {
  return showNotification(message, 'info', options);
}

/**
 * Remove notification
 */
export function removeNotification(id: string): void {
  notificationManager.remove(id);
}

/**
 * Clear all notifications
 */
export function clearNotifications(): void {
  notificationManager.clear();
}

/**
 * Subscribe to notification changes
 */
export function subscribeToNotifications(
  listener: (notifications: Notification[]) => void
): () => void {
  return notificationManager.subscribe(listener);
}

export default notificationManager;