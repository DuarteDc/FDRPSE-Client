
export const groupAreasByParentArea = (areas: Array<any>) => {
    const areasGroup = areas.reduce((prev: Array<any>, curr, __, areas) => {
        if (curr.parentArea === '0') {
            prev.push({ ...curr, areas: [] });
            return prev;
        }
        const isParentArea = areas.filter(area => area.parentArea == curr?.id);
        if (isParentArea.length > 0) {
            prev.push({ ...curr, areas: [] });
            return prev;
        }
        const parentArea = prev.find((area) => area?.id == curr?.parentArea);
        prev.map((area) => area?.id == parentArea?.id ? { ...area, areas: area.areas ? area.areas = [...area.areas, curr] : [curr] } : { ...area });
        return prev;


    }, []);

    return areasGroup.reduce((prev: Array<any>, curr, __, areas) => {
        if (curr.parentArea === '0' || curr.parentArea === '1') {
            prev.push({ ...curr, areas: [] });
            return prev;
        }
        const isParentArea = areas.filter(area => area.parentArea == curr?.id);
        if (isParentArea.length > 0) {
            prev.push({ ...curr, areas: [] });
            return prev;
        }
        const parentArea = prev.find((area) => area?.id == curr?.parentArea);
        prev.map((area) => area?.id == parentArea?.id ? { ...area, areas: area.areas ? area.areas = [...area.areas, curr] : [curr] } : { ...area });
        return prev;
    }, []);
}
