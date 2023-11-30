import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateNumber } from '../../redux/numberSlice';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import './GameDummy.module.css';
const GameDummy = () => {
  const dispatch = useDispatch();
  const autoGeneratedNumber = useSelector((state) => state.number.autoGeneratedNumber);
  const [savedNumber, setSavedNumber] = useState(null);

  useEffect(() => {
    // Fetch the saved number when the component mounts
    fetchSavedNumber();
  }, []);

  const fetchSavedNumber = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const userId = user.uid;
    const userDocRef = doc(db, 'Users', userId);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setSavedNumber(userData.autoGeneratedNumber);
      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching saved number from Firestore:', error);
    }
  };

  const handleGenerateNumber = () => {
    dispatch(generateNumber());
  };

  const handleSaveNumber = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const userId = user.uid;
    const numberToSave = autoGeneratedNumber;

    const userDocRef = doc(db, 'Users', userId);

    try {
      const updatedUserData = {
        autoGeneratedNumber: numberToSave,
      };

      await setDoc(userDocRef, updatedUserData, { merge: true });
      console.log('Auto-generated number saved to Firestore!');
      setSavedNumber(numberToSave);
    } catch (error) {
      console.error('Error saving auto-generated number to Firestore:', error);
    }
  };

  return (
    <div className="container">
      <button className="button generate-button" onClick={handleGenerateNumber}>Generate Random Number</button>
      <button className="button save-button" onClick={handleSaveNumber}>Save Number</button>
      <div className="number-display">Auto-generated Number: {autoGeneratedNumber}</div>
      <div className="saved-number-display">Saved Number: {savedNumber}</div>
    </div>
  );
};

export default GameDummy;