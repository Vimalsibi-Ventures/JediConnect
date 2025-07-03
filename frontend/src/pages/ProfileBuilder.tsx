// src/pages/ProfileBuilder.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileBuilder.css';

const ProfileBuilder: React.FC = () => {
  const email = localStorage.getItem('email') || '';
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('/default-avatar.png');
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/profile/get?email=${email}`);
      setFormData(res.data);
      setAvatarPreview(res.data.avatar || '/default-avatar.png');
    } catch (err: any) {
      console.error('Failed to load profile', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    const formDataUpload = new FormData();
    formDataUpload.append('avatar', avatarFile);
    formDataUpload.append('email', email);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5050/api/avatar/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData((prev) => ({ ...prev, avatar: res.data.avatarUrl }));
      setAvatarPreview(res.data.avatarUrl);
      alert('Avatar uploaded successfully!');
    } catch (err: any) {
      console.error('Avatar upload failed', err);
      alert('Avatar upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put('http://localhost:5050/api/profile/update', { ...formData, email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Profile updated successfully!');
      await fetchProfile();
    } catch (err: any) {
      console.error('Profile update failed', err);
      alert('Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-builder-wrapper">
      <div className="profile-builder-container">
        <h2>Profile Settings</h2>

        <div className="avatar-section">
          <img src={avatarPreview} alt="Avatar" className="avatar-preview" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          <button onClick={handleAvatarUpload} className="upload-button" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Avatar'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-builder-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address (Read Only)</label>
            <input type="email" name="email" value={email} readOnly />
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileBuilder;
