import React, { FC, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Container from '@awsui/components-react/container';
import FormField from '@awsui/components-react/form-field';
import { InputProps } from '@awsui/components-react/input';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import SpaceBetween from '@awsui/components-react/space-between';
import Textarea from '@awsui/components-react/textarea';

import { CreateCommentMutation, CreateCommentMutationVariables } from '../src/API';
import { getTopicWithComments } from '../src/graphql/custom-queries';
import { createComment } from '../src/graphql/mutations';
import { CommentFormData } from '../types';

type CreateCommentProps = {
  topicId: string;
};

const CreateComment: FC<CreateCommentProps> = ({ topicId }) => {
  const [formData, setFormData] = useState<CommentFormData>({ content: '' });

  const [createCommentMutateFunction, { error }] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    gql(createComment),
    { refetchQueries: [gql(getTopicWithComments)], awaitRefetchQueries: true },
  );

  const createNewComment = async () => {
    const createCommentMV: CreateCommentMutationVariables = {
      input: { ...formData, topicId: topicId },
    };
    try {
      await createCommentMutateFunction({ variables: createCommentMV });
      setFormData({ content: '' });
    } catch (err) {
      console.error('CreateCommentMutation error:', err);
    }
  };

  return (
    <Container>
      <SpaceBetween direction="vertical" size="l">
        <FormField label="Comment" stretch={true}>
          <Textarea
            onChange={({ detail: { value } }: NonCancelableCustomEvent<InputProps.ChangeDetail>) => {
              const newFormData: CommentFormData = { content: value };
              setFormData(newFormData);
            }}
            value={formData.content}
            placeholder="Topic comment"
          />
        </FormField>
        <Alert visible={!!error} type="error" header="Error creating comment">
          {error}
        </Alert>
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              variant="primary"
              onClick={async () => {
                await createNewComment();
              }}
            >
              Post comment
            </Button>
          </SpaceBetween>
        </Box>
      </SpaceBetween>
    </Container>
  );
};

export default CreateComment;
