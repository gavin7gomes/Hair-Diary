import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const TopBar = () => {
  useEffect(() => {
    var scrollValue = document.getElementById('monthId');
    window.addEventListener('scroll', (event) => {
      let scroll = window.pageYOffset;
      if (scroll < 933) {
        scrollValue.innerHTML = '<h5>Jan 2020</h5>';
      } else if (scroll < 2193) {
        scrollValue.innerHTML = '<h5>Feb 2020</h5>';
      } else if (scroll < 3124) {
        scrollValue.innerHTML = '<h5>Mar 2020</h5>';
      } else if (scroll < 4094) {
        scrollValue.innerHTML = '<h5>Apr 2020</h5>';
      } else if (scroll < 5294) {
        scrollValue.innerHTML = '<h5>May 2020</h5>';
      } else if (scroll < 6252) {
        scrollValue.innerHTML = '<h5>Jun 2020</h5>';
      } else if (scroll < 7212) {
        scrollValue.innerHTML = '<h5>Jul 2020</h5>';
      } else if (scroll < 8408) {
        scrollValue.innerHTML = '<h5>Aug 2020</h5>';
      } else if (scroll < 9371) {
        scrollValue.innerHTML = '<h5>Sep 2020</h5>';
      } else if (scroll < 10568) {
        scrollValue.innerHTML = '<h5>Oct 2020</h5>';
      } else if (scroll < 11528) {
        scrollValue.innerHTML = '<h5>Nov 2020</h5>';
      } else {
        scrollValue.innerHTML = '<h5>Dec 2020</h5>';
      }
    });
  });

  return (
    <div className='stickyClass'>
      <div className='topbar'>
        <div className='goback'>
          <button>
            <FaArrowLeft />
          </button>
        </div>
        <div className='title'>
          <h3>Hair Diary</h3>
        </div>

        <div className='navMonth' id='monthId'>
          <h5>Jan 2020</h5>
        </div>
      </div>

      <div className='calendar'>
        <div className='dayofweek'>S</div>
        <div className='dayofweek'>M</div>
        <div className='dayofweek'>T</div>
        <div className='dayofweek'>W</div>
        <div className='dayofweek'>T</div>
        <div className='dayofweek'>F</div>
        <div className='dayofweek'>S</div>
      </div>
    </div>
  );
};

export default TopBar;
