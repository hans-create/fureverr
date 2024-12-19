import type { Memorial, Memory } from './types/memorial';

export const generateMemorialSlug = (petName: string): string => {
  return petName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const createMemorial = async (memorial: Omit<Memorial, 'id'>): Promise<{ slug: string }> => {
  try {
    const slug = generateMemorialSlug(memorial.petName);
    const memorialData = {
      ...memorial,
      slug,
      createdAt: new Date()
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('memorialData', JSON.stringify(memorialData));
    }

    return { slug };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create memorial');
  }
};

export const getMemorialBySlug = (slug: string): Memorial | null => {
  if (typeof window === 'undefined') return null;
  
  const storedData = localStorage.getItem('memorialData');
  if (!storedData) return null;

  const memorial = JSON.parse(storedData);
  return memorial.slug === slug ? memorial : null;
};