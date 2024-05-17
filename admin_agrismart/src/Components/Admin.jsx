import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../Firebase/config';  
import '../CSS/Admin.css';

const Admin = () => {
    const [cropPrices, setCropPrices] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const fetchCropPrices = async () => {
        try {
            const response = await axios.get('https://agrismart-admin-vaibhav-b8hl.vercel.app');
            setCropPrices(response.data.data);
        } catch (error) {
            console.error('Error fetching crop prices:', error);
        }
    };

    useEffect(() => {
        const checkUserLoggedIn = () => {
            const user = auth.currentUser;
            setUserLoggedIn(user !== null);
            if (user !== null) {
                fetchCropPrices();
            }
        };

        checkUserLoggedIn();

        const unsubscribe = auth.onAuthStateChanged(checkUserLoggedIn);
        return unsubscribe;
    }, []);

    return (
        <div>
            {userLoggedIn ? (
                <>
                    <h2 className='headAdmin'>Welcome to the Admin page</h2>
                    <div className="cropLists">
                        {cropPrices.map((crop, index) => (
                            <div className='cropItem' key={index}>
                                <h1>{index + 1}. Crop name: {crop.cropName}</h1>
                                <h2>User : {crop.userName}</h2>
                                <h2>Proposed Price: Rs. {crop.proposedPrice}</h2>
                                <h2>Address : {crop.userAddress}</h2>
                                <h2>Phone : {crop.userPhoneNum}</h2>
                                {/* <h3>Proposed by User ID: {crop.userId}</h3> */}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2 style={{ color: "red", textAlign: "center" }}>Kindly Login to view this page</h2>
            )}
        </div>
    );
}

export default Admin;
