import './sign-up-form.styles.scss';

import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );

        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (e) {
        if (e.code === 'auth/email-already-in-use') {
          alert('Email already in use');
        } else console.log('Error Creating User', e.message);
      }
    } else {
      alert('Passwords do not match');
      return;
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log('This is name ', name);
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleOnChange}
          value={displayName}
          name='displayName'
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleOnChange}
          value={email}
          name='email'
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleOnChange}
          value={password}
          name='password'
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleOnChange}
          value={confirmPassword}
          name='confirmPassword'
        />
        <Button type='submit'>Create User</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
