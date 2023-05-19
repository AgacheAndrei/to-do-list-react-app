import {proxy} from 'valtio';

const state = proxy({
   listDone: [],
   listToDo: [],
});

export default state;