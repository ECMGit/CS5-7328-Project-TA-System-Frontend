import React from 'react';

const ActionCard = ({ title, description, actionText }: {
    title: string,
    description: string,
    actionText: string
}) => {
  return (
    <div
      className="rounded-lg bg-white shadow-md p-4 flex flex-col justify-between"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 flex justify-end">
          Select
      </div>
    </div>
  );
};

export default ActionCard;