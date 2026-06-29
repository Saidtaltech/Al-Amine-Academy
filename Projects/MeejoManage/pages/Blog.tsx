
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { BlogPost } from '../types';
import { MegaphoneIcon, TrashIcon, PencilIcon } from '../components/Icons';

interface BlogProps { setPage: (page: string) => void; }

const Blog: React.FC<BlogProps> = ({ setPage }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await StorageService.getBlogPosts();
        setPosts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Error loading blog posts:", error);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cet article ?')) {
      await StorageService.deleteBlogPost(id);
      const data = await StorageService.getBlogPosts();
      setPosts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-10 pt-24 bg-gray-50/50 min-h-screen pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h2 className="text-3xl font-black text-slate-900 font-heading">Actualités & Blog</h2>
            <p className="text-slate-500 font-medium">Partagez vos conseils d'expert et vos offres avec vos clients.</p>
        </div>
        <button onClick={() => { localStorage.removeItem('novix_blog_edit_id'); setPage('blog-editor'); }} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition">+ Rédiger</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500">
            <div className="h-56 bg-slate-200 relative overflow-hidden">
              {post.imageUrl ? (
                <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-black uppercase text-xs">Aucune Image</div>
              )}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${post.published ? 'bg-green-500 text-white' : 'bg-slate-900 text-white'}`}>
                {post.published ? 'Publié' : 'Brouillon'}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition">{post.title}</h3>
              <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed">{post.content}</p>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(post.date).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button onClick={() => { localStorage.setItem('novix_blog_edit_id', post.id); setPage('blog-editor'); }} className="p-2 text-slate-400 hover:text-blue-600 transition"><PencilIcon className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><TrashIcon className="w-4 h-4"/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-32 text-center text-slate-300 font-bold italic border-2 border-dashed border-slate-200 rounded-[3rem]">Votre blog est encore vide.</div>
        )}
      </div>
    </div>
  );
};

export default Blog;
