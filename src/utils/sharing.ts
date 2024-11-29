export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export async function shareContent(data: ShareData): Promise<void> {
  if (!navigator.share) {
    throw new Error('Web Share API not supported');
  }
  
  try {
    await navigator.share(data);
  } catch (error) {
    if ((error as any).name !== 'AbortError') {
      throw error;
    }
  }
}

export function getSocialShareUrls(data: ShareData) {
  const encodedText = encodeURIComponent(data.text);
  const encodedUrl = encodeURIComponent(data.url);
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${data.text}\n${data.url}`)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };
}