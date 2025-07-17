import { FC } from "react";
import { Avatar, calcInitialsAvatarColor } from "@vkontakte/vkui";

export interface ProfileCoverProps {
  userPhoto: string | undefined;
  userFirstName: string;
  userLastName: string;
}

export const ProfileCover: FC<ProfileCoverProps> = ({ userPhoto, userFirstName, userLastName }) => {
  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <Avatar
        src={userPhoto}
        size={128}
        initials="U"
        gradientColor={calcInitialsAvatarColor(4)}
        alt="Avatar"
      />
      <h6 className="fs-5 fw-bold">
        {userFirstName} {userLastName}
      </h6>
    </div>
  );
};
