import React from 'react';
import './ProductModalWindow.scss'
import { useContext, useState , useEffect} from 'react';
import ModalContext from '../context/OtherContexts';


function ProductModal() {
    let { setModal } = useContext(ModalContext);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (setModal) setModal();
    }
    const submitOutBody = (event: React.MouseEvent<HTMLDivElement>) => {
        if (setModal) setModal();
    }
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Name cannot be empty!');
    const [telephone, setTelephone] = useState('');
    const [telephoneDirty, setTelephoneDirty] = useState(false);
    const [telephoneError, setTelephoneError] = useState('Phone cannot be empty!');
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email cannot be empty!');
    const [formValid, setFormValid] = useState(false);
    const nameHandler = (e: React.FormEvent<HTMLInputElement>) =>{
        setName(e.currentTarget.value);
        const nameReg = /^[a-z ,.'-]+$/i;
        if(e.currentTarget.value.length === 0){
            setNameError('Name cannot be empty!');
        } else if(!nameReg.test(e.currentTarget.value.toString().toLowerCase())){
            setNameError('Incorrect name!');
        }  else {
            setNameError('');
        }
    }
    const emailHandler = (e: React.FormEvent<HTMLInputElement>) =>{
        setEmail(e.currentTarget.value);
        const emReg = /^(([^<>()[\].,;:\s@']+(\.[^<>()[\].,;:\s@']+)*)|('.+'))@(([^<>()[\].,;:\s@']+\.)+[^<>()[\].,;:\s@']{2,})$/iu;
        if(e.currentTarget.value.length === 0){
            setEmailError('Email cannot be empty!');
        } else if(!emReg.test(e.currentTarget.value.toString().toLowerCase())){
            setEmailError('Incorrect email!');
        }  else {
            setEmailError('');
        }
    }
    const telHandler = (e: React.FormEvent<HTMLInputElement>) =>{
        const telReg = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
        console.log('telHandler');
        if(e.currentTarget.value.length === 0){
            setTelephoneError('Phone cannot be empty!');
        } else if(!telReg.test(e.currentTarget.value.toString().toLowerCase())){
            setTelephoneError('Incorrect phone!');
        }  else {
            setTelephoneError('');
        }
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.name);
        if (e.currentTarget.name === 'email') {
            setEmailDirty(true);
        } else if (e.currentTarget.name === 'tel'){
            setTelephoneDirty(true);
        } else if (e.currentTarget.name === 'name'){
            setNameDirty(true);
        }
    }
    useEffect(() => {
        if(emailError || telephoneError || nameError){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, telephoneError, nameError])
    return (
        <>
            <div onClick={submitOutBody} className='modal-outbody'></div>
            <div className='modal-body'>
                <form action='#' onSubmit={submitHandler}>
                    <h2>Personal Details</h2>
                    <div className='input-block'>
                        <input required onInput={e => nameHandler(e)} onBlur={e => blurHandler(e)} name='name' className='input' type='text' placeholder='Name' />
                        {(nameDirty && nameError) && <p className='error-message'>{nameError}</p>}
                    </div>
                    <div className='input-block'>
                        <input required onInput={e => telHandler(e)} onBlur={e => blurHandler(e)} name='tel' className='input' type='text' placeholder='+375441234567' />
                        {(telephoneDirty && telephoneError) && <p className='error-message'>{telephoneError}</p>}
                    </div>
                    <div className='input-block'>
                        <input required className='input' type='text' placeholder='Minsk, Nikiforova, 9a' />
                    </div>
                    <div className='input-block'>
                        <input required onInput={e => emailHandler(e)} onBlur={e => blurHandler(e)} name='email' value={email} className='input' type='email' placeholder='lolkek@gmail.com' />
                        {(emailDirty && emailError) && <p className='error-message'>{emailError}</p>}
                    </div>
                    <input required className='input card-number' type='text' placeholder='Card number' />
                    <input required className='input valid' type='text' placeholder='Valid Thru' />
                    <input required className='input cvv' type='text' placeholder='Code' />
                    <h2 className='modal-credit-h2'>Credit card details</h2>
                    <div className='card-info'>
                        <p className='p-valid'>Valid Thru</p>
                        <p className='p-cvv'>CVV</p>
                    </div>
                    <button disabled={!formValid}type='submit'>Confirm</button>
                </form>
            </div>
        </>)
}

export default ProductModal;