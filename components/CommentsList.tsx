import React, { FC } from 'react';

import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import Select from '@awsui/components-react/select';
import styled from 'styled-components';

import useSortResourceBy from '../hooks/useSortResourceBy';
import { Comment } from '../types';
import CommentItem from './CommentItem';
import Loading from './Loading';

const StyledList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
`;

type CommentsListProps = {
  loading: boolean;
  commentCount: number;
  comments: Comment[];
  username: string;
};

const CommentsList: FC<CommentsListProps> = ({ loading, comments, commentCount, username }) => {
  const { options, order, setOrder, sortedResources } = useSortResourceBy(comments);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container
            disableContentPaddings
            header={
              <Header
                variant="h2"
                counter={`(${commentCount})`}
                actions={
                  <Select
                    selectedOption={order}
                    onChange={({ detail: { selectedOption } }) => setOrder(selectedOption)}
                    options={options}
                    selectedAriaLabel="Selected"
                  />
                }
              >
                Comments
              </Header>
            }
          ></Container>
          <StyledList>
            {sortedResources.map((comment) => {
              return <CommentItem key={comment.id} comment={comment} username={username} />;
            })}
          </StyledList>
        </>
      )}
    </div>
  );
};

export default CommentsList;
