import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link, withRouter } from "react-router-dom";
import { Home, Bell, Send } from "react-feather";
import { useQuery } from "@apollo/client";
import { PROFILE_THUMBNAIL } from "../queries/Main/MainQueries";

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
  ${({ current }) => (current ? tw`text-primary` : tw`text-gray-600`)}
`;

const Avatar = styled.img`
  ${tw`w-10 h-10 bg-primary-light rounded-full`}
`;

const Header = ({ location: { pathname } }) => {
  const { loading, data } = useQuery(PROFILE_THUMBNAIL);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <Logo src={require("../assets/images/logo.png")} />
      </LogoContainer>
      <MenuContainer>
        <MenuLink current={pathname === "/"} to="/">
          <Home size={32} />
        </MenuLink>
        <MenuLink>
          <Bell size={32} />
        </MenuLink>
        <MenuLink current={pathname === "/chat"}>
          <Send size={32} />
        </MenuLink>
        <MenuLink>
          <Avatar src={data?.viewMyself?.avatar} />
        </MenuLink>
      </MenuContainer>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
