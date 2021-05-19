import { css } from '@emotion/react';
import LoginButton from 'components/atoms/LoginButton';
import Logo from 'components/atoms/Logo';
import { Flex } from 'rebass';

const navButtonStyle = css`
  display: flex;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  text-decoration: none;
  color: inherit;
  :hover,
  :focus,
  :active {
    text-decoration: none;
    color: inherit;
  }
`;

const NavigationBar = () => {
  return (
    <Flex bg="lightBlue" justifyContent="space-between" padding="10px 80px">
      <Logo />
      <Flex>
        <a href="#about" css={navButtonStyle}>
          About
        </a>
        <a
          href="https://www.notion.so/public-test-page-ccad85ae25ae4a0082bf3905b169c1d3"
          target="_blank"
          rel="noopener noreferrer"
          css={navButtonStyle}
        >
          FAQ
        </a>
        <LoginButton text="로그인" />
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
