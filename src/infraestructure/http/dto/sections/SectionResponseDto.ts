export interface SectionResponseDto {
    id              : string;
    name            : string;
    question        : string | null;
    binary          : boolean;
    questions_count : number | null;
    created_at      : string;
    updated_at      : string;
}
