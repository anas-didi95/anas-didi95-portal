import type { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  label?: string;
}

function Card({ children, label }: ICard) {
  return (
    <div className="card ">
      {!!label && (
        <div className="card-header">
          <p className="card-header-title">{label}</p>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
