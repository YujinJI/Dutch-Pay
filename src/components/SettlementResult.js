import React from 'react';

const SettlementResult = ({ settleResult }) => {
  return (
    <div className="w-56 text-center bg-white">
      <h2 className="text-xl font-extrabold text-[#40798C] my-4">정산결과</h2>
      <ul>
        {settleResult.map((person, index) => (
          <li key={index} className="py-3">
            <strong>{person.name}</strong>
            {person.transactions.length > 0 ? (
              <ul>
                {person.transactions.map((transaction, index) => (
                  <li key={index}>
                    {transaction.receiverName}님에게 {Math.ceil(transaction.settleAmount)}원
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-blue-800">송금하지 않아도 됩니다 :)역</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettlementResult;
