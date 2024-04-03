export interface Pagination {
    surveys:      Survey[];
    currentPage:  number;
    nextPageurl:  string | null;
    prevPageurl:  string | null;
}

interface Survey {
    id:        number;
    startDate: Date;
    endDate:   Date | undefined;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
    total:     string;
}
