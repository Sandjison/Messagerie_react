// import React from 'react'
// import { useEffect } from 'react'
// import '../dashboard/dashboard.css'
// import '../dashboard/tailwindcss-colors.css'
// import axios from 'axios';

// import { useNavigate } from 'react-router-dom';

// export default function conversation() {

//     const ChatComponent = ({ groups, currentUserId }) => {
//         const [selectedGroupId, setSelectedGroupId] = useState(null);
    
//         const handleGroupClick = (groupId) => {
//             setSelectedGroupId(groupId);
//         };
    
//         const selectedGroup = groups.find(group => group.id === selectedGroupId);

//         return (
//             <div>
//                 <div className="content-messages">
//                     <ul className="content-messages-list">
//                         {groups
//                             .filter(group => group.user_id === parseInt(currentUserId))
//                             .map((group) => (
//                                 <li key={group.id}>
//                                     <a href="#" onClick={() => handleGroupClick(group.id)}>
//                                         <img
//                                             className="content-message-image"
//                                             src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
//                                             alt="profile"
//                                         />
//                                         <span className="content-message-info">
//                                             <span className="content-message-name">{group.name}</span>
//                                             <span className="content-message-text">{group.description}</span>
//                                         </span>
//                                     </a>
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
                
//                 {selectedGroup ? (
//                     <div className="conversation">
//                         <div className="conversation-top">
//                             <button type="button" className="conversation-back" onClick={() => setSelectedGroupId(null)}>
//                                 <i className="ri-arrow-left-line"></i>
//                             </button>
//                             <div className="conversation-user">
//                                 <img
//                                     className="conversation-user-image"
//                                     src={selectedGroup.imageUrl} // Assurez-vous que chaque groupe a une image
//                                     alt=""
//                                 />
//                                 <div>
//                                     <div className="conversation-user-name">{selectedGroup.name}</div>
//                                     <div className="conversation-user-status online">online</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="conversation-main">
//                             <ul className="conversation-wrapper">
//                                 {selectedGroup.messages.map((message, index) => (
//                                     <li key={index} className={`conversation-item ${message.sender === 'me' ? 'me' : ''}`}>
//                                         <div className="conversation-item-side">
//                                             <img
//                                                 className="conversation-item-image"
//                                                 src={message.senderImage} // Assurez-vous que chaque message a l'image de l'expéditeur
//                                                 alt=""
//                                             />
//                                         </div>
//                                         <div className="conversation-item-content">
//                                             <div className="conversation-item-wrapper">
//                                                 <div className="conversation-item-box">
//                                                     <div className="conversation-item-text">
//                                                         <p>{message.text}</p>
//                                                         <div className="conversation-item-time">{message.time}</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="conversation conversation-default active">
//                         <i className="ri-chat-3-line"></i>
//                         <p>Select chat and view conversation!</p>
//                     </div>
//                 )}
//             </div>
//         );
//     };
    
//     export default function Conversation() {
//         const [groups, setGroups] = useState([]);
//         const currentUserId = 1; // Remplacez par l'ID utilisateur actuel
    
//         useEffect(() => {
//             const fetchGroups = async () => {
//                 try {
//                     const response = await axios.get('/api/groups'); // Changez l'URL selon votre API
//                     setGroups(response.data); // Assurez-vous que response.data est un tableau
//                 } catch (error) {
//                     console.error("Erreur lors de la récupération des groupes:", error);
//                 }
//             };
    
//             fetchGroups();
//         }, []);
    
//         return (
//             <div>
//                 <ChatComponent groups={groups} currentUserId={currentUserId} />
//             </div>
//         );
// }
// }