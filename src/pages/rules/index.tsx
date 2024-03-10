import { motion } from 'framer-motion';

import { useAppDispatch } from 'hooks';

import Button from 'components/button';
import Wrapper from 'components/wrapper';

import { switchToHome } from 'store/reducers/globalState';

import { EPage } from 'utils/constants';

function Rules(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Wrapper selectedPage={EPage.RULES} toGo="right">
      <motion.div className="text-center h-full flex flex-col justify-around">
        <motion.div>
          <h1 className="text-9xl">Rules</h1>
        </motion.div>
        <motion.div>
          <Button onClick={() => dispatch(switchToHome())}> Go Back</Button>
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}

export default Rules;
