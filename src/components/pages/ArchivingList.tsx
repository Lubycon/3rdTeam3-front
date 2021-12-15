import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import { logger } from '@lubycon/logger';
import { getArchivingListAsync, selectArchivingList, selectIsLoading } from 'slices/archiving-list';
import MainTemplate from 'components/templates/MainTemplate';
import OrderByButtons from 'components/molecules/OrderByButtons';
import ArchivingListTable from 'components/organisms/ArchivingListTable';
import { Flex, Text } from 'rebass';
import { BLUE, GRAY } from 'styles/colors';
import CheckBox from 'components/atoms/CheckBox';
import VerticalLine from 'components/atoms/VerticalLine';
import { deleteArchiving } from 'api/archiving-list';
import TextButton from 'components/atoms/TextButton';

const archivingListPageLogger = logger.getPageLogger('archiving_list_page');

const StyledButton = styled.button`
  width: 180px;
  height: 40px;
  background-color: ${BLUE[1]};
  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  width: 139px;
  height: 36px;
  padding: 8px 16px;
  background-color: ${BLUE[1]};
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
`;

const ArchivingList = () => {
  const list = useSelector(selectArchivingList);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedAll, setSelectedAll] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  useEffect(() => {
    archivingListPageLogger.view();
    dispatch(getArchivingListAsync());
  }, []);

  const handleClick = () => {
    archivingListPageLogger.click('click_go_to_archive_post_button');
    history.push('/archive/post');
  };

  const handleSelectAll = () => {
    setSelectedAll(true);
    setCheckedList(list.map((item) => item.id));
  };

  const handleClear = () => {
    setSelectedAll(false);
    setCheckedList([]);
  };

  const handleSelect = (id: number) => {
    if (!checkedList.includes(id)) {
      setCheckedList([...checkedList, id]);
    } else {
      setCheckedList(checkedList.filter((checkedId) => checkedId !== id));
    }
  };

  const handleDelete = async () => {
    if (checkedList.length === 0) return;
    await deleteArchiving({ deleteArchiveIds: checkedList });
    dispatch(getArchivingListAsync());
  };

  return (
    <MainTemplate>
      <Flex flexDirection="column">
        <Flex justifyContent="space-between">
          <Text as="h1" fontSize="32px" fontWeight="bold" color={GRAY[1]}>
            아카이빙 리스트
          </Text>
          <StyledButton onClick={handleClick}>커리어 아카이빙 하기</StyledButton>
        </Flex>
        <Flex marginTop="50px">
          <CheckBox
            type="square"
            width="18px"
            height="18px"
            borderRadius="4px"
            border="2px solid #B0B8C1"
            fontColor={GRAY[2]}
            name={
              selectedAll || checkedList.length === 0 ? '전체 선택' : `${checkedList.length}개 선택`
            }
            checked={selectedAll}
            checkedFontColor={BLUE[1]}
            onClick={handleSelectAll}
          />
          <VerticalLine width="1px" height="100%" margin="0 8px" />
          <TextButton padding="0" fontSize="13px" color={GRAY[2]} onClick={handleClear}>
            선택해제
          </TextButton>
          <OrderByButtons />
        </Flex>
        {!isLoading && (
          <>
            <ArchivingListTable checkedList={checkedList} onClickCheckBox={handleSelect} />
            <DeleteButton onClick={handleDelete}>선택 아카이빙 삭제</DeleteButton>
          </>
        )}
      </Flex>
    </MainTemplate>
  );
};

export default ArchivingList;
