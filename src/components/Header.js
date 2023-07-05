import React from 'react';
import AvatarImage from '../assets/images/avatar.jpeg';

const Header = props => {
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

  return (
    <div className="navbar bg-base-100 shadow-sm fixed">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl font-doHyeon font-thin">💸 더치페이</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={AvatarImage} alt="avatar image" />
            </div>
          </label>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <div className="card-actions items-baseline">
                <span className="font-bold text-lg">내 계좌</span>
                <button
                  className="btn btn-link btn-xs text-black underline p-0"
                  onClick={() => window.account_modal.showModal()}
                >
                  수정
                </button>
                <dialog id="account_modal" className="modal">
                  <form method="dialog" className="modal-box">
                    <h2 className="font-bold text-2xl">계좌번호를 입력하세요</h2>
                    <p className="pb-4 pt-2 text-slate-500">※ 동료들에게 공유되는 계좌번호입니다.</p>
                    <select className="select select-bordered w-full max-w-xs my-2 text-base">
                      <option>은행을 선택해 주세요</option>
                      {bankInfo.map((bank, index) => (
                        <option key={index}>{bank}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="계좌번호를 입력해 주세요"
                      className="input input-bordered w-full max-w-xs my-2 text-base"
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
              <span className="text-info">농협: 123-4567-8901-23</span>
              <div className="card-actions">
                <button className="btn bg-slate-700 btn-block text-white hover:bg-slate-600">로그아웃</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
