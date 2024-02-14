import { FC, Fragment, ReactNode } from "react";
import { Dialog as PrimitiveDialog, Transition } from "@headlessui/react";

export interface DialogProps {
  children: ReactNode;
  closeDialog: () => void;
  open: boolean;
}

export const Dialog: FC<DialogProps> = ({ children, closeDialog, open }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <PrimitiveDialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <PrimitiveDialog.Panel className="relative transform overflow-hidden rounded-lg border border-white bg-black px-4 shadow-xl transition-all">
                {children}
              </PrimitiveDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </PrimitiveDialog>
    </Transition.Root>
  );
};
