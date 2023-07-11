import React, { useState } from 'react';

const SearchRoom = props => {
  const [roomCode, setRoomCode] = useState('');

  const handleCodeChange = e => {
    setRoomCode(e.target.value);
  };

  const handleSubmitCode = () => {};

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="card w-96 m-auto px-3 shadow-sm bg-white">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl font-extrabold mb-4">방 코드를 입력하세요!</h2>
          <input
            type="text"
            placeholder="방 코드 입력"
            className="input input-bordered w-full max-w-xs text-sm"
            onChange={handleCodeChange}
          />
          <div className="w-full">
            <button className="btn bg-slate-700 hover:bg-slate-600 text-white w-full" onClick={handleSubmitCode}>
              들어가기
            </button>
          </div>
          <p className="m-auto text-sm py-2">또는</p>
          <div className="card-actions w-full">
            <button
              className="btn bg-slate-700 hover:bg-slate-600 text-white w-full"
              onClick={() => window.room_modal.showModal()}
            >
              방만들기
            </button>
            <dialog id="room_modal" className="modal">
              <form method="dialog" className="modal-box">
                <h2 className="card-title mx-auto text-2xl font-extrabold mb-4">방만들기</h2>
                <p className="pb-4 pt-2 text-slate-500">모임의 이름은 무엇인가요?</p>
                <input
                  type="text"
                  placeholder="모임 이름 입력"
                  className="input input-bordered w-full max-w-xs my-2 text-base"
                />
                <div className="modal-action">
                  <button className="btn bg-slate-700 hover:bg-slate-600 text-white">완료</button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRoom;
