import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
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

const MenuItem = styled.li`
  ${tw`my-3 text-gray-600`}
`;

const Avatar = styled.img`
  ${tw`w-10 h-10 bg-primary-light rounded-full`}
`;

const Header = () => {
  const { loading, data } = useQuery(PROFILE_THUMBNAIL);
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Logo src={require("../assets/images/logo.png")} />
      </LogoContainer>
      <MenuContainer>
        <MenuItem>
          <Home size={32} />
        </MenuItem>
        <MenuItem>
          <Bell size={32} />
        </MenuItem>
        <MenuItem>
          <Send size={32} />
        </MenuItem>
        <MenuItem>
          <Avatar src={data?.viewMyself?.avatar} />
        </MenuItem>
      </MenuContainer>
    </HeaderWrapper>
  );
};

export default Header;
