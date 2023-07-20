import React from 'react';
import MemberList from './MemberList';
import InputPrice from './InputPrice';
import PersonalHistory from './PersonalHistory';

const Room = props => {
  return (
    <div className="flex pt-16 h-screen">
      <MemberList />
      <div className="p-8">
        <InputPrice />
        <div className="mt-8 flex">
          <PersonalHistory />
          <PersonalHistory />
        </div>
      </div>
    </div>
  );
};

export default Room;
