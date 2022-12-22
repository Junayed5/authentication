import { async } from '@firebase/util';
import React, { useReducer } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Login = () => {
    //state management
    const initialState = {
        name: '',
        email: '',
        password: '',
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'INPUT':
                return {
                    ...state, [action.payload.name]: action.payload.value
                }

            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    //signIn
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    //forget password
    const [sendPasswordResetEmail, sending, ] = useSendPasswordResetEmail(auth);
    //update password
    const [updatePassword, updating, uError] = useUpdatePassword(auth);

    const loginSubmit = async e => {
        e.preventDefault();
        const { email, password } = state;
        await signInWithEmailAndPassword(email, password);
    }

    return (
        <div>
            <div className='border border-black rounded-md shadow-2xl bg-slate-200 h-[450px] w-96 mx-auto mt-10 p-5'>
                <h1 className='text-3xl font-semibold text-center'>Login</h1>

                <form onSubmit={loginSubmit}>
                    <label htmlFor="text" className='block mb-[-20px] mt-4'>Your Name</label><br />
                    <input type="text" name="name" id="name " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />

                    <label htmlFor="email" className='block mb-[-20px] mt-4'>Your Email</label><br />
                    <input type="email" name="email" id="email " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />
                    
                    <label htmlFor="email" className='block mb-[-20px] mt-4'>Password</label><br />
                    <input type="password" name="password" id="password " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />


                    <div className='flex'>
                        <input type="submit" value="Login" className='h-10 w-28 rounded-md  bg-blue-400 mt-4 text-white hover:bg-blue-500' />
                        <p className='mt-5 text-blue-600 cursor-pointer' onClick={() => {sendPasswordResetEmail(state.email)}}>Forget Password</p>
                        <p className='mt-5 text-blue-600 cursor-pointer' onClick={async() => await updatePassword(state.password)}>Update Password</p>
                    </div>

                    <p className='mt-3'>Create an account <a className='text-blue-600' href="/">Please Register</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;