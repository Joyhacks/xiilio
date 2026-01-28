import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = "https://automagic-biz-buddy.lovable.app";
const DEFAULT_IMAGE = "/og-image.png";
const SITE_NAME = "24Twelve";

export function SEO({
  title,
  description = "Specialized AI agents ready to handle tasks, manage communications, and grow your business around the clock.",
  keywords = "AI agents, business automation, virtual assistant, AI team, productivity, task automation",
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  article,
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Your AI Agent Team`;
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  // Default Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "24Twelve",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-24twelve.png`,
    description: "AI-powered business automation platform with specialized agents for productivity and growth.",
    sameAs: [
      "https://twitter.com/24Twelve",
      "https://linkedin.com/company/24twelve",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-24-TWELVE",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  // WebSite schema for search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="24Twelve" />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      
      {/* Article specific OG tags */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@24Twelve" />
      <meta name="twitter:creator" content="@24Twelve" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}