import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    console.log("Notification permission not granted");
    return false;
  }

  console.log("Notification permission granted");
  return true;
}

export async function sendQuoteNotification(quote) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Quote time",
        body: `${quote.quote}${quote.by ? "-" + quote.by : ""}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null,
    });
  } catch (error) {
    console.log("Error sending notification", error);
  }
}
