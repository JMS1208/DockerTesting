// events.ts
import EventEmitter from 'events';

class AuthEventEmitter extends EventEmitter {}
export const authEvents = new AuthEventEmitter();
