// src/pages/ProfileBuilder.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileBuilder.css';

const ProfileBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null); // ✅ Track userId with state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('/default-avatar.png');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  const fetchProfile = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`http://localhost:5050/api/profile/get/${userId}`);
      setFormData(res.data);
      setAvatarPreview(res.data.avatar || '/default-avatar.png');
    } catch (err: any) {
      console.error('Failed to load profile', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));

      const formDataUpload = new FormData();
      formDataUpload.append('avatar', file);
      formDataUpload.append('userId', userId!);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put('http://localhost:5050/api/profile/update', { ...formData, userId });
      alert('Profile updated successfully!');
      await fetchProfile();
    } catch (err: any) {
      console.error('Profile update failed', err);
      alert('Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return null; // 🔥 Prevents the page from rendering until userId is ready
  }

  return (
    <div className="profile-builder-wrapper">
      <div className="profile-builder-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <img src="/LOGO.png" alt="JediConnect Logo" className="logo-image" />
        <span className="logo-text">JediConnect</span>
      </div>

      <div className="profile-builder-container">
        <h2>Profile Settings</h2>

        <div className="avatar-section">
          <img src={avatarPreview} alt="Avatar" className="avatar-preview" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

        <form onSubmit={handleSubmit} className="profile-builder-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
