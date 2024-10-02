import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard/dashboard.css';
import '../members/members.css';

export default function AddMember() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // État de chargement

    // useEffect(() => {
    //     // Récupérer tous les utilisateurs
    //     axios.get("http://127.0.0.1:8000/api/v1.0.0/show_user", {
    //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    //     })
    //     .then((res) => {
    //         if (Array.isArray(res.data.data)) {
    //             setUsers(res.data.data); 
    //         }
    //         setLoading(false); // Arrête le chargement après réception
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         setLoading(false); // Arrête aussi en cas d'erreur
    //     });
    // }, []);
    const response = axios.get("http://127.0.0.1:8000/api/v1.0.0/show_user");
    console.log(response);
    
    useEffect(()=>{

        const fetchUsers = async () =>{
        try {
            
            const data = response.data;
            setUsers(data);
            console.log(data);
            
            console.log('ixi');
            
        } catch (error) {
            console.log(error);
            
        }
    }
    })


    return (

        <div>
            coucou
        </div>
        // <div className="d-flex justify-content-center align-items-center vh-100">
        //     <div className="card bg-success text-white" style={{ width: '25rem' }}>
        //         <div className="card-body">
        //             <h5 className="card-title">Utilisateursgggg</h5>

        //             <div className="content-messages">
        //                 {loading ? (
        //                     <p>Chargement des utilisateurs...</p>
        //                 ) : (
        //                     <ul className="list-user">
        //                         {users.map((user) => (
        //                             <li key={user.id} className="list-user-item bg-transparent border-light">
        //                                 <div
        //                                     className="text-white"
        //                                     style={{ textAlign: 'left', padding: '0.5rem' }}
        //                                 >
        //                                     {user.email} {/* Affiche uniquement l'email */}
        //                                 </div>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
