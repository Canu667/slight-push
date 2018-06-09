import React from 'react';
import { auth, googleAuthProvider } from '../firebase';

const SignIn = () =>
      <div className="signin">
        <button type="button" className="btn btn-success" onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign in</button>
      </div>


export default SignIn;
