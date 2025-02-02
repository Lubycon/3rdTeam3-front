import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Box } from 'rebass';
import BetaLogo from 'components/atoms/BetaLogo';
import ShortLogo from 'components/atoms/ShortLogo';
import useCopyLink from 'hooks/useCopyLink';
import { selectIsSideMenuCollapsed, toggleSideMenuCollapsed } from 'slices/common';
import { BLUE, GRAY } from 'styles/colors';
import useLogger from 'hooks/useLogger';

const StyledSideMenu = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 342px;
  padding: 18px 10px 50px 50px;
  background-color: lightblue;
  transition: width ease 0.4s, padding ease 0.1s;
  background-color: ${GRAY[4]};

  &.collapsed {
    width: 80px;
    padding: 18px 20px 50px 20px;
  }
`;

const CollapsedButtonWrapper = styled.div`
  position: relative;
  min-width: 34px;
  min-height: 34px;
  margin: 10px 0 20px 0;
`;

const CollapsedButton = styled.button<{ isCollapsed: boolean }>`
  position: absolute;
  width: 34px;
  height: 34px;
  right: ${(props) => !props.isCollapsed && '0'};
`;

const StyledMenuButton = styled.button`
  display: flex;
  width: 242px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;

  &.located-bottom {
    margin-bottom: 0;
    margin-top: auto;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: ${BLUE[4]};
    font-size: 18px;
    letter-spacing: -4px;
  }

  > span {
    font-size: 16px;
    color: ${GRAY[2]};
    margin-left: 10px;
  }
`;

interface MenuButtonProps {
  className?: string;
  isCollapsed?: boolean;
  emoji: string;
  name: string;
  onClick: VoidFunction;
}

const MenuButton = ({ className, isCollapsed = false, emoji, name, onClick }: MenuButtonProps) => {
  return (
    <StyledMenuButton onClick={onClick} className={className}>
      <div>{emoji}</div>
      {!isCollapsed && <span>{name}</span>}
    </StyledMenuButton>
  );
};

const SideMenu = () => {
  const history = useHistory();
  const { copyLink } = useCopyLink();
  const dispatch = useDispatch();
  const { logger } = useLogger();
  const isCollapsed = useSelector(selectIsSideMenuCollapsed);

  const handleIsCollapsed = () => {
    dispatch(toggleSideMenuCollapsed());
  };

  const handleClickMenu = (page: string, title: string) => () => {
    logger.click('click_button_in_sidebar', {
      page,
      title,
    });
    history.push(page);
  };

  const handleClickCopyURL = () => {
    logger.click('click_share_button');
    copyLink();
  };

  return (
    <StyledSideMenu className={isCollapsed ? 'collapsed' : undefined}>
      <Box minHeight="40px">
        {isCollapsed ? <ShortLogo width="40px" /> : <BetaLogo width="172px" />}
      </Box>
      <CollapsedButtonWrapper>
        <CollapsedButton isCollapsed={isCollapsed} type="button" onClick={handleIsCollapsed}>
          <img
            alt={isCollapsed ? 'double right chevron' : 'double left chevron'}
            src={
              isCollapsed
                ? '/public/icons/double_right_chevron.svg'
                : '/public/icons/double_left_chevron.svg'
            }
          />
        </CollapsedButton>
      </CollapsedButtonWrapper>
      <MenuButton
        isCollapsed={isCollapsed}
        emoji="🗄"
        name="아카이빙 리스트"
        onClick={handleClickMenu('/archiving-list', '아카이빙 리스트')}
      />
      <MenuButton
        isCollapsed={isCollapsed}
        emoji="📝"
        name="커리어 아카이빙"
        onClick={handleClickMenu('/archive/post', '커리어 아카이빙')}
      />
      {!isCollapsed && (
        <MenuButton
          className="located-bottom"
          isCollapsed={isCollapsed}
          emoji="🔗"
          name="친구에게 커리어집 공유하기"
          onClick={handleClickCopyURL}
        />
      )}
    </StyledSideMenu>
  );
};

export default SideMenu;
