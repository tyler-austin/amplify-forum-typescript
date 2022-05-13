import React, { FC, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import FormField from '@awsui/components-react/form-field';
import Input from '@awsui/components-react/input';
import Modal from '@awsui/components-react/modal';
import SpaceBetween from '@awsui/components-react/space-between';
import Textarea from '@awsui/components-react/textarea';
import { isUndefined } from 'lodash';

import useNotification from '../hooks/useNotification';
import {
  CreateTopicWithCommentsMutation,
  CreateTopicWithCommentsMutationVariables,
  UpdateTopicWithCommentsMutation,
  UpdateTopicWithCommentsMutationVariables,
} from '../src/API';
import { createTopicWithComments, updateTopicWithComments } from '../src/graphql/custom-mutations';
import { listTopicsWithComments, getTopicWithComments } from '../src/graphql/custom-queries';
import { Topic, TopicFormData } from '../types';

type TopicModalProps = {
  buttonVariant?: 'normal' | 'primary';
  isEdit?: boolean;
  topic?: Topic;
};

const TopicModal: FC<TopicModalProps> = ({ buttonVariant = 'primary', isEdit = false, topic }) => {
  const [, { addNotification }] = useNotification();
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<TopicFormData>(
    isEdit ? { title: topic?.title ?? '', content: topic?.content ?? '' } : { title: '', content: '' },
  );

  const [createTopicMutateFunction, { error: createError }] = useMutation<
    CreateTopicWithCommentsMutation,
    CreateTopicWithCommentsMutationVariables
  >(gql(createTopicWithComments), { refetchQueries: [gql(listTopicsWithComments)], awaitRefetchQueries: true });
  const [updateTopicMutateFunction, { error: updateError }] = useMutation<
    UpdateTopicWithCommentsMutation,
    UpdateTopicWithCommentsMutationVariables
  >(gql(updateTopicWithComments), { refetchQueries: [gql(getTopicWithComments)], awaitRefetchQueries: true });

  const createTopic = async () => {
    const createTopicMV: CreateTopicWithCommentsMutationVariables = {
      input: { ...formData },
    };
    try {
      const result = await createTopicMutateFunction({ variables: createTopicMV });
      const id = result.data?.createTopic?.id ?? '';
      const title = result.data?.createTopic?.title ?? '';
      addNotification({ id, header: `Successfully created topic: ${title}` });
      setFormData({ title: '', content: '' });
      setVisible(false);
    } catch (err) {
      console.error('CreateTopicMutation error:', err);
    }
  };

  const updateTopic = async () => {
    const updateTopicMV: UpdateTopicWithCommentsMutationVariables = {
      input: { ...formData, id: topic?.id ?? '' },
    };
    try {
      const result = await updateTopicMutateFunction({ variables: updateTopicMV });
      const id = result.data?.updateTopic?.id ?? '';
      const title = result.data?.updateTopic?.title ?? '';
      addNotification({ id, header: `Successfully updated topic: ${title}` });
      setFormData({ title: '', content: '' });
      setVisible(false);
    } catch (err) {
      console.error('UpdateTopicMutation error:', err);
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handlePrimaryClick = async () => {
    if (isEdit) {
      await updateTopic();
    } else {
      await createTopic();
    }
  };

  return (
    <>
      <Button variant={buttonVariant} onClick={() => handleOpenModal()}>
        {isEdit ? 'Edit topic' : 'Create topic'}
      </Button>
      {visible && (
        <Modal
          onDismiss={() => handleCloseModal()}
          visible={visible}
          size="medium"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={() => handleCloseModal()}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => handlePrimaryClick()}>
                  {isEdit ? 'Save edits' : 'Create'}
                </Button>
              </SpaceBetween>
            </Box>
          }
          header={isEdit ? 'Edit topic' : 'Create topic'}
        >
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Topic title">
              <Input
                value={formData.title}
                onChange={({ detail: { value } }) => {
                  const newFormData: TopicFormData = { ...formData, title: value };
                  setFormData(newFormData);
                }}
                placeholder="Title"
              />
            </FormField>
            <FormField label="Topic content">
              <Textarea
                value={formData.content}
                onChange={({ detail: { value } }) => {
                  const newFormData: TopicFormData = { ...formData, content: value };
                  setFormData(newFormData);
                }}
                placeholder="Content"
              />
            </FormField>
            <Alert
              visible={!!createError || !!updateError}
              type="error"
              header={`Error ${!isUndefined(createError) ? 'creating' : 'updating'} topic`}
            >
              {!isUndefined(createError) ? createError : updateError}
            </Alert>
          </SpaceBetween>
        </Modal>
      )}
    </>
  );
};

export default TopicModal;
