import React, { useState } from 'react';
import './ProfileBuilder.css';

const ProfileBuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    bio: '',
    location: '',
    interests: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Submitted profile data:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-builder-wrapper">
      <div className="profile-builder-container">
        <h2>Profile Settings</h2>

        {/* Avatar Upload Placeholder */}
        <div className="avatar-section">
          <img src="/default-avatar.png" alt="Avatar" className="avatar-preview" />
          <button className="upload-button" disabled>Change Avatar (Coming Soon)</button>
        </div>

        <form onSubmit={handleSubmit} className="profile-builder-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Interests</label>
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-button">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileBuilder;
