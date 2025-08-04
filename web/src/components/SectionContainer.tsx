import type { ReactNode } from "react";

interface ISectionContainer {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

function SectionContainer({ children, title, subtitle }: ISectionContainer) {
  const hasTitle = !!title;
  const hasSubtitle = !!subtitle;

  return (
    <section className="section">
      <section className="container">
        {hasTitle && <h1 className="title">{title}</h1>}
        {hasSubtitle && <h2 className="subtitle">{subtitle}</h2>}
        {(hasTitle || hasSubtitle) && <br />}
        {children}
      </section>
    </section>
  );
}

export default SectionContainer;
