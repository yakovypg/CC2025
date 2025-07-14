import { FC } from "react";
import { Avatar, calcInitialsAvatarColor } from "@vkontakte/vkui";

export interface ProfileCoverProps {
  user_photo: string | undefined;
  user_first_name: string;
  user_last_name: string;
}

export const ProfileCover: FC<ProfileCoverProps> = ({
  user_photo,
  user_first_name,
  user_last_name
}) => {
  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <Avatar
        src={user_photo}
        size={128}
        initials="U"
        gradientColor={calcInitialsAvatarColor(4)}
        alt="Avatar"
      />
      <h6 className="fs-5 fw-bold">
        {user_first_name} {user_last_name}
      </h6>
    </div>
  );
};
