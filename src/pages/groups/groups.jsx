import React from 'react'
import '../dashboard/dashboard.css'
import '../dashboard/tailwindcss-colors.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function groups() {

    useEffect(() => {
        // start: Sidebar
        const sidebarToggle = document.querySelector('.chat-sidebar-profile-toggle');
        const sidebarProfile = document.querySelector('.chat-sidebar-profile');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            });
        }

        document.addEventListener('click', function (e) {
            if (!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
                sidebarProfile?.classList.remove('active');
            }
        });
        // end: Sidebar

        // start: Conversation
        const dropdownToggles = document.querySelectorAll('.conversation-item-dropdown-toggle');
        dropdownToggles.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                if (this.parentElement.classList.contains('active')) {
                    this.parentElement.classList.remove('active');
                } else {
                    document.querySelectorAll('.conversation-item-dropdown').forEach(function (i) {
                        i.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
                document.querySelectorAll('.conversation-item-dropdown').forEach(function (i) {
                    i.classList.remove('active');
                });
            }
        });

        const inputElements = document.querySelectorAll('.conversation-form-input');
        inputElements.forEach(function (item) {
            item.addEventListener('input', function () {
                this.rows = this.value.split('\n').length;
            });
        });

        const conversationLinks = document.querySelectorAll('[data-conversation]');
        conversationLinks.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelectorAll('.conversation').forEach(function (i) {
                    i.classList.remove('active');
                });
                document.querySelector(this.dataset.conversation)?.classList.add('active');
            });
        });

        const backButtons = document.querySelectorAll('.conversation-back');
        backButtons.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                this.closest('.conversation')?.classList.remove('active');
                document.querySelector('.conversation-default')?.classList.add('active');
            });
        });

        // end: Conversation

        // Cleanup listeners on unmount
        return () => {
            if (sidebarToggle) sidebarToggle.removeEventListener('click', null);
            dropdownToggles.forEach(item => item.removeEventListener('click', null));
            inputElements.forEach(item => item.removeEventListener('input', null));
            conversationLinks.forEach(item => item.removeEventListener('click', null));
            backButtons.forEach(item => item.removeEventListener('click', null));
        };
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
                            <a href="#" data-title="Groupes">
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
                                <li>
                                    <a href="#" data-conversation="#conversation-1">
                                        <img
                                            className="content-message-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="profile"
                                        />
                                        <span className="content-message-info">
                                            <span className="content-message-name">Someone</span>
                                            <span className="content-message-text">
                                                Lorem ipsum dolor sit amet consectetur.
                                            </span>
                                        </span>

                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-conversation="#conversation-2">
                                        <img
                                            className="content-message-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="profile"
                                        />
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
                    {/* 
            
            PARTIE 
            
            */}
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
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                    alt="profile"
                                />
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
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="conversation-item-content">
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-dropdown">
                                                    <button
                                                        type="button"
                                                        className="conversation-item-dropdown-toggle"
                                                    >
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i> Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, tenetur!
                                                    </p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                                <div className="conversation-item-dropdown">
                                                    <button
                                                        type="button"
                                                        className="conversation-item-dropdown-toggle"
                                                    >
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i> Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* 
                         PARTIE
                     */}
                                {/* PARTIE */}
                                <li className="conversation-item">
                                    <div className="conversation-item-side">
                                        <img
                                            className="conversation-item-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt="user"
                                        />
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
                                                <div className="conversation-item-dropdown">
                                                    <button
                                                        type="button"
                                                        className="conversation-item-dropdown-toggle"
                                                    >
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i>
                                                                Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i>
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur
                                                        adipisicing elit. Atque eos ab in?
                                                    </p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                                <div className="conversation-item-dropdown">
                                                    <button
                                                        type="button"
                                                        className="conversation-item-dropdown-toggle"
                                                    >
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i>
                                                                Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i>
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-dropdown">
                                                    <button
                                                        type="button"
                                                        className="conversation-item-dropdown-toggle"
                                                    >
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i>
                                                                Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i>
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* 

                PARTIE 

                */}
                                <li className="conversation-item me">
                                    <div className="conversation-item-side">
                                        <img
                                            className="conversation-item-image"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            alt=""
                                        />
                                    </div>
                                    <div className="conversation-item-content">
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-dropdown">
                                                    <button type="button" className="conversation-item-dropdown-toggle">
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i> Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>Lorem, ipsum dolor sit amet consectetur blanditiis quod. Ullam, dolorum.</p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                                <div className="conversation-item-dropdown">
                                                    <button type="button" className="conversation-item-dropdown-toggle">
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i> Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>Lorem ipsum, dolor sit amet consectetur natus voluptas dolore ducimus!</p>
                                                    <div
                                                        className="conversation-item-time">12:30</div>
                                                </div>
                                                <div className="conversation-item-dropdown">
                                                    <button type="button" className="conversation-item-dropdown-toggle">
                                                        <i className="ri-more-2-line"></i>
                                                    </button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-share-forward-line"></i> Forward
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="ri-delete-bin-line"></i> Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* 

                 PARTIE 
                
                */}
                        <li className="conversation-item">
                            <div className="conversation-item-side">
                                <img
                                    className="conversation-item-image"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                            </div>
                            <div className="conversation-item-content">
                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            <div
                                                className="conversation-item-time">12:30</div>
                                        </div>

                                        <div className="conversation-item-dropdown">
                                            <button type="button" className="conversation-item-dropdown-toggle">
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eos ab in?</p>
                                            <div
                                                className="conversation-item-time">12:30</div>
                                        </div>

                                        <div className="conversation-item-dropdown">
                                            <button type="button" className="conversation-item-dropdown-toggle">
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-dropdown">
                                            <button type="button" className="conversation-item-dropdown-toggle">
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="conversation-item me">
                            <div className="conversation-item-side">
                                <img
                                    className="conversation-item-image"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                            </div>
                            {/* PARTIE */}
                            {/* PARTIE */}
                            <div className="conversation-item-content">
                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-dropdown">
                                            <button
                                                type="button"
                                                className="conversation-item-dropdown-toggle"
                                            >
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-dropdown">
                                            <button
                                                type="button"
                                                className="conversation-item-dropdown-toggle"
                                            >
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum, dolor sit amet consectetur
                                                adipisicing elit. Ducimus!
                                            </p>
                                            <div
                                                className="conversation-item-time">12:30</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button
                                                type="button"
                                                className="conversation-item-dropdown-toggle"
                                            >
                                                <i className="ri-more-2-line"></i>
                                            </button>
                                            <ul className="conversation-item-dropdown-list">
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-share-forward-line"></i> Forward
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ri-delete-bin-line"></i> Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
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
                                    className="conversation-form-record"
                                >
                                    <i className="ri-mic-line"></i>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="conversation-form-button conversation-form-submit"
                            >
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
