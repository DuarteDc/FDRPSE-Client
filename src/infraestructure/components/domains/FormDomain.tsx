import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { BoxIcon } from '../icons';
import { domianService } from '../../../domain/services/domian.service';

import { createDomainValidation } from '../../validations/domain.validations';
import { CreateDomainDto } from '../../http/dto/domains';

export const FormDomain = () => {

    const { loading, startCreateDomain } = domianService();

    const formik = useFormik({
        initialValues: { name: '', },
        validationSchema: Yup.object(createDomainValidation()),
        onSubmit: startCreateDomain,
    });

    return (
        <div>
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold mt-40">Crea un dominio para agrupar tus pregustas</h2>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Nombre del dominio"
                    className="my-5 text-gray-500"
                    size="md"
                    name="name"
                    startContent={ <BoxIcon /> }
                    isInvalid={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                    onChange={formik.handleChange}
                />
                <Button
                    className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                    isLoading={loading}
                    spinner={<Spinner size="sm" color="current" />}
                    size="lg"
                    type="submit"
                >
                    Crear
                </Button>
            </form>
        </div>
    )
}
