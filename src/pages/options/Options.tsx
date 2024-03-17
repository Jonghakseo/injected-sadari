import React from 'react';
import '@pages/options/Options.css';
import useStorage from '@src/shared/hooks/useStorage';
import configStorage from '@src/shared/storages/configStorage';

const Options: React.FC = () => {
  const { isActivated, victim, target } = useStorage(configStorage);

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDatas = new FormData(e.currentTarget);
    const isActivated = formDatas.get('isActivated') === 'on';
    const victim = formDatas.get('victim') as string;
    const target = formDatas.get('target') as string;

    try {
      await configStorage.set(config => ({
        ...config,
        victim,
        target,
        isActivated,
      }));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="container">
      <h2>사용 가이드</h2>
      <ul>
        <li>활성화 여부: 활성화 여부 변경시 네이버 사다리 페이지 새로고침 혹은 재접속이 필요합니다.</li>
        <li>희생자 이름: 사다리 위쪽에 입력할 희생자의 이름을 입력합니다. 이름은 완벽히 일치해야 합니다.</li>
        <li>
          목표 키워드: 희생자의 사다리가 도착할 목표입니다. 사다리 아래에 입력되는 값입니다. 목표 키워드는 정확히
          일치해야 합니다.
        </li>
      </ul>

      <br />
      <h2>설정</h2>
      <form className="config-form" onSubmit={onSave}>
        <label>
          활성화 여부
          <input name="isActivated" type="checkbox" defaultChecked={isActivated} />
        </label>
        <label>
          희생자 이름
          <input required name="victim" type="text" defaultValue={victim} />
        </label>
        <label>
          목표 키워드
          <input required name="target" type="text" defaultValue={target} />
        </label>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default Options;
