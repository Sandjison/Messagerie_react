import React, { useState, useEffect, useRef } from 'react';
import '../dashboard/dashboard.css';
import '../dashboard/tailwindcss-colors.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null); // Stocke l'ID du groupe sélectionné
    const [groupMessages, setGroupMessages] = useState([]); // Stocke les messages du groupe
    const [messageContent, setMessageContent] = useState(''); // Contenu du message à envoyer
    const [selectedFile, setSelectedFile] = useState(false); // Fichier à envoyer (optionnel)
    const fileInputRef = useRef(null); // Référence pour l'input file

    const currentUserId = localStorage.getItem("user_id");




    useEffect(() => {
        // Fetch les groupes depuis l'API
        axios.get(`http://127.0.0.1:8000/api/v1.0.0/show_group`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => {
                setGroups(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Charger les messages du groupe sélectionné
        if (currentGroup) {
            axios.get(`http://127.0.0.1:8000/api/v1.0.0/groups/${currentGroup}/messages`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
                .then((res) => {
                    setGroupMessages(res.data.messages); // Stocke les messages du groupe
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [currentGroup]);

    // Fonction pour gérer la sélection du fichier
    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // };

    // Fonction pour gérer le changement de message
    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    };

    // Fonction pour envoyer le message
    const sendMessage = async () => {

        console.log(localStorage.getItem("token"));
        console.log(currentGroup);
        
        
            const formData = new FormData();
            formData.set('group_id', currentGroup);
            if (selectedFile) {
                formData.set('file', selectedFile);
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/file`, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response.data.data)
    };

    return (
        <section className="chat-section">
            <div className="chat-container">
                {/* start: Sidebar */}
                <aside className="chat-sidebar">
                    <a href="#" className="chat-sidebar-logo">
                        <i className="ri-chat-1-fill"></i>
                    </a>
                    <ul className="chat-sidebar-menu">
                        <li>
                            <a href="/dashboard" data-title="Messages">
                                <i className="ri-chat-3-line"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-title="Contacts">
                                <i className="ri-contacts-line"></i>
                            </a>
                        </li>
                        <li className="active">
                            <a href="#" data-title="Groupes">
                                <i className="ri-group-fill"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-title="Paramètres">
                                <i className="ri-settings-line"></i>
                            </a>
                        </li>
                    </ul>
                </aside>
                {/* end: Sidebar */}

                {/* start: Content */}
                <div className="chat-content">
                    {/* start: Content side */}
                    <div className="content-sidebar">
                        <div className='bet'>
                            <div className="content-sidebar-title left">Groupes</div>
                            <a href="/createGroup"> <i className="ri-add-fill rigth"></i> </a>
                        </div>

                        <form className="content-sidebar-form">
                            <input type="search" className="content-sidebar-input" placeholder="Recherches..." />
                            <button type="submit" className="content-sidebar-submit">
                                <i className="ri-search-line"></i>
                            </button>
                        </form>

                        <div className="content-messages">
                            <ul className="content-messages-list">
                                {/* Affichage des groupes */}
                                {groups.filter(group => group.user_id === parseInt(currentUserId)).map((group) => (
                                    <li key={group.id}>
                                        <a href="#" onClick={() => (
                                            setCurrentGroup(group.id), 
                                            localStorage.setItem("group_id", group.id)
                                )}>
                                        <img
                                            className="content-message-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="group profile"
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

                {/* start: Conversation */}
                {currentGroup ? (

                    <div className="conversation active" id="conversation-1">
                        <div className="conversation-top">
                            <button type="button" className="conversation-back" onClick={() => setCurrentGroup(null)}>
                                <i className="ri-arrow-left-line"></i>
                            </button>
                            <div className="conversation-user">
                                <img
                                    className="conversation-user-image"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" />
                                <div>
                                    <div className="conversation-user-name">
                                        {groups.find(group => group.id === currentGroup)?.name}
                                    </div>
                                    <div className="content-message-text">Membres {currentGroup} </div>
                                </div>
                            </div>
                            <div className="conversation-buttons">
                                <button type="button">
                                    <a href="/addMember">  <i className="ri-user-add-line"></i> </a>
                                </button>
                                <button type="button">
                                    <a href="/addGuest"> <i className="ri-add-fill"></i> </a>
                                </button>
                                <button type="button">
                                    <i className="ri-information-line"></i>
                                </button>
                            </div>
                        </div>

                        <div className="conversation-main">
                            <ul className="conversation-wrapper">
                                {/* Affichage des messages du groupe */}
                                {groupMessages.map((message, index) => (
                                    <li key={index} className={`conversation-item ${message.sender_id === currentUserId ? 'me' : ''}`}>
                                        <div className="conversation-item-side">
                                            <img className="conversation-item-image" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="sender profile" />
                                        </div>
                                        <div className="conversation-item-content">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>{message.content}</p>
                                                    {/* Affichage de l'image si présente */}
                                                    {message.file_url && (
                                                        <img
                                                            src={`http://127.0.0.1:8000/uploads/${message.file_url}`}
                                                            alt="uploaded file"
                                                            className="uploaded-image"
                                                        />
                                                    )}
                                                    <div className="conversation-item-time">{message.created_at}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form onSubmit={sendMessage}>
                            <div className="conversation-form">
                                {/* Bouton pour sélectionner un fichier */}
                                <button type="button" className="conversation-form-button" onClick={() => fileInputRef.current.click()}>
                                    <i className="ri-file-line"></i>
                                </button>
                                {/* Input file caché */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        setSelectedFile(() => e.target.files[0])
                                    }}
                                    accept="image/*"
                                />
                                <div className="conversation-form-group">
                                    <textarea
                                        className="conversation-form-input"
                                        rows="1"
                                        placeholder="Message ici..."
                                        value={messageContent}
                                        onChange={handleMessageChange}
                                    ></textarea>
                                    <button type="button" className="conversation-form-record">
                                        <i className="ri-mic-line"></i>
                                    </button>
                                </div>
                                {/* Bouton pour envoyer le message */}
                                <button
                                    type="button"
                                    className="conversation-form-button conversation-form-submit"
                                    onClick={sendMessage}
                                >
                                    <i className="ri-send-plane-2-line"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="conversation conversation-default active">
                        <i className="ri-chat-3-line"></i>
                        <p>Sélectionnez un groupe pour voir la conversation ! {currentGroup} </p>

                    </div>
                )}
            </div>
            {/* end: Content */}
        </div>
        </section >
    );
}
