import React, { useState, useEffect, useRef } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Link from 'next/link';
import { auth } from "../../firebase/firebase"; // Import Firebase auth
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser; // Get the currently authenticated user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await getDocs(collection(db, "Users"));
        const userList = userCollection.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Add the user's document ID
            username: data.username,
            email: data.email,
            bio: data.bio,
            city: data.city,
            totalWins: data.totalWins,
            totalLosses: data.totalLosses,
          };
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('userlist.pdf');
    })
  }

  return (
  <>
    <div className="userlist" ref={pdfRef}>
        <h2>List of Users:</h2>
        <ListGroup>
          {users.map((user) => (
           <ListGroupItem
           key={user.id}
           className={currentUser && user.id === currentUser.uid ? "list-item highlighted-user" : "list-item"}
         >
           <Link
             href="/userlist/[username]" as={`/userlist/${user.username}?username=${user.username}&email=${user.email}&bio=${user.bio}&city=${user.city}&totalWins=${user.totalWins}&totalLosses=${user.totalLosses}`}
             className={currentUser && user.id === currentUser.uid ? "custom-link" : "custom-link"}
           >
             {user.username}
           </Link>
           {currentUser && user.id === currentUser.uid && (
               <span className="authenticated-text">Current User</span>
           )}
         </ListGroupItem>
          ))}
        </ListGroup>
    </div>
    <div className="row text-center mt-5">
            <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
    </div>
  </>

  );
};

export default UsersList;
