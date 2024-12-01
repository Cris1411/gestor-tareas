import React, { useState, useEffect } from 'react';

const TagManager = ({ darkMode, onTagsChange, selectedTags = [] }) => {
  const [tags, setTags] = useState(() => {
    const savedTags = localStorage.getItem('customTags');
    return savedTags ? JSON.parse(savedTags) : ['Urgente', 'Importante', 'Normal', 'Bajo'];
  });
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('customTags', JSON.stringify(tags));
  }, [tags]);

  const addTag = (e) => {
    e.preventDefault();
    if (!newTag.trim() || tags.includes(newTag.trim())) return;
    const updatedTags = [...tags, newTag.trim()];
    setTags(updatedTags);
    setNewTag('');
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    if (selectedTags.includes(tagToRemove)) {
      onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
    }
  };

  const toggleTag = (tag) => {
    const updatedSelection = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(updatedSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Etiquetas
        </label>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`text-sm px-2 py-1 rounded ${
            darkMode
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isEditing ? 'Terminar' : 'Gestionar'}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <form onSubmit={addTag} className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nueva etiqueta..."
              className={`flex-1 px-2 py-1 text-sm rounded border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Añadir
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <div
                key={tag}
                className={`group flex items-center gap-1 px-2 py-1 rounded ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tag}
                </span>
                <button
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagManager;
