import React, { useState, useEffect } from 'react';
import '../dashboard/dashboard.css';
import '../dashboard/tailwindcss-colors.css';
import axios from 'axios';

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null); // État pour l'ID du groupe sélectionné
    const [messages, setMessages] = useState([]); // État pour les messages du groupe sélectionné
    const currentUserId = localStorage.getItem("user_id");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1.0.0/show_group", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            setGroups(res.data.data[0]);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    // Fonction pour gérer le clic sur un groupe
    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId);
        fetchMessages(groupId); // Appeler la fonction pour récupérer les messages du groupe
    };

    // Fonction pour récupérer les messages du groupe sélectionné
    const fetchMessages = (groupId) => {
        axios.get(`http://127.0.0.1:8000/api/v1.0.0/groups/${groupId}/messages`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            setMessages(res.data.data); // Mettre à jour les messages avec les données récupérées
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <section className="chat-section">
            <div className="chat-container">
                <aside className="chat-sidebar">
                    <a href="#" className="chat-sidebar-logo">
                        <i className="ri-chat-1-fill"></i>
                    </a>
                    <ul className="chat-sidebar-menu">
                        {/* Menu Sidebar */}
                    </ul>
                </aside>

                <div className="chat-content">
                    <div className="content-sidebar">
                        <div className='bet'>
                            <div className="content-sidebar-title left">Groupes</div>
                            <a href="/createGroup"><i className="ri-add-fill rigth"></i></a>
                        </div>

                        <form className="content-sidebar-form">
                            <input type="search" className="content-sidebar-input" placeholder="Recherches..." />
                            <button type="submit" className="content-sidebar-submit">
                                <i className="ri-search-line"></i>
                            </button>
                        </form>

                        <div className="content-messages">
                            <ul className="content-messages-list">
                                {groups
                                    .filter(group => group.user_id === parseInt(currentUserId))
                                    .map((group) => (
                                        <li key={group.id}>
                                            <a href="#" onClick={() => handleGroupClick(group.id)}>
                                                <img
                                                    className="content-message-image"
                                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                                    alt="profile"
                                                />
                                                <span className="content-message-info">
                                                    <span className="content-message-name">{group.name}</span>
                                                    <span className="content-message-text">{group.description}</span>
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* Conversation */}
                    {selectedGroupId ? (
                        <div className="conversation">
                            {groups
                                .filter(group => group.id === selectedGroupId) // Filtrer la conversation du groupe sélectionné
                                .map((group) => (
                                    <div className="conversation" key={group.id}>
                                        <div className="conversation-top">
                                            <button type="button" className="conversation-back" onClick={() => setSelectedGroupId(null)}>
                                                <i className="ri-arrow-left-line"></i>
                                            </button>
                                            <div className="conversation-user">
                                                <img
                                                    className="conversation-user-image"
                                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                                                    alt=""
                                                />
                                                <div>
                                                    <div className="conversation-user-name">{group.name}</div>
                                                    <div className="conversation-user-status online">online</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="conversation-main">
                                            <ul className="conversation-wrapper">
                                                {messages.map(message => (
                                                    <li className="conversation-item" key={message.id}>
                                                        <div className="conversation-item-side">
                                                            <img
                                                                className="conversation-item-image"
                                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="conversation-item-content">
                                                            <div className="conversation-item-wrapper">
                                                                <div className="conversation-item-box">
                                                                    <div className="conversation-item-text">
                                                                        <p>{message.text}</p>
                                                                        <div className="conversation-item-time">{message.time}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="conversation-form">
                                            <button type="button" className="conversation-form-button">
                                                <i className="ri-emotion-line"></i>
                                            </button>
                                            <div className="conversation-form-group">
                                                <textarea
                                                    className="conversation-form-input"
                                                    rows="1"
                                                    placeholder="Type here..."
                                                ></textarea>
                                                <button type="button" className="conversation-form-record">
                                                    <i className="ri-mic-line"></i>
                                                </button>
                                            </div>
                                            <button type="button" className="conversation-form-button conversation-form-submit">
                                                <i className="ri-send-plane-2-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className={`conversation active`}>
                            <i className="ri-chat-3-line"></i>
                            <p>Select a group to view the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
