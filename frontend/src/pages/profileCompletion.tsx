import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCompletion.css';
import axios from 'axios';

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    website: '',
    university: '',
    department: '',
    email: '', // 👈 Ensure this is set via localStorage/session or passed from login
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let avatarUrl = '';

      // ⬆️ 1. Upload avatar file to backend
      if (avatarFile) {
        const imageData = new FormData();
        imageData.append('avatar', avatarFile);
        imageData.append('email', formData.email); // 👈 used for User lookup

        const avatarRes = await axios.post(
          'http://localhost:5050/api/avatar/upload',
          imageData
        );

        avatarUrl = avatarRes.data.avatarUrl;
      }

      // ⬆️ 2. Submit final profile details
      const profileRes = await axios.post('http://localhost:5050/api/profile/complete', {
        name: formData.fullName,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        university: formData.university,
        department: formData.department,
        email: formData.email,
        avatar: avatarUrl,
      });

      if (profileRes.data.message === 'Profile completed successfully') {
        navigate('/dashboard');
      } else {
        setError(profileRes.data.message || 'Profile save failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-background">
        <div className="profile-bg" />
        <div className="profile-starry-bg" />
        <div className="profile-nebula-overlay" />
        <div className="profile-lens-flare" />

        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>👤 Complete Your Jedi Profile</h2>

          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleChange} />

          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <input name="website" placeholder="Personal Website" value={formData.website} onChange={handleChange} />
          <input name="university" placeholder="University" value={formData.university} onChange={handleChange} />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <label>Avatar Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletion;
