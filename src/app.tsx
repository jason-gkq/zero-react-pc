import { createApp } from '@/zero';
import model from './app.model';
import './app.less';

export default createApp({ isNeedLogin: true }, model);
