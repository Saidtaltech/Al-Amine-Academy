
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { BlogPost, Store } from '../types';

interface BlogEditorProps {
  setPage: (page: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ setPage }) => {
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    imageUrl: '',
    tags: [],
    published: true,
    author: 'Admin'
  });

  useEffect(() => {
    // Fix: many storage methods are async
    const loadData = async () => {
        const store = await StorageService.getActiveStore();
        setActiveStore(store);

        const editId = localStorage.getItem('novix_blog_edit_id');
        if (editId) {
          const posts = await StorageService.getBlogPosts();
          const post = posts.find(p => p.id === editId);
          if (post) setFormData(post);
        }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    if (!activeStore) return;
    if (!formData.title || !formData.content) return alert('Titre et contenu requis');
    
    const post: BlogPost = {
      id: formData.id || Date.now().toString(),
      storeId: activeStore.id,
      title: formData.title,
      content: formData.content,
      imageUrl: formData.imageUrl || '',
      tags: formData.tags || [],
      published: formData.published ?? true,
      author: formData.author || 'Admin',
      date: formData.date || new Date().toISOString()
    };
    
    await StorageService.saveBlogPost(post);
    localStorage.removeItem('novix_blog_edit_id');
    setPage('blog');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  if (!activeStore) return <div className="p-10 animate-pulse text-slate-400">Chargement...</div>;

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 md:pb-8 pt-20 md:pt-8 max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Éditeur Blog</h2>
        <div className="flex gap-2">
            <button onClick={() => setPage('blog')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-white font-bold">Annuler</button>
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded font-bold shadow-lg hover:bg-blue-700">Enregistrer</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Titre de l'article</label>
            <input 
              className="w-full p-3 border rounded text-lg font-bold dark:bg-gray-700 dark:text-white"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Nouvelle collection été..."
            />
          </div>

          <div>
             <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Image de couverture</label>
             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center cursor-pointer relative hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="max-h-60 mx-auto rounded" />
                ) : (
                    <div className="text-gray-400 py-10">Cliquez pour ajouter une image</div>
                )}
                <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
             </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Contenu</label>
            <textarea 
              className="w-full p-4 border rounded h-80 dark:bg-gray-700 dark:text-white"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              placeholder="Écrivez votre article ici..."
            />
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
             <label className="flex items-center gap-2 cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={formData.published} 
                   onChange={e => setFormData({...formData, published: e.target.checked})}
                   className="w-5 h-5 rounded text-blue-600"
                 />
                 <span className="font-bold text-gray-700 dark:text-white">Publier immédiatement</span>
             </label>
          </div>
      </div>
    </div>
  );
};

export default BlogEditor;
