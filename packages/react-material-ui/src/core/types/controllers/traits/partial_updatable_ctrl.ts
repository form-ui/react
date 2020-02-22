export interface PartialUpdatableCtrl<T = unknown> {
    updatePartial: (key: string | number | null, value?: T) => void;
}