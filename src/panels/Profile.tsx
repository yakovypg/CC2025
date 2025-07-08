import { FC } from "react";

import {
  Avatar,
  Cell,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Header,
  Group,
  NavIdProps,
} from '@vkontakte/vkui';

import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export interface ProfileProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Profile: FC<ProfileProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Профиль
      </PanelHeader>

      {fetchedUser && (
        <Group
          header={<Header size="s">User Data Fetched with VK Bridge</Header>}
        >
          <Cell
            before={photo_200 && <Avatar src={photo_200} />}
            subtitle={city?.title}
          >
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Placeholder>
        <p>Профиль</p>
      </Placeholder>
    </Panel>
  );
};
