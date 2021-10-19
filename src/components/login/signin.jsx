import firebase from '../../firebase';
import { app } from '../../firebase';
import React  from 'react';

export const SignIn = ()=> {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      app.auth().signInWithPopup(provider);
    }
    return (
      <div>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    )
  }