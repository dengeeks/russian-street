export interface SelectProps {
    defaultOption: string;
    options: string[] | null;
    whiteTheme?: Boolean;
    onChange: (event: any, defaultOption:string) => void;
    type: string;
}