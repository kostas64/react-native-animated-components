import { useContext } from "react";

import { ModalContext } from "@providers/ModalProvider";

export const useModalContext = () => {
  return useContext(ModalContext);
};
