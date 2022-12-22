import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import auth from './firebase.init';

function App() {
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);
  return (    
    <div className=''>
      <p className='text-center text-3xl font-semibold text-sky-500'>{user ? user.displayName  : "No User Login"}</p>
      <button className='bg-red-300 p-5 rounded-md' onClick={() => signOut()}>sign out</button>
      <Registration/>
      <Login/>
    </div>
  );
}

export default App;
