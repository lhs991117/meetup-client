import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.svg?react';
import useUserStore from '@/stores/user/useUserStore';

import styles from './HomeHeader.module.scss';

const HomeHeader = ({ modalOpen, setModalOpen }) => {
  const { geo } = useUserStore();

  const handleClickGeo = () => {
    setModalOpen(true)
  };
  return (
    <header className={styles.home_header}>
      <div className={styles.header_left} onClick={handleClickGeo}>
        {geo.district ? geo.district : '지역'}
        <ChevronRightIcon />
      </div>
    </header>
  );
};

export default HomeHeader;
