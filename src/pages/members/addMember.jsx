import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom';
import '../members/members.css';

export default function AddMember() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentGroup, setCurrentGroup] = useState(localStorage.getItem("group_id"));
    const navigate = useNavigate();

    async function connexion() {
        const response = await axios.get("http://127.0.0.1:8000/api/v1.0.0/show_user",
            { headers: { 'Authorization': `Bearer ` + localStorage.getItem('token'), } });
        setLoading(false);
        setUsers(response.data.utilisateurs);
    }
    console.log(localStorage.getItem('token'));
    

    // Fonction pour ajouter un utilisateur au groupe
    const addUserToGroup = async (user_id) => {
        try {
            // Envoie la requête pour ajouter l'utilisateur
            // const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/member/1/1`,
            await axios.post(`http://127.0.0.1:8000/api/v1.0.0/member/${user_id}/${currentGroup}`, {},
                { headers: { 'Authorization': `Bearer ` + localStorage.getItem('token'), } });

            navigate('/groups');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    useEffect(() => {
        connexion();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100">
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Utilisateurs</h5>
                            <div className="content-messages">
                                {loading ? (
                                    <p>Chargement des utilisateurs...</p>
                                ) : (
                                    <ul className="list-user">
                                        {users.map((user) => (
                                            <li key={user.id} className="list-user-item bg-transparent border-light">
                                                <div className="email-add d-flex justify-content-between align-items-center" style={{ padding: '0.5rem' }}>
                                                    <span>{user.email}</span>
                                                    {/* Bouton pour ajouter l'utilisateur */}
                                                    <button
                                                        className="btn btn-light btn-sm"
                                                        onClick={() => addUserToGroup(user.id)}>
                                                        Ajouter
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
