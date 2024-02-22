import { motion } from 'framer-motion';

import Wrapper from 'components/wrapper';

import { EPage } from 'utils/constants';

const Dashboard = () => {
  return (
    <Wrapper selectedPage={EPage.DASHBOARD} toGo="left">
      <motion.div>
        <h1>Dashboard</h1>
        <h2>Coming Soon</h2>
      </motion.div>
    </Wrapper>
  );
};

export default Dashboard;
