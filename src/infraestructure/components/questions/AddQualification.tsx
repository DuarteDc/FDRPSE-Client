import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Button, Card } from '@nextui-org/react';

import { CardQuestion } from './';

import { StarsIcon } from '../icons';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { qualificationService } from '../../../domain/services/qualification.service';
import { type ValidateStep } from '../../../app/utils/questionSteps';
import { useQuestion } from '../../../app/hooks/useQuestion';

export const AddQualification = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

  const { question, setQualificationBeforeSave } = useQuestion();
  const [isOpen, setIsOpen] = useState(!question?.qualification);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  const { startGetQualifications, qualifications } = qualificationService();

  useEffect(() => {
    startGetQualifications()
  }, [])

  const handleSetQualification = (id: string) => {
    const qualification = qualifications.find((qualification) => qualification.id === id);
    setQualificationBeforeSave(qualification!);
    toggleDrawer();
  }


  const canContinue = (): boolean => {
    if (!question?.qualification) {
      toggleDrawer();
      return false;
    }
    return true;
  }

  useImperativeHandle(ref, () => ({
    canContinue,
  }));

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={350}
        duration={400}
        className="bg-red-600 px-4"
        // style={{ backgroundColor: `${theme === 'dark' ? 'black' : 'white'}` }}
        zIndex={20}
      >
        <span className="mt-20 block font-bold text-gray-500 mb-5">Selecciona la calificación con la cual deseas que se califique la pregunta</span>
        <ul className="[&>li]:cursor-pointer [&>li>span]:ml-2 [&>li>span]:-mb-1 [&>li>span]:text-sm text-gray-500 font-bold">
          <li>
            {
              qualifications?.map(({ name, id, almost_alwyas_op, almost_never_op, always_op, sometimes_op, never_op }) => (
                <div
                  key={`${id}`}
                  aria-label={name}
                  onClick={() => handleSetQualification(id)}
                >
                  <Card className={`grid grid-cols-5 text-xs text-center border-2 ${question?.qualification?.id === id ? 'border-primary' : 'border-transparent'} hover:border-primary cursor-pointer pb-2 my-2 hover:transition-all hover:duration-700 hover:ease-out`}>
                    <span className="bg-emerald-600 pt-2 mb-2 text-white">Siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Algunas veces</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi nunca</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Nunca</span>
                    <span>{always_op}</span><span>{almost_alwyas_op}</span><span>{sometimes_op}</span><span>{almost_never_op}</span><span>{never_op}</span>
                  </Card>
                </div>
              ))
            }
          </li>
        </ul>
      </Drawer>

      {
        question &&
        <CardQuestion
          question={question}
          renderButton={() =>
            <Button color="primary" startContent={<StarsIcon />} className="float-right" onClick={toggleDrawer}>
              {question?.qualification ? 'Cambiar Calificación' : 'Agregar Calificación'}
            </Button>
          }
        />
      }
    </div>
  )
});
