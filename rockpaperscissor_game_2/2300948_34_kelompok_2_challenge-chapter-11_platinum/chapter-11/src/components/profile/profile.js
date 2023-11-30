// Profile.js
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import {
  setUserData,
  setBio,
  setCity,
  setEditMode,
} from "../../redux/profileSlice";

const Profile = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const { userData, bio, city, editMode } = useSelector(
    (state) => state.profile
  );

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "Users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          dispatch(setUserData(userDocSnapshot.data()));
          dispatch(setBio(userDocSnapshot.data().bio));
          dispatch(setCity(userDocSnapshot.data().city));
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser, dispatch]);

  const handleSaveProfile = async () => {
    if (user) {
      const userId = user.uid;
      const userDocRef = doc(db, "Users", userId);

      try {
        // Update the user's profile data in Firebase
        await updateDoc(userDocRef, {
          bio: bio,
          city: city,
        });

        // Fetch updated user data from Firestore
        const updatedUserDocSnapshot = await getDoc(userDocRef);

        if (updatedUserDocSnapshot.exists()) {
          const updatedUserData = updatedUserDocSnapshot.data();

          // Update Redux state with the latest data
          dispatch(setUserData(updatedUserData));
          dispatch(setBio(updatedUserData.bio));
          dispatch(setCity(updatedUserData.city));
        }

        dispatch(setEditMode(false)); // Dispatch the setEditMode action to Redux
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
        <Card className="profile-card">
          <Card.Header className="profile-header">Profile</Card.Header>
          <Card.Body className="d-flex justify-content-center text-center">
            <Form>
              <Form.Group>
                <Form.Label className="bold-label">Username:</Form.Label>
                <Form.Control
                  className="text-center"
                  type="text"
                  readOnly
                  value={userData?.username || ""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold-label">Email:</Form.Label>
                <Form.Control
                  className="text-center"
                  type="text"
                  readOnly
                  value={userData?.email || ""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold-label">Total Wins:</Form.Label>
                <Form.Control
                  className="text-center"
                  type="text"
                  readOnly
                  value={userData?.totalWins || ""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="bold-label">Total Losses:</Form.Label>
                <Form.Control
                  className="text-center"
                  type="text"
                  readOnly
                  value={userData?.totalLosses || ""}
                />
              </Form.Group>

              {editMode ? (
                <>
                  <Form.Group controlId="formBio">
                    <Form.Label className="bold-label">Bio</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your bio"
                      value={bio || ""}
                      onChange={(e) => dispatch(setBio(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCity">
                    <Form.Label className="bold-label">City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your city"
                      value={city || ""}
                      onChange={(e) => dispatch(setCity(e.target.value))}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label className="bold-label">Bio:</Form.Label>
                    <Form.Control
                      className="text-center"
                      type="text"
                      readOnly
                      value={userData?.bio || ""}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="bold-label">City:</Form.Label>
                    <Form.Control
                      className="text-center"
                      type="text"
                      readOnly
                      value={userData?.city || ""}
                    />
                  </Form.Group>
                </>
              )}

              {!editMode ? (
                <Button
                  variant="primary"
                  onClick={() => dispatch(setEditMode(true))}
                  className="mt-3"
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  className="mt-3"
                >
                  Save Profile
                </Button>
              )}
            </Form>
            {/* Include other profile fields here */}
          </Card.Body>
        </Card>
  );
};

export default Profile;
