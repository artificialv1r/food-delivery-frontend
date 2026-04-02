import * as signalR from "@microsoft/signalr";

//SignalR ne moze da koristi Api instancu jer nije HTTP request nego WebSocket, pa zato mora ovako
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let connection = null;

export async function startTracking(orderId, onLocationReceived) {
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/hubs/tracking`)
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveCourierLocation", (data) => {
        onLocationReceived(data);
    });

    await connection.start();
    await connection.invoke("JoinOrderTracking", orderId);
}

export async function stopTracking(orderId) {
    if (!connection) return;
    await connection.invoke("LeaveOrderTracking", orderId);
    await connection.stop();
    connection = null;
}