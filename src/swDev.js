export default function swDev() {
  function determineServerAPIKey() {
    var rapidPublicKey =
      "BGtkbcjrO12YMoDuq2sCQeHlu47uPx3SHTgFKZFYiBW8Qr0D9vgyZSZPdw6_4ZFEI9Snk1VEAj2qTYI1I1YxBXE";
    return urlBase64ToUint8Array(rapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `/sw.js`;

  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log("Service Worker registered successfully:", registration);

      return Notification.requestPermission().then((permission) => {
        if (permission === "denied") {
          throw new Error("Notification permission denied");
        } else if (permission === "default") {
          throw new Error("Notification permission request dismissed");
        } else {
          return registration.pushManager
            .getSubscription()
            .then((subscription) => {
              console.log("Current subscription:", subscription);
              if (subscription === null) {
                console.log("No subscription, subscribing now...");

                return registration.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: determineServerAPIKey(),
                  })
                  .then((newSubscription) => {
                    console.log("New subscription:", newSubscription);
                    return newSubscription;
                  });
              } else {
                console.log("Already subscribed.");
                return subscription;
              }
            });
        }
      });
    })
    .catch((error) => {
      console.error(
        "Service Worker registration or subscription failed:",
        error
      );
    });
}
