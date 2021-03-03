export interface Feature {
    featureName: string;
    enabled: boolean;
    toggles: { [key: string]: ClaimToggle };
}

export interface ClaimToggle {
    ClaimType: string;
    ClaimValues: string | null;
}
