import React from 'react'
import { useState } from 'react'
import '../register/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  // Récupération de l'ID utilisateur à partir du localStorage
  const user_id = localStorage.getItem('user_id');

  // Navigation
  const navigate = useNavigate();

  const handle_create_group = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/group', {
          name: groupName,
          description: description,
          user_id: user_id
        }, { headers: { 'Authorization': `Bearer ` + localStorage.getItem('token'), } }
      );

      console.log('Groupe créé avec succès:', response.data);
      navigate('/groups');

    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de la création du groupe:', error.response.data);
      } else {
        console.error('Erreur inconnue:', error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form className="form" onSubmit={handle_create_group}>
          <h1 className='custom-title'>Créer un groupe</h1>

          <span className="subtitle">
            Remplissez les champs ci-dessous pour créer un nouveau groupe.
          </span>

          <div className="">
            <label htmlFor="groupName">Nom du groupe</label>
            <input
              type="text"
              className="input"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              placeholder="Saisir le nom du groupe ici..."
            />
            <br /><br />

            <label htmlFor="description">Description</label>
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Saisir la description du groupe ici..."
            />


          </div>

          <button type="submit">Créer le groupe</button>
        </form>
      </div>
    </div>
  );
}
