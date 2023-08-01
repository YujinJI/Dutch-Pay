import React from 'react';

const PersonalHistory = ({ userName, prices, titles }) => {
  return (
    <div className="w-52 bg-white rounded-md text-center py-3 mr-5 mt-2">
      <h3 className="font-bold text-lg pb-3">{userName}</h3>
      {titles.length > 1 &&
        titles.slice(1).map((title, index) => (
          <p key={index}>
            {title}: {prices[index + 1]}원
          </p>
        ))}
    </div>
  );
};

export default PersonalHistory;
