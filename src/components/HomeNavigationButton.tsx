import { Button } from "@vkontakte/vkui";
import { FC } from "react";

import "../styles/components/home-navigation-button.css";

export interface HomeNavigationButtonProps {
  content: string;
  onClick: () => void;
}

export const HomeNavigationButton: FC<HomeNavigationButtonProps> = ({ content, onClick }) => {
  return (
    <Button className="mb-4 home-navigation-btn" size="l" mode="outline" onClick={onClick}>
      {content}
    </Button>
  );
};
