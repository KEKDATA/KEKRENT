import Queue from 'bull';
import { OPTIONS } from './config';

const webQueue = new Queue('web', OPTIONS);