import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import Rating from './Rating';
import '../styles.css';
import '../bootstrap.css';

const Calendar = () => {
  const [items, setItems] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const ref = useRef(null);

  const value = moment();
  const lastYear = moment()
    .subtract(1, 'year')
    .isoWeek(value.isoWeek())
    .isoWeekday(value.isoWeekday());
  const startDay = lastYear.clone().startOf('year').startOf('week');
  const endDay = lastYear.clone().endOf('year').endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      const body = {
        requestobjects: [
          {
            posts: {
              operationtype: 'read',
              id: {
                return: true,
              },
              userid: {
                searchvalues: ['41329663-5834-11eb-8e6e-3ca82abc3dd4'],
                return: true,
              },
              iscalendarentry: {
                searchvalues: ['true'],
                return: true,
              },
              media: {
                return: true, //contains image url
              },
              rating: {
                return: true,
              },
              text: {
                return: true,
              },
              privacy: {
                searchvalues: [18],
                return: true,
              },
              typeofday: {
                return: true,
              },

              // Don't change anything above ^^
              //editable variables start below //

              calendardatetime: {
                // Date Time of a particular post
                return: true, // please note: there can be multiple posts on a single day
                sort: 'descending', // you can sort fetched dates by ascending/descending.
              },
              maxitemcount: '25', //you can ask between 1 to 50 posts (max) at a time.
              continuationtoken: null, //replace with the continuation token from response to get the next set
            },
          },
        ],
      };

      const item = await axios.post(
        'https://devapi.quinn.care/graph',
        body,
        config
      );

      setItems(item.data.responseobjects[0].posts);
      //console.log(item.data.responseobjects[0].posts);
    };

    fetchData();
  }, []);

  const onScroll = () => {
    setIsScrolling(true);

    setTimeout(() => setIsScrolling(false), 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <div className='calendar'>
      {calendar.map((week) => (
        <div className='parentcont'>
          {
            // eslint-disable-next-line
            week.map((day) => {
              const uday = day._d.toString();
              const sday = uday.split(' ');
              const a = sday[1];
              const b = sday[2];
              const c = sday[3];

              const final = a + b + c;
              if (final === `${a}012020`) {
                return (
                  <div className={isScrolling ? 'monthName' : 'hide'} ref={ref}>
                    <p>{`${a} ${c}`}</p>
                  </div>
                );
              }
            })
          }
          <div className='dates'>
            {week.map((day) => (
              <div className={day.isoWeekday() === 7 ? 'sunday day' : 'day'}>
                {day.format('DD') === '01' ? (
                  <div className='calPosts'>
                    <>{day.format('D MMM').toString()}</>

                    {items &&
                      // eslint-disable-next-line
                      items.map((item) => {
                        const checkDate = day.format('YYYY-MM-DD').toString();
                        const itemDate = item.calendardatetime
                          .split('T')[0]
                          .toString();
                        if (checkDate === itemDate) {
                          return (
                            <>
                              <Rating value={item.rating} />
                              <Image
                                className='calImg'
                                src={item.media[0].mediaurl}
                              />
                              {
                                // eslint-disable-next-line
                                item.typeofday.map((day) => {
                                  if (day === 'hair cut') {
                                    return (
                                      <span className='span lightpink'>Cu</span>
                                    );
                                  }
                                  if (day === 'protein treatment') {
                                    return (
                                      <span className='span lightyellow'>
                                        Pr
                                      </span>
                                    );
                                  }
                                  if (day === 'hair color') {
                                    return (
                                      <span className='span lightpink'>Hc</span>
                                    );
                                  }
                                  if (day === 'deep conditioning') {
                                    return (
                                      <span className='span lightblue'>Dc</span>
                                    );
                                  }
                                  if (day === 'clarifying') {
                                    return (
                                      <span className='span lightgreen'>C</span>
                                    );
                                  }
                                })
                              }
                              <p></p>
                            </>
                          );
                        }
                      })}
                  </div>
                ) : (
                  <div className='calPosts'>
                    {day.format('D').toString()}

                    {items &&
                      // eslint-disable-next-line
                      items.map((item) => {
                        const checkDate = day.format('YYYY-MM-DD').toString();
                        const itemDate = item.calendardatetime
                          .split('T')[0]
                          .toString();
                        if (checkDate === itemDate) {
                          return (
                            <>
                              <Rating value={item.rating} />
                              <Image
                                className='calImg'
                                src={item.media[0].mediaurl}
                              />
                              {
                                // eslint-disable-next-line
                                item.typeofday.map((day) => {
                                  if (day === 'hair cut') {
                                    return (
                                      <span className='span lightpink'>Cu</span>
                                    );
                                  }
                                  if (day === 'protein treatment') {
                                    return (
                                      <span className='span lightyellow'>
                                        Pr
                                      </span>
                                    );
                                  }
                                  if (day === 'hair color') {
                                    return (
                                      <span className='span lightpink'>Hc</span>
                                    );
                                  }
                                  if (day === 'deep conditioning') {
                                    return (
                                      <span className='span lightblue'>Dc</span>
                                    );
                                  }
                                  if (day === 'clarifying') {
                                    return (
                                      <span className='span lightgreen'>C</span>
                                    );
                                  }
                                })
                              }
                              <p></p>
                            </>
                          );
                        }
                      })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
