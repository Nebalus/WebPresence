import WorkInProgress from "@/components/WorkInProgress.tsx";

export default function GamesIRLBoard() {
    return (
        <>
            <WorkInProgress />
        </>
    );
}

/*
    // Create a position for the marker
    const position: [number, number] = [51.505, -0.09]; // Example: Coordinates for London

    return (
        <div style={{ height: "100vh" }}>
            <MapContainer
                center={position}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}>
                    <Popup>
                        A simple marker popup!<br />
                        Location: London
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
 */