import { useRegisterSW } from "virtual:pwa-register/react";
// import "/RefreshServiceWorker.css";

const RefreshServiceWorker = () => {
  const swStatus = useRegisterSW({
    onRegistered(r) {
      console.log(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const [offlineReady, setOfflineReady] = swStatus.offlineReady;
  const [needRefresh, setNeedRefresh] = swStatus.needRefresh;
  const updateServiceWorker = swStatus.updateServiceWorker;

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className="ReloadPrompt-toast-button"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default RefreshServiceWorker;
