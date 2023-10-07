"use client";
import { FC, Fragment, memo, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Notification, NotificationType } from "./types";
import { useTimeout } from "@/hooks/useTimeout";

export interface ToastProps {
  destroy: (id: string) => void;
  notification: Notification;
}

export const Toast: FC<ToastProps> = memo(({ destroy, notification }) => {
  const DURATION = 5000;
  const { id, message, title, type } = notification;
  const [show, setShow] = useState(false);

  // Show toast using animate enter transition.
  useTimeout(() => setShow(true), 100);

  // Hide toast using animate leave transition.
  useTimeout(() => setShow(false), DURATION - 900);

  // Remove it.
  useTimeout(() => destroy(id), DURATION);

  const onClickCloseNotification = () => {
    destroy(id);
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      <Transition
        show={show}
        as={Fragment}
        enter="transform transition ease-in-out duration-500 sm:duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === NotificationType.error && (
                  <ExclamationCircleIcon
                    className="h-6 w-6 text-red-400"
                    aria-hidden="true"
                  />
                )}
                {type === NotificationType.info && (
                  <InformationCircleIcon
                    className="h-6 w-6 text-blue-400"
                    aria-hidden="true"
                  />
                )}
                {type === NotificationType.success && (
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-400"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClickCloseNotification}
                  type="button"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
});

export default Toast;
