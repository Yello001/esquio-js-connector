export interface Esquio {
    Products: Product[] | null;
}

export interface Product {
    Name: string | null;
    Features: Feature[] | null;
}

export interface Feature {
    Name: string | null;
    Enabled: boolean;
    Toggles: Toggle[] | null;
}

export interface Toggle {
    Type: string | null;
    Parameters: unknown;
}