import React, { FC } from 'react';

import Link from 'next/link';

import { Topic } from '../types';

type GridProps = {
  topics: Topic[];
  onDeleteTopic: (topic: Topic) => void;
};

const Grid: FC<GridProps> = ({ topics, onDeleteTopic }) => {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-5 mt-3 sm\:gap-6 sm\:grid-cols-2 lg\:grid-cols-4">
        {topics.map((topic) => (
          <li key={topic.title} className="flex col-span-1 rounded-md shadow-sm">
            <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <Link href={`/topic/${topic.id}`}>
                  <a className="font-medium text-gray-900 hover\:text-gray-600">{topic.title}</a>
                </Link>
                <p className="text-gray-500">{topic.updatedAt}</p>
              </div>
              <div className="flex-shrink-0 pr-4">
                <button onClick={() => onDeleteTopic(topic)}>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grid;
