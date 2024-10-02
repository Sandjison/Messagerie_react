import React, { useState, useEffect, useRef } from 'react';
import '../register/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddGuest() {
  const [email, setEmail] = useState('');
  const [currentGroup, setCurrentGroup] = useState(localStorage.getItem("group_id")); // Stocke l'ID du groupe sélectionné

  // Navigation
  const navigate = useNavigate();

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      // Envoi de l'e-mail au serveur pour inviter une personne
      const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/guest/${currentGroup}`, {
        email: email,
      });

      // Supposons que l'ID du groupe soit renvoyé dans la réponse du serveur
      const groupId = response.data.data[0].group_id; // Récupération de l'ID du groupe
      console.log('Invitation réussie, ID du groupe:', groupId);

      // Enregistrement de l'ID du groupe dans le localStorage (si nécessaire)
      localStorage.setItem('group_id', groupId);

      // Navigation vers une page après l'invitation, par exemple "/success"
      navigate('/groups');

    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de la requête:', error.response.data);
      } else {
        console.error('Erreur inconnue:', error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form className="form" onSubmit={handleInvite}>
          <h1 className='custom-title'>Inviter une personne</h1>

          <span className="subtitle">
            Invitez une personne en saisissant son adresse e-mail.
          </span>
          <div className="">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Saisir l'e-mail ici..."
            /> <br /><br />
          </div>
          <button type="submit">Envoyer l'invitation</button>
        </form>
      </div>
    </div>
  );
}
