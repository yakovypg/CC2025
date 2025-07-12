import { FC } from "react";
import { Button } from "@vkontakte/vkui";

import "../styles/icon.css";

export interface ContactReferenceButtonProps {
  href: string;
  icon: string;
}

export const ContactReferenceButton: FC<ContactReferenceButtonProps> = ({
  href,
  icon
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button className="mx-2" size="l" mode="tertiary">
        <i className={`${icon} contact-icon`}></i>
      </Button>
    </a>
  );
};
