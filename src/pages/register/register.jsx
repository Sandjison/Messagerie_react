import React, { useState } from 'react';
import '../register/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //navige
  const navigate = useNavigate();

  const handle_register = async (e) => {
    e.preventDefault();

    // Vérification si les mots de passe sont identiques
    if (password !== confirmPassword) {
      alert('Les mots de passe ne sont pas identiques');
      return;
    }

    try {
      // Envoi des données au serveur
      const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/register', {
        name: name,
        email: email,
        password: password,
        password_confirm: confirmPassword // Remplacer ici par `password_confirm`
      });
      //navige
      navigate('/login')

      console.log('Enregistré avec succès:', response.data);
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
        <form className="form" onSubmit={handle_register}>
          <h1 className='custom-title'>Inscription</h1>

          <span className="subtitle">
            Créer un compte avec votre adresse e-mail.
          </span>
          <div className="">
            <label htmlFor="">Nom complet</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Saisir votre nom complet ici..."
            /> <br /><br />
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Saisir votre e-mail ici..."
            /><br /><br />
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Saisir votre mot de passe ici..."
            /><br /><br />
            <label htmlFor="">Confirmer le mot de passe</label>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
              placeholder="Resaisir le mot de passe ici..."
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <div className="form-section">
          <p>
            Avez-vous déjà un compte? <a href="/login">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  );
}
