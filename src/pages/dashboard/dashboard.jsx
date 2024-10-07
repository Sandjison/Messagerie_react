import React from 'react'
import { useEffect } from 'react'
import '../dashboard/dashboard.css'
import '../dashboard/tailwindcss-colors.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function dashboard() {

    useEffect(() => {
        // Function to add event listener safely
        const addClickListener = (elements, handler) => {
            elements.forEach(item => item.addEventListener('click', handler));
        };
    
        // Function to remove event listener safely
        const removeClickListener = (elements, handler) => {
            elements.forEach(item => item.removeEventListener('click', handler));
        };
    
        // Sidebar functionality
        const sidebarToggle = document.querySelector('.chat-sidebar-profile-toggle');
        const sidebarProfile = document.querySelector('.chat-sidebar-profile');
    
        const toggleSidebar = (e) => {
            e.preventDefault();
            sidebarToggle?.parentElement.classList.toggle('active');
        };
    
        const closeSidebar = (e) => {
            if (!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
                sidebarProfile?.classList.remove('active');
            }
        };
    
        sidebarToggle?.addEventListener('click', toggleSidebar);
        document.addEventListener('click', closeSidebar);
    
        // Conversation dropdown functionality
        const dropdownToggles = document.querySelectorAll('.conversation-item-dropdown-toggle');
        const toggleDropdown = (e) => {
            e.preventDefault();
            const parent = e.currentTarget.parentElement;
            if (parent?.classList.contains('active')) {
                parent.classList.remove('active');
            } else {
                document.querySelectorAll('.conversation-item-dropdown').forEach(i => i.classList.remove('active'));
                parent.classList.add('active');
            }
        };
    
        addClickListener(dropdownToggles, toggleDropdown);
    
        const closeDropdowns = (e) => {
            if (!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
                document.querySelectorAll('.conversation-item-dropdown').forEach(i => i.classList.remove('active'));
            }
        };
    
        document.addEventListener('click', closeDropdowns);
    
        // Conversation form input auto-resize functionality
        const inputElements = document.querySelectorAll('.conversation-form-input');
        const autoResizeInput = function () {
            this.rows = this.value.split('\n').length;
        };
    
        inputElements.forEach(item => item.addEventListener('input', autoResizeInput));
    
        // Conversation switcher functionality
        const conversationLinks = document.querySelectorAll('[data-conversation]');
        const switchConversation = (e) => {
            e.preventDefault();
            document.querySelectorAll('.conversation').forEach(i => i.classList.remove('active'));
            document.querySelector(e.currentTarget.dataset.conversation)?.classList.add('active');
        };
    
        addClickListener(conversationLinks, switchConversation);
    
        // Conversation back button functionality
        const backButtons = document.querySelectorAll('.conversation-back');
        const backToDefaultConversation = (e) => {
            e.preventDefault();
            e.currentTarget.closest('.conversation')?.classList.remove('active');
            document.querySelector('.conversation-default')?.classList.add('active');
        };
    
        addClickListener(backButtons, backToDefaultConversation);
    
       
    }, []);
    
    return (
        <section className="chat-section">
            <div className="chat-container">
                {/* start: Sidebar */}
                <aside className="chat-sidebar">
                    <a href="#" className="chat-sidebar-logo">
                        <i className="ri-chat-1-fill"></i>
                    </a>
                    <ul className="chat-sidebar-menu">
                        <li className="active">
                            <a href="/dashboard" data-title="Messages">
                                <i className="ri-chat-3-line"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-title="Contacts">
                                <i className="ri-contacts-line"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/groups" data-title="Groupes">
                                <i className="ri-group-fill"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-title="Parametres">
                                <i className="ri-settings-line"></i>
                            </a>
                        </li>
                        <li className="chat-sidebar-profile">
                            <button type="button" className="chat-sidebar-profile-toggle"></button>
                        </li>
                    </ul>
                </aside>
                {/* end: Sidebar */}
                {/* start: Content */}
                <div className="chat-content">
                    {/* start: Content side */}
                    <div className="content-sidebar">
                        <div className="content-sidebar-title">Messages</div>
                        <form className="content-sidebar-form">
                            <input type="search" className="content-sidebar-input" placeholder="Recherches..." />
                            <button type="submit" className="content-sidebar-submit">
                                <i className="ri-search-line"></i>
                            </button>
                        </form>
                        <div className="content-messages">
                            <ul className="content-messages-list">
                                <li>
                                    <a href="#" data-conversation="#conversation-1">
                                        <img
                                            className="content-message-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="profile" />
                                        <span className="content-message-info">
                                            <span className="content-message-name">Someone</span>
                                            <span className="content-message-text">
                                                Lorem ipsum dolor sit amet consectetur.
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* end: Content side */}
                    {/* start: Conversation */}
                    <div className="conversation conversation-default active">
                        <i className="ri-chat-3-line"></i>
                        <p>Sélectionnez le message et affichez la conversation !</p>
                    </div>
                    <div className="conversation" id="conversation-1">
                        <div className="conversation-top">
                            <button type="button" className="conversation-back">
                                <i className="ri-arrow-left-line"></i>
                            </button>
                            <div className="conversation-user">
                                <img
                                    className="conversation-user-image"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="profile" />
                                <div>
                                    <div className="conversation-user-name">Someone</div>
                                    <div className="conversation-user-status online">online</div>
                                </div>
                            </div>
                            <div className="conversation-buttons">
                                <button type="button">
                                    <i className="ri-phone-fill"></i>
                                </button>
                                <button type="button">
                                    <i className="ri-vidicon-line"></i>
                                </button>
                                <button type="button">
                                    <i className="ri-information-line"></i>
                                </button>
                            </div>
                        </div>
                        <div className="conversation-main">
                            <ul className="conversation-wrapper">
                                <li className="conversation-item me">
                                    <div className="conversation-item-side">
                                        <img
                                            className="conversation-item-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="profile" />
                                    </div>
                                    <div className="conversation-item-content">
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, tenetur!
                                                    </p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="conversation-item">
                                    <div className="conversation-item-side">
                                        <img
                                            className="conversation-item-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="user" />
                                    </div>
                                    <div className="conversation-item-content">
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>
                                                        Lorem, ipsum dolor sit amet consectetur
                                                        adipisicing elit.
                                                    </p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
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
                                <button
                                    type="button"
                                    className="conversation-form-record">
                                    <i className="ri-mic-line"></i>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="conversation-form-button conversation-form-submit">
                                <i className="ri-send-plane-2-line"></i>
                            </button>
                        </div>
                    </div>
                    {/* end: Content */}
                </div>
            </div>
        </section>
    )
}
