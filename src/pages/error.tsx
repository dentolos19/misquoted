import CenteredContainer from "@/components/centered-container";

export default function ErrorBoundary() {
  return (
    <CenteredContainer>
      <div className={"title"}>404</div>
      <div className={"subtitle mt-1"}>The page that you're looking for does not exist.</div>
    </CenteredContainer>
  );
}