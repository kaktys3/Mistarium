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

  const [isOpacity, setIsOpacity] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(infoForm));
  }, [infoForm]);

  if(isOpacity === true) {
  localStorage.setItem('doors', 'false')
  }

  console.log(localStorage.getItem('doors'))
  console.log(infoForm)

  return (
    <>
      <Header
        onSubmit={(planet) => {
          setInfoForm(prev => ({
            ...prev,
            planet
          }));
        }}
        isOpacity={isOpacity}
        setIsOpacity={setIsOpacity}
      />

      {infoForm.planet && (
        <Swiper
          className={app.swiper}
          id={app.swiper}
          slidesPerView={1}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide id={app.slide}>
            <div>
              <FamilyForm
                onNext={() => swiperRef.current.slideNext()}
                onSubmit={(userData) =>
                  setInfoForm(prev => ({
                    ...prev,
                    userInfo: userData
                  }))
                }
                setIsOpacity={setIsOpacity}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className={app.slide} id={app.slide}>
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
