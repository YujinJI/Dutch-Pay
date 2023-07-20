import React, { useContext, useEffect, useState } from 'react';
import AvatarImage from '../assets/images/avatar.jpeg';
import AuthContext from '../context/AuthContext';
import { getUserInfo, updateUserAccount } from '../service/database';

const Header = props => {
  const { user, isLoggedIn, logOut } = useContext(AuthContext);
  const bankInfo = [
    'NH농협',
    '국민은행',
    '기업은행',
    '산업은행',
    '신한은행',
    '우리은행',
    '하나은행',
    '한국씨티은행',
    'SC제일은행',
    '카카오뱅크',
    '케이뱅크',
    '토스뱅크',
    '경남은행',
    '부산은행',
    '새마을금고',
    '우체국',
  ];

  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [userInfo, setUserInfo] = useState(null); // userInfo를 저장할 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userAccountInfo = await getUserInfo(user.uid); // getUserInfo 함수 호출하여 데이터 가져오기
        setUserInfo(userAccountInfo); // 가져온 데이터를 상태에 저장
        if (userAccountInfo && userAccountInfo.accountInfo) {
          setAccount(userAccountInfo.accountInfo.account);
          setBank(userAccountInfo.accountInfo.bank);
        } else {
          const accountInfo = {
            bank: '',
            account: '',
          };
          updateUserAccount(user.uid, accountInfo);
        }
      } catch (error) {
        console.error('Failed to fetch user Info: ', error);
      }
    };

    if (isLoggedIn && user) {
      // user가 존재할 때만 fetchUserInfo 함수 호출
      fetchUserInfo();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    console.log('userInfo', userInfo);
    if (userInfo && userInfo.accountInfo) {
      setAccount(userInfo.accountInfo.account);
      setBank(userInfo.accountInfo.bank);
    }
  }, [userInfo]);

  useEffect(() => {
    const accountInfo = {
      bank: bank,
      account: account,
    };
    updateUserAccount(user.uid, accountInfo);
  }, [bank, account]);

  const handleAccountChange = e => {
    setAccount(e.target.value);
  };

  const handleBankChange = e => {
    setBank(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl font-doHyeon font-thin">💸 더치페이</a>
      </div>
      {isLoggedIn && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={AvatarImage} alt="avatar image" />
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <div className="card-actions gap-0 items-baseline">
                  <span className="font-bold text-lg">{userInfo ? userInfo.name : ''}</span>
                  <span className="font-bold text-md">님 계좌</span>
                  <button
                    className="btn btn-link btn-xs text-black underline pl-1"
                    onClick={() => window.account_modal.showModal()}
                  >
                    수정
                  </button>
                  <dialog id="account_modal" className="modal">
                    <form method="dialog" className="modal-box">
                      <h2 className="font-bold text-2xl">계좌번호를 입력하세요</h2>
                      <p className="pb-4 pt-2 text-slate-500">※ 동료들에게 공유되는 계좌번호입니다.</p>
                      <select
                        className="select select-bordered w-full max-w-xs my-2 text-base"
                        onChange={handleBankChange}
                        value={bank}
                      >
                        <option value="">은행을 선택해 주세요</option>
                        {bankInfo.map((bank, index) => (
                          <option key={index}>{bank}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="계좌번호를 입력해 주세요"
                        className="input input-bordered w-full max-w-xs my-2 text-base"
                        onChange={handleAccountChange}
                        value={account}
                      />
                      <div className="modal-action">
                        <button className="btn bg-slate-700 hover:bg-slate-600 text-white">완료</button>
                      </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
                <span className="text-info">
                  {bank}/{account}
                </span>
                <div className="card-actions">
                  <button className="btn bg-slate-700 btn-block text-white hover:bg-slate-600" onClick={logOut}>
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
