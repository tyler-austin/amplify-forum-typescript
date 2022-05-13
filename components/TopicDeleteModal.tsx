import React, { FC, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import ColumnLayout from '@awsui/components-react/column-layout';
import Input from '@awsui/components-react/input';
import Modal from '@awsui/components-react/modal';
import SpaceBetween from '@awsui/components-react/space-between';

import useNotification from '../hooks/useNotification';
import { DeleteTopicInput, DeleteTopicMutationVariables, DeleteTopicMutation } from '../src/API';
import { listTopicsWithComments } from '../src/graphql/custom-queries';
import { deleteTopic } from '../src/graphql/mutations';
import { Topic } from '../types';

export type TopicDeleteModalProps = {
  disabled: boolean;
  selectedItems: readonly Topic[];
};

const TopicDeleteModal: FC<TopicDeleteModalProps> = ({ disabled, selectedItems }) => {
  const DELETE_KEYWORD = 'delete';
  const topic = selectedItems[0];

  const [, { addNotification }] = useNotification();
  const [visible, setVisible] = useState<boolean>(false);
  const [frictionValue, setFrictionValue] = useState<string>('');

  const deletionDisabled = frictionValue !== DELETE_KEYWORD;

  const [deleteTopicMutateFunction, { error }] = useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(
    gql(deleteTopic),
    { refetchQueries: [gql(listTopicsWithComments)], awaitRefetchQueries: true },
  );

  const handleDeleteTopic = async () => {
    const deleteTopicI: DeleteTopicInput = { id: topic.id };
    const deleteTopicMV: DeleteTopicMutationVariables = {
      input: deleteTopicI,
    };
    try {
      const result = await deleteTopicMutateFunction({ variables: deleteTopicMV });
      const id = result.data?.deleteTopic?.id ?? '';
      const title = result.data?.deleteTopic?.title ?? '';
      addNotification({ id, header: `Successfully deleted topic: ${title}` });
      toggleClose();
    } catch (err) {
      console.error('DeleteTopicMutation error:', err);
    }
  };

  const toggleOpen = () => {
    setVisible(true);
  };

  const toggleClose = () => {
    setFrictionValue('');
    setVisible(false);
  };

  return (
    <>
      <Button disabled={disabled} onClick={toggleOpen}>
        Delete
      </Button>
      <Modal
        visible={visible}
        onDismiss={toggleClose}
        header="Delete Topic"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={toggleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  void handleDeleteTopic();
                }}
                disabled={deletionDisabled}
              >
                Delete
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween direction="vertical" size="xs">
          <Box variant="span">
            Delete topic{' '}
            <Box variant="span" fontWeight="bold">
              {topic?.title ?? ''}
            </Box>{' '}
            permanently? This action cannot be undone.
          </Box>

          <Alert>
            Proceeding with this action will delete the topic with all content and can impact related resources.{' '}
          </Alert>

          <SpaceBetween size="s">
            <Box>To avoid accidental deletions we ask you to provide additional written consent.</Box>
            <Box variant="span">
              Type{' '}
              <Box variant="span" fontWeight="bold">
                {DELETE_KEYWORD}
              </Box>{' '}
              to agree.
            </Box>
          </SpaceBetween>

          <ColumnLayout borders="horizontal">
            <Input
              placeholder={DELETE_KEYWORD}
              ariaRequired
              onChange={({ detail: { value } }) => setFrictionValue(value)}
              value={frictionValue}
            />
          </ColumnLayout>
          <Alert visible={!!error} type="error" header="Error deleting topic">
            {error}
          </Alert>
        </SpaceBetween>
      </Modal>
    </>
  );
};

export default TopicDeleteModal;
