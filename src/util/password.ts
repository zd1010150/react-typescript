import * as _ from 'lodash';
import { passwordReg } from './regex';

export enum passwordStreeLevel{
    no='no',
    weak='weak',
    medium='medium',
    strong='strong'
}
const validateSimplePassword = (val: string): number => {
    let ls = 0;
		if(val.match(/([a-z])+/)){
			ls++;
		}
		if(val.match(/([0-9])+/)){
			ls++;
		}
		if(val.match(/([A-Z])+/)){
			ls++;
		}
		if(val.match(/[^a-zA-Z0-9]+/)){
			ls++;
        }
        return ls;
}
export const getPwdLevel = (val:string) :passwordStreeLevel => {
    const isStrongPwd = passwordReg.test(val);
    const isSimplePwd = validateSimplePassword(val) < 3;
    if(_.isEmpty(val)){ return passwordStreeLevel.no}
    else if (isStrongPwd) {
        return passwordStreeLevel.strong
    }else if(val.length < 8  || isSimplePwd) {
        return passwordStreeLevel.weak
    }else if(isSimplePwd && !isStrongPwd) {
        return passwordStreeLevel.medium;
    }else {
        return passwordStreeLevel.no;
    }
}