import React, { FC } from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center m-3 px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover\:bg-indigo-700 focus\:outline-none focus\:ring-2 focus\:ring-offset-2 focus\:ring-indigo-500"
    >
      {text}
    </button>
  );
};

export default Button;
