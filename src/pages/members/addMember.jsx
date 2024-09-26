import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../dashboard/dashboard.css';
import '../members/members.css';

export default function AddMember() {
    const [users, setUsers] = useState([]);
    const [memberName, setMemberName] = useState(''); // État pour le champ de recherche

    useEffect(() => {
        // Fetch des utilisateurs depuis l'API
        axios.get("http://127.0.0.1:8000/api/v1.0.0/show_user", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
            if (Array.isArray(res.data.data)) {
                setUsers(res.data.data); 
            }
        })
        .catch((err) => {
            console.error(err); // Juste pour la détection des erreurs
        });
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card bg-success text-white" style={{ width: '25rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Utilisateurs</h5>

                    <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            className="form-control me-2"
                            placeholder="Recherches..."
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                        <button type="submit" className="btn btn-light">
                            <i className="ri-search-line"></i>
                        </button>
                    </form>

                    <div className="content-messages">
                        <ul className="list-user">
                            {/* Affichage de tous les utilisateurs */}
                            {users.map((user) => (
                                <li key={user.id} className="list-user-item bg-transparent border-light">
                                    <button
                                        className="btn text-white d-flex align-items-center"
                                        style={{ background: 'transparent', border: 'none', padding: '0', textAlign: 'left' }}
                                    >
                                        <img
                                            className="content-message-image rounded-circle me-2"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="user profile"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                        <div className="content-message-info">
                                            <span className="content-message-name">{user.name}</span>
                                            <span className="content-message-text">{user.email}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
