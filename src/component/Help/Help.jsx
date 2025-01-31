import React, { useEffect, useState } from 'react';
import PlusIcon from '../../assets/icons/plus.svg';
import MinusIcon from '../../assets/icons/minus.svg';
import ArrowDownIcon from '../../assets/icons/arrowDown.svg';
import ArrowUpIcon from '../../assets/icons/arrowUp.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { getHelpContact, getHelpFAQ } from '../../services/help';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared';

export default function HelpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { helpFAQ, helpContact, loading } = useSelector((state) => state.help);
  const [activeQuestion, setActiveQuestion] = useState('');
  const [activeChildren, setActiveChildren] = useState('');
  const questionsList = [
    {
      name: 'Frequently Asked Questions',
      key: 'faq',
    },
    {
      name: 'Contacts',
      key: 'contacts',
    },
    {
      name: 'Ticket Request',
      key: 'ticket',
    },
  ];

    const childrensData = [
        {
            question: 'How do I join a program management program as a mentor or mentee?',
            answer: "1Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text  ever unknown printer took a galley of type and scrambled it to make a type specimen book.",
            key: 'mentee'
        },
        {
            question: 'How can I set and track my goals within Program Management Bridge?',
            answer: "2Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text  ever unknown printer took a galley of type and scrambled it to make a type specimen book.",
            key: 'bridge'
        },
    ]

  const contactChildrensData = [
    {
      text1: 'Still have any query?',
      text2: ' Please contact us',
      key: 'query',
    },
    {
      text1: ' Is your old query unresolved? ',
      text2: ' Please contact officer',
      key: 'officer',
    },
  ];

  const handleOpen = (key) => {
    let tab = key;
    if (activeQuestion === key) {
      tab = '';
    }
    setActiveQuestion(tab);
    setActiveChildren('');
  };

  const handleChildrenData = (key) => {
    let list = key;
    if (activeChildren === key) {
      list = '';
    }
    setActiveChildren(list);
  };

  useEffect(() => {
    dispatch(getHelpFAQ());
    dispatch(getHelpContact());
  }, []);

  return (
    <div className='feedback px-9 py-9'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div className='flex items-center justify-start gap-4 my-4'>
        <Button
          btnType='button'
          btnCls='w-[110px]'
          btnName={'Help'}
          btnCategory='primary'
          onClick={() => navigate('/help')}
        />
        <Button
          btnType='button'
          btnCls='w-[110px]'
          btnName={'History'}
          btnCategory='primary'
          onClick={() => navigate('/ticket-history')}
        />
      </div>
      <div
        className='px-3 py-5'
        style={{
          boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      >
        <div className='flex justify-between px-5 pb-4 mb-4 items-center border-b-2'>
          <div className='flex w-full gap-5 items-center justify-between'>
            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>
              Help Desk
            </p>
          </div>
        </div>
        <div className='help-desk-details'>
          <div
            className='font-semibold text-[14px]'
            style={{ color: 'rgba(29, 91, 191, 1)' }}
          >
            Help Desk Overview
          </div>

          <div className='text-[12px] py-4 leading-6'>
            The Help Desk offers support for all users of the mentoring
            application, including Organization Admins, Mentors, and Mentees.
            Whether you need help with tasks, goals, or technical issues, we're
            here to ensure a smooth experience. Our team is dedicated to guiding
            you and resolving any concerns, making your journey within the
            application efficient and productive
          </div>

          <div className='help-question-list'>
            {questionsList.map((questionList, index) => (
              <div
                style={{
                  borderBottom:
                    questionsList.length === parseInt(index) + 1
                      ? 'none'
                      : '1px solid rgba(198, 198, 198, 1)',
                }}
              >
                <div
                  key={index}
                  className='flex w-[80%] justify-between py-3 items-center'
                >
                  <div className='text-[20px] font-semibold'>
                    {index + 1} . {questionList.name}
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() => {
                      handleOpen(questionList.key);
                      if (index === 2) {
                        navigate('/ticket-creation');
                      }
                    }}
                  >
                    <img
                      src={
                        questionList.key === activeQuestion
                          ? MinusIcon
                          : PlusIcon
                      }
                      alt={'Icon'}
                    />
                  </div>
                </div>
                {questionList.key === activeQuestion && (
                  <div className='w-[80%]'>
                    <div className='toggle-data-list'>
                      {activeQuestion === 'contacts' &&
                        helpContact.map((contactChildrenData, index) => (
                          <div
                            className='toggle-data'
                            key={index}
                            style={{
                              borderBottom:
                                helpContact.length === parseInt(index) + 1
                                  ? 'none'
                                  : '1px solid rgba(188, 188, 188, 1)',
                            }}
                          >
                            <div className='flex justify-between items-center pt-4 pb-2'>
                              <div className='child-question'>
                                {contactChildrenData.title}
                                <span className='cursor-pointer underline'>
                                  <a
                                    href={`mailto:${contactChildrenData.email}`}
                                    className='pl-1'
                                  >
                                    {contactChildrenData.display_content}
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      {activeQuestion === 'faq' &&
                        helpFAQ.map((childrenData, index) => (
                          <div
                            className='toggle-data'
                            key={index}
                            style={{
                              borderBottom:
                                helpFAQ.length === parseInt(index) + 1
                                  ? 'none'
                                  : '1px solid rgba(188, 188, 188, 1)',
                            }}
                          >
                            <div className='flex justify-between items-center pt-4 pb-2'>
                              <div className='child-question'>
                                {childrenData.title}
                              </div>
                              <img
                                className='w-[20px] cursor-pointer'
                                src={
                                  childrenData.id !== activeChildren
                                    ? ArrowDownIcon
                                    : ArrowUpIcon
                                }
                                alt='Icon'
                                onClick={() =>
                                  handleChildrenData(childrenData.id)
                                }
                              />
                            </div>
                            {childrenData.id === activeChildren && (
                              <div className='text-[12px] child-answer'>
                                {childrenData.description}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
