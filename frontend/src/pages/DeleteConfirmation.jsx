import React from 'react';
import api from '../api';

const DeleteConfirmation = ({ isOpen, onClose, item, onSuccess, itemType = 'livre' }) => {
    const handleDelete = async () => {
        try {
            // Adapte l'URL en fonction du type d'élément
            const endpoint = itemType === 'livre' ? '/livres' : '/api/users';
            await api.delete(`/livres/${item.id}/delete/`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(`Error deleting ${itemType}:`, error);
        }
    };

    if (!isOpen) return null;

    // Texte dynamique selon le type d'élément
    const confirmationText = itemType === 'livre' 
        ? `le livre "${item?.titre}" par ${item?.auteur}`
        : `l'utilisateur ${item?.first_name} ${item?.last_name}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Confirmer la suppression</h3>
                <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer {confirmationText} ?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;