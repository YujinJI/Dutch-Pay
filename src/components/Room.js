import React, { useContext, useEffect, useState } from 'react';
import MemberList from './MemberList';
import InputPrice from './InputPrice';
import PersonalHistory from './PersonalHistory';
import { useParams } from 'react-router-dom';
import { getUserNameAndAccount, getUsersRoomData } from '../service/database';
import AuthContext from '../context/AuthContext';
import { settleExpenses } from '../service/settleExpenses';
import SettlementResult from './SettlementResult';

const Room = props => {
  const { user } = useContext(AuthContext);

  const params = useParams();
  const roomCode = params.roomCode;

  const [usersInfo, setUsersInfo] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const [usersAccount, setUsersAccount] = useState([]);

  const [settleResult, setSettleResult] = useState(null);

  useEffect(() => {
    if (user.uid) {
      const handleDataChange = async data => {
        setUsersInfo(data);

        const userInfoPromises = Object.keys(data).map(async userId => {
          const { name, accountInfo } = await getUserNameAndAccount(userId);
          return { name, accountInfo };
        });

        const userInfos = await Promise.all(userInfoPromises);
        const userNames = userInfos.map(userInfo => userInfo.name);
        const userAccounts = userInfos.map(userInfo => userInfo.accountInfo);

        setUsersName(userNames);
        setUsersAccount(userAccounts);
      };

      getUsersRoomData(roomCode, handleDataChange);
    } else {
      setUsersInfo([]);
      setUsersName([]);
      setUsersAccount([]);
    }
  }, [user.uid]);

  // 각 사용자의 총 지출 금액을 계산하는 함수
  const calculateTotalSpent = userInfo => {
    return userInfo.prices.reduce((total, price) => {
      const parsedPrice = parseInt(price, 10);
      return isNaN(parsedPrice) ? total : total + parsedPrice;
    }, 0);
  };

  // 데이터를 저장하는 함수
  const createSampleData = () => {
    const data = usersName.map((userName, index) => {
      const userInfo = usersInfo[Object.keys(usersInfo)[index]];
      const totalSpent = calculateTotalSpent(userInfo);
      return {
        name: userName,
        amount: totalSpent,
      };
    });
    return data;
  };

  const handleClickSettle = () => {
    // data 생성
    const inputData = createSampleData();
    const result = settleExpenses(inputData);
    setSettleResult(result);
  };

  return (
    <div className={`flex justify-between pt-16 h-screen`}>
      <MemberList usersName={usersName} usersAccount={usersAccount} user={user} />
      <div className="p-8 w-fit relative">
        <InputPrice roomCode={roomCode} />
        <div className="mt-8 flex flex-wrap">
          {usersInfo &&
            Object.values(usersInfo).map((userInfo, index) => (
              <PersonalHistory
                key={index}
                userName={usersName[index]}
                prices={userInfo.prices}
                titles={userInfo.titles}
              />
            ))}
        </div>
        <div className="absolute bottom-10 right-8">
          <button className="btn bg-slate-700 hover:bg-slate-600 text-white" onClick={handleClickSettle}>
            정산하기
          </button>
        </div>
      </div>
      {settleResult ? <SettlementResult settleResult={settleResult} /> : <div className="w-56"></div>}
    </div>
  );
};

export default Room;
