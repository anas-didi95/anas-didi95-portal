import type { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  label?: string;
}

function Card({ children, label }: ICard) {
  return (
    <div className="card">
      {!!label && (
        <div className="card-header has-background-info">
          <p className="card-header-title has-text-white">{label}</p>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
