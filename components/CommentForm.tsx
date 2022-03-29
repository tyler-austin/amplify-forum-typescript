import React, { FC } from 'react';

import { CommentFormData } from '../types';

type CommentFormProps = {
  formData: CommentFormData;
  setFormData: (formData: CommentFormData) => void;
  handleSubmit: () => void;
  disableSubmit: boolean;
};

const CommentForm: FC<CommentFormProps> = ({ formData, setFormData, handleSubmit, disableSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFormData: CommentFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  };

  return (
    <div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
        Comment
      </label>
      <div className="mt-1">
        <textarea
          id="content"
          name="content"
          rows={5}
          className="block w-full border-gray-300 rounded-md shadow-sm focus\:ring-indigo-500 focus\:border-indigo-500 sm\:text-sm"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div className="mt-2" />
      <button
        type="button"
        onClick={handleSubmit}
        className={`inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          disableSubmit && 'cursor-not-allowed'
        }`}
      >
        Add New Comment
      </button>
    </div>
  );
};

export default CommentForm;
