import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { Home, Bell, Send } from "react-feather";
import { useQuery, useMutation } from "@apollo/client";
import { PROFILE_THUMBNAIL } from "../queries/Main/MainQueries";
import { LOCAL_LOG_OUT } from "../queries/Auth/AuthQueries";

const HeaderWrapper = styled.div`
  ${tw`fixed flex flex-col w-16 items-center justify-between h-screen bg-white px-2 border-r`}
`;

const LogoContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-16`}
`;

const Logo = styled.img`
  ${tw`w-8 h-8`}
`;

const MenuContainer = styled.ul`
  ${tw`w-full flex flex-col items-center py-8`}
`;

const MenuLink = styled(Link)`
  ${tw`my-3 text-gray-600`}
  ${({ current }) =>
    current === "true" ? tw`text-primary` : tw`text-gray-600`}
`;

const AvatarContainer = styled.div`
  ${tw`my-3 cursor-pointer`}
`;

const Avatar = styled.img`
  ${tw`w-10 h-10 bg-primary-light rounded-full`}
  ${({ isPopoverOpen, current }) =>
    isPopoverOpen || current ? tw`border-2 border-primary` : ""};
`;

const Header = ({ location: { pathname } }) => {
  let history = useHistory();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { data } = useQuery(PROFILE_THUMBNAIL);

  const [logUserOut] = useMutation(LOCAL_LOG_OUT);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <Logo src={require("../assets/images/logo.png")} />
      </LogoContainer>
      <MenuContainer>
        <MenuLink current={pathname === "/" ? "true" : "false"} to="/">
          <Home size={32} />
        </MenuLink>
        <MenuLink
          current={pathname === "/notification" ? "true" : "false"}
          to={{
            pathname: `/notification`,
            state: { id: data?.viewMyself?.id },
          }}
        >
          <Bell size={32} />
        </MenuLink>
        <MenuLink
          current={pathname === "/chat" ? "true" : "false"}
          to={{
            pathname: `/chat`,
            state: { id: data?.viewMyself?.id },
          }}
        >
          <Send size={32} />
        </MenuLink>
        <Tooltip
          useContext
          interactive
          open={isPopoverOpen}
          onRequestClose={() => setIsPopoverOpen(false)}
          position="right"
          trigger="click"
          arrow="true"
          theme="light"
          html={
            <ul className="bg-white flex flex-col px-8 py-3">
              <li className="mb-3 text-gray-800 cursor-pointer">
                <div
                  onClick={() => {
                    setIsPopoverOpen(false);
                    setTimeout(() => {
                      history.push({
                        pathname: `/${data?.viewMyself?.username}`,
                        state: { id: data?.viewMyself?.id },
                      });
                    }, 300);
                  }}
                >
                  プロフィール
                </div>
              </li>
              <li
                className="text-red-400 text-center cursor-pointer"
                onClick={logUserOut}
              >
                ログアウト
              </li>
            </ul>
          }
        >
          <AvatarContainer onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <Avatar
              src={data?.viewMyself?.avatar}
              isPopoverOpen={isPopoverOpen}
              current={
                pathname === `/${data?.viewMyself?.username}` ? true : false
              }
            />
          </AvatarContainer>
        </Tooltip>
      </MenuContainer>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
