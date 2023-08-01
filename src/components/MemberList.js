import AvatarImage from '../assets/images/avatar.png';
import React from 'react';

const MemberList = ({ usersName, usersAccount, user }) => {
  // 매개변수 구조 분해로 변경
  const userNameArray = Object.values(usersName); // 객체를 배열로 변환

  return (
    <div className="w-56 text-center bg-[#40798C]">
      <div>
        <h2 className="text-xl font-extrabold text-white my-4">참여자 목록</h2>
        {userNameArray.map((userName, index) => (
          <div key={index} className="relative">
            <div className="flex flex-wrap justify-center items-center mt-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar mx-2">
                <div className="w-10 rounded-full">
                  {user.photoURL ? <img src={user.photoURL} /> : <img src={AvatarImage} alt="avatar image" />}
                  {/*<img src={AvatarImage} alt="avatar image" />*/}
                </div>
              </label>
              <p className="mx-2 text-white">{userName}</p>
            </div>
            {usersAccount && (
              <p className="text-white text-sm pb-3">
                {usersAccount[index].bank}/{usersAccount[index].account}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
