import { useState, useRef, useEffect } from 'react';
import app from './App.module.css';
import FamilyForm from './components/FamilyForm/FamilyForm.jsx';
import SocialNetworks from './components/SocialNetworks/SocialNetworks.jsx';
import Header from './components/Header/Header.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const STORAGE_KEY = 'formData';

function App() {
  const [infoForm, setInfoForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          userInfo: {},
          sotialNetvorks: {},
          planet: ''
        };
  });
  const [isForm, setForm] = useState(false)

  const swiperRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(infoForm));
  }, [infoForm]);


  useEffect(() => {
    if (!infoForm.planet) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    });
  }, [infoForm.planet]);

  return (
    <>
      <Header
        onSubmit={(planet) => {
          setInfoForm(prev => ({
            ...prev,
            planet
          }));
        }}
        setForm={setForm}
      />

      {infoForm.planet && (
        <Swiper
          className={app.swiper}
          slidesPerView={1}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={isForm === false ? {display: 'none'} : {display: 'block'}}
        >
          <SwiperSlide>
            <div ref={targetRef}>
              <FamilyForm
                onNext={() => swiperRef.current.slideNext()}
                onSubmit={(userData) =>
                  setInfoForm(prev => ({
                    ...prev,
                    userInfo: userData
                  }))
                }
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <SocialNetworks
              onBack={() => swiperRef.current.slidePrev()}
              onSubmit={(userData) =>
                setInfoForm(prev => ({
                  ...prev,
                  sotialNetvorks: userData
                }))
              }
            />
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}

export default App;
