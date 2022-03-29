import React, { FC } from 'react';

import { TopicFormData } from '../types';

type TopicFormProps = {
  formData: TopicFormData;
  setFormData: (formData: TopicFormData) => void;
  handleSubmit: () => void;
  disableSubmit: boolean;
};

const TopicForm: FC<TopicFormProps> = ({ formData, setFormData, handleSubmit, disableSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData: TopicFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  };

  return (
    <div className="bg-white sm\:rounded-lg">
      <div className="px-4 py-5 sm\:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">New Topic</h3>
        <div className="max-w-xl mt-2 text-sm text-gray-500">
          <p>Add a new Topic.</p>
        </div>
        <form className="mt-5 sm\:flex sm\:items-center">
          <div className="w-full sm\:max-w-xs">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full border-gray-300 rounded-md shadow-sm focus\:ring-indigo-500 focus\:border-indigo-500 sm\:text-sm"
              placeholder="Topic"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className={`disabled:opacity-50 inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
              disableSubmit && 'cursor-not-allowed'
            }`}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopicForm;
