import React from 'react';
import { auth } from '../firebase';

const SignOut = () =>
      <div className="signout">
        <button type="button" className="btn btn-success" onClick={() => auth.signOut()}>Log Out</button>
      </div>


export default SignOut;
