import { Link } from "react-router-dom";
import JuicyButton from "./juicybutton";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { useUser } from "./providers/UserProvider";

const Header = () => {
  const user = useUser();

  let [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>("");

  const handleInput = useCallback<React.FormEventHandler<HTMLInputElement>>(
    (inputCharacter) => {
      setInput(inputCharacter.currentTarget.value);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    console.log("Input is " + input);
    user.setNickname(input);
    setIsOpen(false);
  }, [input, user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to={`/`} className="font-bold">
        KANSYNC
      </Link>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "2em",
        }}
      >
        <Link to={`/about`}>About</Link>
        <Link to={`/dashboard`}>Dashboard</Link>
        <JuicyButton className="py-2 px-10 bg-accent" onClick={openModal}>
          Login
        </JuicyButton>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-text/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-row gap-8 items-center">
                      <input
                        className="w-2/3 rounded-md p-2 bg-background/20 text-text outline focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                        placeholder="Nickname"
                        onInput={handleInput}
                      />

                      <JuicyButton onClick={handleClick} className="bg-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          />
                        </svg>
                      </JuicyButton>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Header;
