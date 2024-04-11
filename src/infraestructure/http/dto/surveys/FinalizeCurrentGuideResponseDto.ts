

export interface FinalizeCurrentGuideResponseDto {
    current_guide: TGuide;
    next_guide: TGuide | null;
}

interface TGuide {
    id:            number;
    survey_id:      number;
    guide_id:       number;
    status:        number;
    createdAt:     string;
    updatedAt:     string;
}
