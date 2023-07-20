import React from 'react';

const InputPrice = props => {
  return (
    <div className="flex bg-white px-5 py-2 w-full items-center rounded-md">
      <p className="w-full font-bold text-lg">내가 결제한 내역 : </p>
      <input
        type="text"
        placeholder="내용"
        className="input input-bordered w-24 max-w-xs my-2 text-base text-center mx-5"
      />
      <input type="text" placeholder="금액" className="input input-bordered w-32 max-w-xs my-2 text-base text-center" />
      <button className="btn bg-[#89B0AE] hover:bg-[#8FB8B6] text-white ml-5">추가</button>
    </div>
  );
};

export default InputPrice;
