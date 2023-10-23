export default function Logoff() {
    // Remove from session storage
    sessionStorage.removeItem("auth")
    // Refresh Page
    window.location.reload();
    
    return (
      <>
        <div id="logoff">
          <h1>Logged off now!</h1>
        </div>
      </>
    );
}