import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react';

import { Drawer } from '../ui';
import { QualificationList } from '../qualification';
import { useQuestion } from '../../../app/hooks/useQuestion';
import { qualificationService } from '../../../domain/services/qualification.service';
import { type ValidateStep } from '../../../app/utils/questionSteps';


import { CardQuestion } from './';
import { useDrawer } from '../../../app/hooks/useDrawer';

export const AddQualification = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

  const { question } = useQuestion();
  const { startGetQualifications } = qualificationService();
  const { isOpen, onOpenDrawer } = useDrawer(!question?.qualification);

  useEffect(() => {
    startGetQualifications();
  }, [])

  const canContinue = (): boolean => {
    if (!question?.qualification) {
      onOpenDrawer();
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
        onClose={onOpenDrawer}
        className="px-4"
        size={350}
      >
        <span className="mt-20 block font-bold text-gray-500 mb-5">Selecciona la calificación con la cual deseas que se califique la pregunta</span>
        <QualificationList
          onCloseDrawer={onOpenDrawer}
          question={question!}
        />
      </Drawer>


      <CardQuestion
        question={question!} showOptionQualification buttonFunction={onOpenDrawer}/>

    </div>
  )
});
