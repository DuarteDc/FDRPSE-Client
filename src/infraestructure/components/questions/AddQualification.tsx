import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { forwardRef, useContext, useEffect, useState } from 'react'

import { CardQuestion } from './';

import { QuestionContext } from '../../context/questions';
import { StarsIcon } from '../icons';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { qualificationService } from '../../../domain/services/qualification.service';

export const AddQualification = forwardRef((props: any, ref: any) => {
  const { question } = useContext(QuestionContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  const { startGetQualifications, qualifications } = qualificationService();



  useEffect(() => {
    startGetQualifications()
  }, [])


  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={350}
        duration={500}
        className="bg-red-600 px-4"
        // style={{ backgroundColor: `${theme === 'dark' ? 'black' : 'white'}` }}
        zIndex={20}
      >
        <ul className="pt-24 [&>a]:py-3 [&>a]:cursor-pointer [&>a]:flex [&>a]:items-center [&>a>span]:ml-2 [&>a>span]:-mb-1 [&>a>span]:text-sm text-gray-500 font-bold transition-all duration-400">
          <Accordion selectionMode="multiple">
            {
              qualifications?.map(({ name, id, almost_alwyas_op, almost_never_op, always_op, sometimes_op, never_op }) => (
                <AccordionItem
                  draggable
                  key={id}
                  aria-label={name}
                  title={name}
                >
                  {name}
                </AccordionItem>
              ))
            }
          </Accordion>
        </ul>
      </Drawer>

      {
        question &&
        <CardQuestion
          question={question}
          renderButton={() =>
            <Button color="primary" startContent={<StarsIcon />} className="float-right" onClick={toggleDrawer}>
              Agregar Calificación
            </Button>
          }
        />
      }
    </div>
  )
});
