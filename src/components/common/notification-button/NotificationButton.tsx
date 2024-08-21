import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import NotificationIcon from '@/assets/icons/NotificationIcon.svg?react';
import { GetNotificationResponseBody } from '@/types/home/homeAPIType';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
  notifications: GetNotificationResponseBody[];
  total: number;
}

const NotificationButton = ({
  notifications,
  total,
}: NotificationButtonProps) => {
  const cn = classNames.bind(styles);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleClickMessage = (url: string) => {
    const parts = url.split('/').filter((part) => part);
    const crewId = parts[1];
    const boardId = parts[3] || null;

    parts.length === 3
      ? navigate(`${parts[0]}/${parts[1]}/${parts[2]}`, { state: { crewId } })
      : navigate(`${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}`, {
          state: { crewId, boardId },
        });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn('container')} ref={dropdownRef}>
      <button
        className={cn('notification_button')}
        onClick={toggleNotifications}
      >
        <NotificationIcon />
        {total ? (
          <span className={cn('notification_total')}>{total}</span>
        ) : null}
      </button>
      {isOpen && (
        <div className={cn('notification_list')}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className={cn('notification_item')}
                onClick={() => {
                  handleClickMessage(notification.url);
                }}
              >
                {notification.message}
              </div>
            ))
          ) : (
            <div className={cn('no_notification')}>알림이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
