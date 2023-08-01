import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { updateUserPrice } from '../service/database';

const InputPrice = ({ roomCode }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handlePriceChange = e => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    updateUserPrice(roomCode, user.uid, parseInt(price), title);
    setPrice('');
    setTitle('');
  };

  return (
    <div className="flex flex-wrap bg-white px-5 py-2 items-center rounded-md w-fit">
      <p className="font-bold text-lg">내가 결제한 내역 : </p>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="내용"
          className="input input-bordered w-24 max-w-xs my-2 text-base text-center mx-5"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="금액"
          className="input input-bordered w-32 max-w-xs my-2 text-base text-center"
          value={price}
          onChange={handlePriceChange}
        />
        <button className="btn bg-[#89B0AE] hover:bg-[#8FB8B6] text-white ml-5" onClick={handleSubmit}>
          추가
        </button>
      </div>
    </div>
  );
};

export default InputPrice;
