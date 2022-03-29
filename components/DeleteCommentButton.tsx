import React, { FC } from 'react';

import { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { DeleteCommentInput, DeleteCommentMutation, DeleteCommentMutationVariables } from '../src/API';
import { deleteComment } from '../src/graphql/mutations';
import { Comment, GraphQLError } from '../types';

type DeleteCommentButtonProps = {
  comment: Comment;
};

const DeleteCommentButton: FC<DeleteCommentButtonProps> = ({ comment }) => {
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure?')) {
      return;
    }
    try {
      const deleteCommentI: DeleteCommentInput = { id: comment.id };
      const deleteCommentMV: DeleteCommentMutationVariables = {
        input: deleteCommentI,
      };
      const result = (await API.graphql(
        graphqlOperation(deleteComment, deleteCommentMV),
      )) as GraphQLResult<DeleteCommentMutation>;
      console.log('DeleteCommentMutation result:', result);
    } catch (err: unknown) {
      const error = err as GraphQLError;
      console.log('DeleteCommentMutation error:', error);
      const errMsg = error?.errors
        ? error?.errors.map(({ message }) => message).join('\n')
        : 'Oops! Something went wrong!';
      console.log('DeleteCommentMutation errMsg:', errMsg);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteCommentButton;
