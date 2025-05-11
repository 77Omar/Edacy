import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiBook, FiPlus } from 'react-icons/fi';
import api from '../api';
import LivreModal from './LivreModal';
import DeleteConfirmation from './DeleteConfirmation';

const LivreList = () => {
    const [livres, setLivres] = useState([]);
    const [selectedLivre, setSelectedLivre] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState(null);

    useEffect(() => {
        fetchLivres();
    }, []);

    const fetchLivres = async () => {
        try {
            const response = await api.get('/api/livres/');
            setLivres(response.data);
        } catch (error) {
            console.error('Error fetching livres:', error);
        }
    };

    const getGenreBadge = (genre) => {
        const genreStyles = {
            'ROMAN': 'bg-purple-100 text-purple-800',
            'SCIENCE': 'bg-blue-100 text-blue-800',
            'JEUNESSE': 'bg-green-100 text-green-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm ${genreStyles[genre]}`}>
                {genre}
            </span>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gestion des Livres</h1>
                    <button 
                        onClick={() => { setSelectedLivre(null); setIsModalOpen(true); }}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                        <FiPlus className="mr-2" /> Nouveau Livre
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Titre</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Auteur</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Genre</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date Publication</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {livres.map(livre => (
                                <tr key={livre.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{livre.titre}</td>
                                    <td className="px-6 py-4 text-gray-500">{livre.auteur}</td>
                                    <td className="px-6 py-4">{getGenreBadge(livre.genre)}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(livre.date_publication).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 space-x-4">
                                        <button 
                                            onClick={() => { setSelectedLivre(livre); setIsModalOpen(true); }}
                                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                        >
                                            <FiEdit size={20} />
                                        </button>
                                        <button 
                                            onClick={() => setDeleteCandidate(livre)}
                                            className="text-red-600 hover:text-red-900 transition-colors"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <LivreModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                livre={selectedLivre}
                onSuccess={fetchLivres}
            />

            <DeleteConfirmation 
                isOpen={!!deleteCandidate}
                onClose={() => setDeleteCandidate(null)}
                item={deleteCandidate}
                onSuccess={fetchLivres}
                itemType="livre"
            />
        </div>
    );
};

export default LivreList;