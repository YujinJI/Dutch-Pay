import React from 'react';
import AvatarImage from '../assets/images/avatar.jpeg';

const MemberList = props => {
  return (
    <div className="w-56 text-center bg-[#40798C]">
      <div>
        <h2 className="text-xl font-extrabold text-white my-4">참여자 목록</h2>
        <div className="flex justify-center items-center my-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mx-2">
            <div className="w-10 rounded-full">
              <img src={AvatarImage} alt="avatar image" />
            </div>
          </label>
          <p className="mx-2 text-white">지유진</p>
        </div>
        <div className="flex justify-center items-center my-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mx-2">
            <div className="w-10 rounded-full">
              <img src={AvatarImage} alt="avatar image" />
            </div>
          </label>
          <p className="mx-2 text-white">지유진</p>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
