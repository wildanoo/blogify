export interface SiteConfig {
   siteName: string;
   description: string;
   currentlyAt: string;
   socialLinks: {
      twitter: string;
      youtube: string;
      github: string;
      linkedin: string;
      instagram: string;
   }
}

const siteConfig = {
   siteName: "Explorer",
   description: "A minimal and lovely travel blog which shares experiences and cities around the world!",
   currentlyAt: "Budapest",
   socialLinks: {
      twitter: "https://twitter.com/wldn",
      youtube: "https://youtube.com/wldn",
      github: "https://github.com/wldn",
      linkedin: "https://linkedin.com/wldn",
      instagram: "https://instagram.com/wldn"
   }
}

export default siteConfig;