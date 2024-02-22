import { useContext, useState } from 'react';
import { IoCopyOutline, IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { closeBattleInfo } from 'store/reducers/globalState';

import { ISocketContextType, SocketContext } from 'context/SocketContext';

import styles from './styles.module.css';
import toast from 'react-simple-toasts';

const BattleInfo = () => {
  const { roomId } = useContext(SocketContext) as ISocketContextType;
  const [copied, setCopied] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleCopyRoom = () => {
    if (copied) return;
    navigator.clipboard
      .writeText(roomId)
      .then((res) => {
        setCopied(true);
        toast('Copied to clipboard');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="relative">
      <h2 className="text-3xl">Battle Info</h2>
      <div className="mt-4 flex justify-between items-center gap-6 border border-slate-400 px-4 py-2 rounded-sm">
        <h3 className="text-xl">Room Id:</h3>
        <div className="flex flex-nowrap items-center gap-2 text-xl text-slate-700 font-mono">
          <span className="font-mono">{roomId}</span>
          <div onClick={handleCopyRoom} className="relative">
            <div data-after-content="Copy Room Id" className={styles.info}>
              <IoCopyOutline className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <IoClose
        onClick={() => dispatch(closeBattleInfo())}
        size={24}
        className="absolute top-[-30%] right-[-10%] cursor-pointer"
      ></IoClose>
    </div>
  );
};

export default BattleInfo;
