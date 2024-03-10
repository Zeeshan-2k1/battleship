import { motion } from 'framer-motion';

import Wrapper from 'components/wrapper';

import { EPage } from 'utils/constants';

function Settings(): JSX.Element {
  return (
    <Wrapper selectedPage={EPage.SETTINGS} toGo="left">
      <motion.div>
        <h1>Settings</h1>
        <h2>Coming Soon</h2>
      </motion.div>
    </Wrapper>
  );
}

export default Settings;
