import CenteredContainer from "@/components/centered-container";
import LoadingSpinner from "@/components/loading-spinner";

export default function LoadingBoundary() {
  return (
    <CenteredContainer>
      {/* <div className={"title"}>Loading</div>
      <div className={"subtitle"}>Please wait until we load our page.</div> */}
      <LoadingSpinner />
    </CenteredContainer>
  );
}