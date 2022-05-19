import classes from '../../styles/profile/ProfileForm.module.scss';
import { useState } from 'react';
import Button from '../ui/Button';

function ProfileForm(props) {
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

    function submitHandler(event) {
        event.preventDefault();

        if (newPwd !== curPwd) {
            return;
        }

        props.onChangePassword({
            oldPassword: curPwd,
            newPassword: newPwd,
        });
    }
    return (
        <form className={classes.ProfileForm} onSubmit={submitHandler}>
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

export default ProfileForm;
