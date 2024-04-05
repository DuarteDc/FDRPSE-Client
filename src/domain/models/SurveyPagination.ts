export interface Pagination {
    surveys: Survey[];
    perPage: number;
    total: number;
}

interface Survey {
    id: number;
    startDate: Date;
    endDate: Date | undefined;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    total: string;
}
