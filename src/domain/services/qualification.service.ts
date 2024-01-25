import { useContext, useState } from 'react';
import { QualificationContext } from '../../infraestructure/context/qualification';
import { qualificationRepository } from '../../infraestructure/repositories/qualification.repository';


export const qualificationService = () => {

    const { dispatch, qualifications, qualification } = useContext(QualificationContext);
    const [loading, setLoading] = useState(false);

    const startGetQualifications = async (): Promise<void> => {
        setLoading(prev => !prev);
        const qualifications = await qualificationRepository.getQualifications();
        typeof qualifications !== 'string' && dispatch({ type: 'QUALIFICATION - Load qualificatios', payload: qualifications });
        setLoading(prev => !prev);
    }

    return {
        loading,
        qualification,
        qualifications,
        startGetQualifications,
    }
}
