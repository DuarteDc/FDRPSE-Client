export interface CreateSectionDto {
    name                : string,
    binary              : boolean,
    question           ?: string;
    can_finish_guide    : boolean;
    type                : string;
}