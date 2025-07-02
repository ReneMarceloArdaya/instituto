export type MapComponentProps = {
    center: [number, number];
    onLocationChange: (position: [number, number]) => void;
}