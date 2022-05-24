import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// import MouseParticles from "../components/MouseEffect";
import PageHeader from "../components/page-header";
import PageFooter from "../components/page-footer";
import ThemeSwitch from "../components/theme-switch";
import "./style.scss";

const CSOnlyMouseParticles = React.lazy(() =>
  import("../components/MouseEffect")
);

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
            social {
              github
            }
          }
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

  const isSSR = typeof window === "undefined";
  return (
    <div className="page-wrapper">
      <PageHeader siteTitle={title || `Title`} />
      <main className="page-content">{children}</main>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <CSOnlyMouseParticles
            g={1}
            color="random"
            cull="MuiSvgIcon-root,MuiButton-root"
            level={6}
          />
        </React.Suspense>
      )}
      <PageFooter
        author={author.name || `Author`}
        githubUrl={author.social?.github || `https://www.github.com`}
      />
      <ThemeSwitch />
    </div>
  );
};

export default Layout;
