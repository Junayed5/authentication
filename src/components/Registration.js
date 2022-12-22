import React, { useReducer } from 'react';
import auth from '../firebase.init';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';

const Registration = () => {
    //state management
    const initialState = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
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

    // create new user
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);

    //email verification
    const [sendEmailVerification, sending, vError] = useSendEmailVerification(auth);
    //profile update
    const [updateProfile, updating, pError] = useUpdateProfile(auth);


    const registerSubmit = async (e) => {
        e.preventDefault();
        console.log(state);
        const { email, password, name, phone } = state
        await createUserWithEmailAndPassword(email, password);

        const profile = await updateProfile({ displayName: name, phoneNumber: phone })
        if (profile) {
            console.log('successfully profile update');
        }
        const verify = await sendEmailVerification();
        if (verify) {
            console.log('success verify');
        }

    }

    return (
        <div>
            <div className='border border-black rounded-md shadow-2xl bg-slate-200 h-[600px] w-96 mx-auto mt-10 p-5'>
                <h1 className='text-3xl font-semibold text-center'>Create an account</h1>

                <form onSubmit={registerSubmit}>
                    <label htmlFor="text" className='block mb-[-20px] mt-4'>Your Name</label><br />
                    <input type="text" name="name" id="name " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />

                    <label htmlFor="email" className='block mb-[-20px] mt-4'>Your Email</label><br />
                    <input type="email" name="email" id="email " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />

                    <label htmlFor="email" className='block mb-[-20px] mt-4'>Password</label><br />
                    <input type="password" name="password" id="password " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />

                    <label htmlFor="text" className='block mb-[-20px] mt-4'>Phone</label><br />
                    <input type="text" name="phone" id="phone " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />
                    
                    <label htmlFor="text" className='block mb-[-20px] mt-4'>Address</label><br />
                    <input type="text" name="address" id="address " className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' onChange={e => dispatch({ type: "INPUT", payload: { name: e.target.name, value: e.target.value } })} />

                    <input type="submit" value="Registration" className='h-10 w-28 rounded-md  bg-blue-400 mt-4 text-white hover:bg-blue-500' />


                    <p className='mt-3'>Already have an account <a className='text-blue-600' href="/">Please Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default Registration;