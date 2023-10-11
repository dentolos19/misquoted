import { ReactNode } from "react";

export default function CenteredContainer({ children }: { children: ReactNode }) {
  return (
    <div className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        {children}
      </div>
    </div>
  );
}