export const getProgessByStep = (totalStep: number, currentStep: number) => {
    return ((100 / totalStep) * (currentStep + 1));
}   
