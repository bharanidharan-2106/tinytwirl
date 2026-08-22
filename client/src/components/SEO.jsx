import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';

const SEO = ({ title, description, path = '' }) => {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  const metaDescription = description || `${siteConfig.name} — ${siteConfig.tagline}. ${siteConfig.slogan}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteConfig.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default SEO;
