import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../api';

const LivreModal = ({ isOpen, onClose, livre, onSuccess }) => {
    const [formData, setFormData] = useState({
        titre: '',
        auteur: '',
        description: '',
        genre: 'ROMAN',
        date_publication: ''
    });

    useEffect(() => {
        if (livre) {
            setFormData({
                titre: livre.titre,
                auteur: livre.auteur,
                description: livre.description,
                genre: livre.genre,
                date_publication: livre.date_publication
            });
        } else {
            setFormData({
                titre: '',
                auteur: '',
                description: '',
                genre: 'ROMAN',
                date_publication: ''
            });
        }
    }, [livre]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (livre) {
                await api.put(`/api/livres/${livre.id}/update/`, formData);
            } else {
                await api.post('/api/livres/', formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving livre:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-lg relative">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">
                        {livre ? 'Modifier Livre' : 'Nouveau Livre'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-6">
                        {/* Titre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Titre *
                            </label>
                            <input
                                type="text"
                                value={formData.titre}
                                onChange={(e) => setFormData({...formData, titre: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Auteur */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Auteur *
                            </label>
                            <input
                                type="text"
                                value={formData.auteur}
                                onChange={(e) => setFormData({...formData, auteur: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="3"
                            />
                        </div>

                        {/* Genre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Genre *
                            </label>
                            <select
                                value={formData.genre}
                                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="ROMAN">Roman</option>
                                <option value="SCIENCE">Science-Fiction</option>
                                <option value="JEUNESSE">Jeunesse</option>
                            </select>
                        </div>

                        {/* Date de publication */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de publication
                            </label>
                            <input
                                type="date"
                                value={formData.date_publication}
                                onChange={(e) => setFormData({...formData, date_publication: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>  
            </div>
        </div>
    );
};

export default LivreModal;