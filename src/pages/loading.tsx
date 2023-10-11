import CenteredContainer from "@/components/CenteredContainer";

export default function LoadingBoundary() {
  return (
    <CenteredContainer>
      <div className={"title"}>Loading</div>
      <div className={"subtitle"}>Please wait until we load our page.</div>
    </CenteredContainer>
  );
}