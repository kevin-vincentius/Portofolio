import React from "react";
import { Card } from "react-bootstrap";
import { useSearchParams } from "next/navigation";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const bio = searchParams.get("bio");
  const city = searchParams.get("city");
  const totalWins = searchParams.get("totalWins");
  const totalLosses = searchParams.get("totalLosses");

  return (
    <Card className="profile-card">
      <Card.Header className="profile-header">Profile {username}</Card.Header>
      <Card.Body>
        <Card.Text className="profile-text">Username : {username}</Card.Text>
        <Card.Text className="profile-text">Email : {email}</Card.Text>
        <Card.Text className="profile-text">Bio : {bio}</Card.Text>
        <Card.Text className="profile-text">City : {city}</Card.Text>
        <Card.Text className="profile-text">Total Wins : {totalWins}</Card.Text>
        <Card.Text className="profile-text">
          Total Losses : {totalLosses}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
