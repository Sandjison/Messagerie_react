

import React, { useState } from 'react';
import '../register/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigation
  const navigate = useNavigate();

  const handle_login = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données au serveur pour la connexion
      const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/login', {
        email: email,
        password: password
      });

      localStorage.setItem('token', response.data.data.token);

      console.log('Connexion réussie:', response.data.data.token);

      localStorage.setItem('user_id', response.data.data.id);


      // Navigation vers une page après connexion, par exemple "/dashboard"
      navigate('/dashboard');

    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de la requête:', error.response.data);
      } else {
        console.error('Erreur inconnue:', error);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form className="form" onSubmit={handle_login}>
          <h1 className='custom-title'>Connexion</h1>

          <span className="subtitle">
            Connectez-vous avec votre adresse e-mail et mot de passe.
          </span>
          <div className="">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Saisir votre e-mail ici..."
            /> <br /><br />
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Saisir votre mot de passe ici..."
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <div className="form-section">
          <p>
            Vous n'avez pas de compte ? <a href="/">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>
  );
}

