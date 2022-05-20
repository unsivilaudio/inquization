import { useState } from 'react';

import axios from '../../helpers/with-axios';
import Button from '../ui/Button';
import classes from '../../styles/profile/PasswordChange.module.scss';

async function changePassword(password, nextPassword) {
    return await axios.patch('/user/change-password', {
        password,
        nextPassword,
    });
}

function PasswordChange(props) {
    const [curPwd, setCurPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newPwdConfirm, setNewPwdConfirm] = useState('');

    function handleChangeCur(e) {
        setCurPwd(e.target.value);
    }

    function handleChangeNew(e) {
        setNewPwd(e.target.value);
    }

    function handleChangeNewConf(e) {
        setNewPwdConfirm(e.target.value);
    }

    async function submitHandler(event) {
        event.preventDefault();

        if (newPwd !== newPwdConfirm) {
            console.log('New passwords do not match.');
            return;
        }

        await changePassword(curPwd, newPwd);
    }
    return (
        <form className={classes.PasswordChange} onSubmit={submitHandler}>
            <div className={classes.Title}>Change Your Password</div>
            <div className={classes.FormGroup}>
                <label htmlFor='current'>Current Password</label>
                <input
                    type='password'
                    id='current'
                    onChange={handleChangeCur}
                    value={curPwd}
                />
            </div>
            <div className={classes.FormGroup}>
                <label htmlFor='candidate'>New Password</label>
                <input
                    type='password'
                    id='candidate'
                    onChange={handleChangeNew}
                    value={newPwd}
                />
            </div>
            <div className={classes.FormGroup}>
                <label htmlFor='candidate-confirm'>Confirm New Password</label>
                <input
                    type='password'
                    id='candidate-confirm'
                    onChange={handleChangeNewConf}
                    value={newPwdConfirm}
                />
            </div>
            <div className={classes.Actions}>
                <Button type='submit'>Change Password</Button>
            </div>
        </form>
    );
}

export default PasswordChange;
