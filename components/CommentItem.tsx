import React, { FC, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import Badge from '@awsui/components-react/badge';
import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Container from '@awsui/components-react/container';
import Grid from '@awsui/components-react/grid';
import Icon from '@awsui/components-react/icon';
import SpaceBetween from '@awsui/components-react/space-between';
import Textarea from '@awsui/components-react/textarea';
import styled from 'styled-components';

import {
  DeleteCommentInput,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  UpdateCommentInput,
  UpdateCommentMutation,
  UpdateCommentMutationVariables,
} from '../src/API';
import { getTopicWithComments } from '../src/graphql/custom-queries';
import { deleteComment, updateComment } from '../src/graphql/mutations';
import { Comment, CommentFormData } from '../types';
import CommonVoting from './CommonVoting';
import DateTime from './DateTime';

const CommentContainer = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const StyledBox = styled(Box)`
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin: 2rem 0.5rem;
`;

type CommentItemProps = {
  comment: Comment;
  username: string;
};

const CommentItem: FC<CommentItemProps> = ({ comment, username }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CommentFormData>({ content: comment.content });

  const cancelEditing = () => {
    setFormData({ content: comment.content });
    setEditing(false);
  };

  const [deleteCommentMutateFunction, { loading: deleting }] = useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(gql(deleteComment), { refetchQueries: [gql(getTopicWithComments)], awaitRefetchQueries: true });
  const [updateCommentMutateFunction, { loading: updating }] = useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(gql(updateComment), { refetchQueries: [gql(getTopicWithComments)], awaitRefetchQueries: true });

  const handleDeleteComment = async () => {
    const deleteCommentI: DeleteCommentInput = { id: comment.id };
    const deleteCommentMV: DeleteCommentMutationVariables = {
      input: deleteCommentI,
    };
    try {
      await deleteCommentMutateFunction({ variables: deleteCommentMV });
      setFormData({ content: '' });
    } catch (err) {
      console.error('DeleteCommentMutation error:', err);
    }
  };

  const handleUpdateComment = async () => {
    const updateCommentI: UpdateCommentInput = { id: comment.id, content: formData.content };
    const updateCommentMV: UpdateCommentMutationVariables = {
      input: updateCommentI,
    };
    try {
      await updateCommentMutateFunction({ variables: updateCommentMV });
    } catch (err) {
      console.error('UpdateCommentMutation error:', err);
    }
    setEditing(false);
  };

  return (
    <li>
      <Container>
        <Grid gridDefinition={username === comment.owner ? [{ colspan: 9 }, { colspan: 3 }] : [{ colspan: 12 }]}>
          <CommentContainer>
            <CommonVoting
              resourceType="comment"
              id={comment.id}
              currentVote={comment.currentVote}
              voteCount={comment.voteCount}
              refetchQuery={getTopicWithComments}
            />
            <Box display="block" textAlign="center" margin="xxs" padding="xxs">
              <StyledIcon name="user-profile" variant="subtle" size="big" />
            </Box>
            <StyledBox display="block" margin={{ left: 'xs' }} padding={{ left: 'xs' }}>
              {!editing ? (
                <SpaceBetween size="xs" direction="vertical">
                  <Box variant="strong">{comment.owner}</Box>
                  <SpaceBetween size="xs" direction="horizontal">
                    <Box color="text-body-secondary">
                      <DateTime iso={comment.createdAt} />
                    </Box>
                    {comment.createdAt !== comment.updatedAt && <Badge color="blue">Edited</Badge>}
                  </SpaceBetween>
                  <Box variant="p">{comment.content}</Box>
                </SpaceBetween>
              ) : (
                <Textarea
                  onChange={({ detail: { value } }) => {
                    const newFormData: CommentFormData = { content: value };
                    setFormData(newFormData);
                  }}
                  value={formData.content}
                  placeholder="Topic comment"
                />
              )}
            </StyledBox>
          </CommentContainer>
          {username === comment.owner && (
            <Box float="right">
              <SpaceBetween size="xs" direction="horizontal">
                {editing ? (
                  <>
                    <Button variant="normal" onClick={() => cancelEditing()}>
                      Cancel
                    </Button>
                    <Button variant="normal" loading={updating} onClick={async () => await handleUpdateComment()}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="normal" onClick={() => setEditing(true)}>
                      Edit
                    </Button>
                    <Button variant="normal" loading={deleting} onClick={async () => await handleDeleteComment()}>
                      Delete
                    </Button>
                  </>
                )}
              </SpaceBetween>
            </Box>
          )}
        </Grid>
      </Container>
    </li>
  );
};

export default CommentItem;
