import React, { FC } from 'react';

import { ChatAltIcon, UserCircleIcon } from '@heroicons/react/solid';

import { Comment } from '../types';
import DeleteCommentButton from './DeleteCommentButton';

type CommentListProps = {
  commentsItems: Comment[];
};

const CommentList: FC<CommentListProps> = ({ commentsItems }) => {
  if (commentsItems.length === 0) {
    return (
      <div className="flow-root">
        <div className="text-center">
          <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">No Comment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {commentsItems.map((commentItem, commentItemIdx) => (
          <li key={commentItem.id}>
            <div className="relative pb-8">
              {commentItemIdx !== commentsItems.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <>
                  <div className="relative">
                    <UserCircleIcon
                      className="items-center justify-center w-10 h-10 text-gray-500"
                      aria-hidden="true"
                    />

                    <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                      <ChatAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {commentItem.owner}
                          <span className="float-right">
                            <DeleteCommentButton comment={commentItem} />
                          </span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Commented at {commentItem.createdAt}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{commentItem.content}</p>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
